from django.contrib import admin

from .models import Dish


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category", "weight", "price", "created_at")
    list_filter = ("category",)
    search_fields = ("name", "category")
