from django.db import models
from django.utils import timezone


class Dish(models.Model):
    name = models.CharField(max_length=255)
    weight = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255, blank=True)
    image = models.ImageField(upload_to="dishes/", blank=True, null=True)
    special_offer_image = models.ImageField(upload_to="special_offers/", blank=True, null=True)
    is_spicy = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} ({self.price})"


class TodayMenu(models.Model):
    date = models.DateField(default=timezone.localdate, unique=True)
    dishes = models.ManyToManyField(Dish, related_name="today_menus", blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date"]

    def __str__(self) -> str:
        return f"Today menu: {self.date}"
