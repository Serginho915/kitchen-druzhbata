import json
from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient

from .models import RecipeAutomationSettings, RecipePost
from .recipe_generation import generate_recipe


class AuthenticationUrlTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.username = "admin-test"
        self.password = "safe-test-password"
        get_user_model().objects.create_user(
            username=self.username,
            password=self.password,
        )

    def test_login_accepts_url_with_trailing_slash(self):
        response = self.client.post(
            "/api/auth/login/",
            {"username": self.username, "password": self.password},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.data)

    def test_login_accepts_url_without_trailing_slash(self):
        response = self.client.post(
            "/api/auth/login",
            {"username": self.username, "password": self.password},
            format="json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("token", response.data)


class RecipeGenerationTests(TestCase):
    @patch("dishes.recipe_generation.urllib.request.urlopen")
    @patch.dict(
        "os.environ",
        {
            "OPENROUTER_API_KEY": "test-key",
            "OPENROUTER_BASE_URL": "https://openrouter.ai/api/v1",
            "OPENROUTER_SITE_URL": "https://sofiafood.bg",
            "OPENROUTER_APP_NAME": "SofiaFood",
        },
    )
    def test_openrouter_generation_publishes_recipe_and_advances_schedule(self, urlopen):
        generated = {
            "title": "Тестова баница",
            "excerpt": "Кратък тестов анонс.",
            "content": "## Продукти\n\n- 500 г кори",
        }
        urlopen.return_value.__enter__.return_value.read.return_value = json.dumps(
            {"choices": [{"message": {"content": json.dumps(generated, ensure_ascii=False)}}]}
        ).encode("utf-8")

        post = generate_recipe(force=True)

        self.assertEqual(RecipePost.objects.count(), 1)
        self.assertEqual(post.title, generated["title"])
        config = RecipeAutomationSettings.load()
        self.assertIsNotNone(config.last_run_at)
        self.assertGreater(config.next_run_at, config.last_run_at)

        request = urlopen.call_args.args[0]
        payload = json.loads(request.data.decode("utf-8"))
        self.assertEqual(request.full_url, "https://openrouter.ai/api/v1/chat/completions")
        self.assertEqual(payload["response_format"]["type"], "json_schema")
        self.assertEqual(payload["model"], config.model)
