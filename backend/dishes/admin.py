from django.contrib import admin

from .models import DailySpecialOffers, Dish, SpecialOffer


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
