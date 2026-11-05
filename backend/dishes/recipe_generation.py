import json
import os
import re
import urllib.error
import urllib.request
from datetime import timedelta

from django.utils import timezone

from .models import DEFAULT_RECIPE_PROMPT, RecipeAutomationSettings, RecipePost


OUTPUT_INSTRUCTIONS = """
Избери сезонно ястие, различно от последните публикации. Върни заглавие, кратък анонс и цялата
статия в Markdown. Не повтаряй скорошни теми и спазвай всички правила от редакторския промпт.
"""

RECIPE_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "excerpt": {"type": "string"},
        "content": {"type": "string"},
    },
    "required": ["title", "excerpt", "content"],
    "additionalProperties": False,
}


def _extract_message_content(payload):
    choices = payload.get("choices") or []
    if not choices:
        raise RuntimeError("OpenRouter returned no completion choices")
    content = choices[0].get("message", {}).get("content", "")
    if isinstance(content, str):
        return content
    if isinstance(content, list):
        return "".join(part.get("text", "") for part in content if isinstance(part, dict))
    raise RuntimeError("OpenRouter returned an unsupported response format")


def generate_recipe(force=False):
    config = RecipeAutomationSettings.objects.get_or_create(
        pk=1,
        defaults={
            "prompt": DEFAULT_RECIPE_PROMPT,
            "model": os.getenv("OPENROUTER_MODEL", "openai/gpt-5-mini"),
        },
    )[0]
    now = timezone.now()
    if not force and (not config.is_enabled or config.next_run_at > now):
        return None

    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise RuntimeError("OPENROUTER_API_KEY is not configured")

    base_url = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1").rstrip("/")
    site_url = os.getenv("OPENROUTER_SITE_URL", "https://sofiafood.bg")
    app_name = os.getenv("OPENROUTER_APP_NAME", "SofiaFood")
    recent_titles = list(RecipePost.objects.values_list("title", flat=True)[:12])
    user_prompt = f"{OUTPUT_INSTRUCTIONS}\n\nПоследни заглавия, които да не повтаряш: {recent_titles}"
    body = json.dumps(
        {
            "model": config.model,
            "temperature": float(config.temperature),
            "messages": [
                {"role": "system", "content": config.prompt},
                {"role": "user", "content": user_prompt},
            ],
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "recipe_post",
                    "strict": True,
                    "schema": RECIPE_SCHEMA,
                },
            },
        },
        ensure_ascii=False,
    ).encode("utf-8")
    request = urllib.request.Request(
        f"{base_url}/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "HTTP-Referer": site_url,
            "X-Title": app_name,
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=240) as response:
            raw = json.loads(response.read().decode("utf-8"))
        text = _extract_message_content(raw).strip()
        text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text, flags=re.I)
        generated = json.loads(text)
        post = RecipePost.objects.create(
            title=generated["title"].strip(),
            excerpt=generated["excerpt"].strip(),
            content=generated["content"].strip(),
            is_published=True,
            published_at=now,
        )
        config.last_run_at = now
        config.next_run_at = now + timedelta(days=config.frequency_days)
        config.last_error = ""
        config.save()
        return post
    except urllib.error.HTTPError as exc:
        details = exc.read().decode("utf-8", errors="replace")[:1600]
        config.last_error = f"OpenRouter HTTP {exc.code}: {details}"
        config.save(update_fields=["last_error", "updated_at"])
        raise RuntimeError(config.last_error) from exc
    except Exception as exc:
        config.last_error = str(exc)[:2000]
        config.save(update_fields=["last_error", "updated_at"])
        raise
