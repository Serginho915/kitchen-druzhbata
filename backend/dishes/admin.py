from django.contrib import admin

from .models import DailySpecialOffers, Dish, RecipeAutomationSettings, RecipePost, SpecialOffer


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category", "weight", "price", "created_at")
    list_filter = ("category",)
    search_fields = ("name", "category")


@admin.register(SpecialOffer)
class SpecialOfferAdmin(admin.ModelAdmin):
    list_display = ("id", "updated_at")


@admin.register(DailySpecialOffers)
class DailySpecialOffersAdmin(admin.ModelAdmin):
    list_display = ("id", "date", "updated_at")
    filter_horizontal = ("offers",)


@admin.register(RecipePost)
class RecipePostAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "published_at", "updated_at")
    list_filter = ("is_published",)
    search_fields = ("title", "excerpt", "content")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(RecipeAutomationSettings)
class RecipeAutomationSettingsAdmin(admin.ModelAdmin):
    list_display = ("is_enabled", "frequency_days", "model", "next_run_at", "last_run_at")
