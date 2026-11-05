from pathlib import Path
import os
from decimal import Decimal

from django.db import models
from django.utils import timezone
from django.utils.text import slugify


DEFAULT_RECIPE_PROMPT = (Path(__file__).with_name("default_recipe_prompt.txt")).read_text(encoding="utf-8")


class Dish(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    weight = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="dishes/", blank=True, null=True)
    is_spicy = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} ({self.price})"


class DailyMenu(models.Model):
    date = models.DateField(default=timezone.localdate, unique=True)
    updated_at = models.DateTimeField(auto_now=True)
    dishes = models.ManyToManyField(Dish, related_name="daily_menus", blank=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self) -> str:
        return f"Daily menu for {self.date}"


class SpecialOffer(models.Model):
    text = models.TextField(blank=True)
    banner = models.ImageField(upload_to="special_offer_banners/")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self) -> str:
        return self.text[:50] or "Special offer"


class DailySpecialOffers(models.Model):
    date = models.DateField(default=timezone.localdate, unique=True)
    updated_at = models.DateTimeField(auto_now=True)
    offers = models.ManyToManyField(SpecialOffer, related_name="daily_selections", blank=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self) -> str:
        return f"Daily special offers for {self.date}"


class RecipePost(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=280, unique=True, blank=True, allow_unicode=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField()
    cover_image = models.ImageField(upload_to="recipes/", blank=True, null=True)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title, allow_unicode=True) or "recipe"
            candidate = base
            index = 2
            while RecipePost.objects.exclude(pk=self.pk).filter(slug=candidate).exists():
                candidate = f"{base}-{index}"
                index += 1
            self.slug = candidate
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title


class RecipeAutomationSettings(models.Model):
    prompt = models.TextField()
    frequency_days = models.PositiveSmallIntegerField(default=7)
    is_enabled = models.BooleanField(default=True)
    model = models.CharField(max_length=120, default="openai/gpt-5-mini")
    temperature = models.DecimalField(max_digits=3, decimal_places=2, default=Decimal("0.80"))
    next_run_at = models.DateTimeField(default=timezone.now)
    last_run_at = models.DateTimeField(blank=True, null=True)
    last_error = models.TextField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Recipe automation settings"

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        settings, _ = cls.objects.get_or_create(
            pk=1,
            defaults={
                "prompt": DEFAULT_RECIPE_PROMPT,
                "model": os.getenv("OPENROUTER_MODEL", "openai/gpt-5-mini"),
            },
        )
        return settings

    def __str__(self) -> str:
        return "Recipe automation"
