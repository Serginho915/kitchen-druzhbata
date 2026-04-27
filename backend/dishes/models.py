from django.db import models
from django.utils import timezone


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
