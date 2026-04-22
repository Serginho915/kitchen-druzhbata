from django.contrib import admin

from .models import Dish, TodayMenu


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category", "weight", "price", "created_at")
    list_filter = ("category",)
    search_fields = ("name", "category")


@admin.register(TodayMenu)
class TodayMenuAdmin(admin.ModelAdmin):
    list_display = ("id", "date", "updated_at")
    filter_horizontal = ("dishes",)
