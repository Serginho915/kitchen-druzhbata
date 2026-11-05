from rest_framework import serializers
from django.contrib.auth import authenticate
import os

from .models import (
    DailyMenu,
    DailySpecialOffers,
    Dish,
    RecipeAutomationSettings,
    RecipePost,
    SpecialOffer,
)


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = [
            "id",
            "name",
            "description",
            "weight",
            "price",
            "category",
            "image",
            "is_spicy",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_weight(self, value: int) -> int:
        if value < 0:
            raise serializers.ValidationError("Weight cannot be negative")
        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative")
        return value


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid username or password")
        attrs["user"] = user
        return attrs


class DailyMenuSerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=True)
    dish_ids = serializers.SerializerMethodField()
    dishes_count = serializers.SerializerMethodField()

    class Meta:
        model = DailyMenu
        fields = ["date", "updated_at", "dishes_count", "dish_ids", "dishes"]

    def get_dish_ids(self, obj: DailyMenu):
        return list(obj.dishes.values_list("id", flat=True))

    def get_dishes_count(self, obj: DailyMenu) -> int:
        return obj.dishes.count()


class DailyMenuUpdateSerializer(serializers.Serializer):
    dish_ids = serializers.ListField(
        child=serializers.IntegerField(min_value=1),
        allow_empty=True,
    )


class SpecialOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialOffer
        fields = ["id", "text", "banner", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_banner(self, value):
        if not value:
            raise serializers.ValidationError("Banner image is required")
        return value


class DailySpecialOffersSerializer(serializers.ModelSerializer):
    offers = SpecialOfferSerializer(many=True, read_only=True)
    offer_ids = serializers.SerializerMethodField()
    offers_count = serializers.SerializerMethodField()

    class Meta:
        model = DailySpecialOffers
        fields = ["date", "updated_at", "offers_count", "offer_ids", "offers"]

    def get_offer_ids(self, obj: DailySpecialOffers):
        return list(obj.offers.values_list("id", flat=True))

    def get_offers_count(self, obj: DailySpecialOffers) -> int:
        return obj.offers.count()


class DailySpecialOffersUpdateSerializer(serializers.Serializer):
    offer_ids = serializers.ListField(
        child=serializers.IntegerField(min_value=1),
        allow_empty=True,
    )

    def validate_offer_ids(self, value):
        unique_ids = list(dict.fromkeys(value))
        if len(unique_ids) > 3:
            raise serializers.ValidationError("You can select up to 3 special offers")
        return unique_ids


class RecipePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipePost
        fields = [
            "id", "title", "slug", "excerpt", "content", "cover_image",
            "is_published", "published_at", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class RecipeAutomationSettingsSerializer(serializers.ModelSerializer):
    provider = serializers.SerializerMethodField()
    api_key_configured = serializers.SerializerMethodField()

    class Meta:
        model = RecipeAutomationSettings
        fields = [
            "prompt", "frequency_days", "is_enabled", "provider", "model", "temperature", "api_key_configured", "next_run_at",
            "last_run_at", "last_error", "updated_at",
        ]
        read_only_fields = ["provider", "api_key_configured", "last_run_at", "last_error", "updated_at"]

    def get_provider(self, obj):
        return "OpenRouter"

    def get_api_key_configured(self, obj):
        return bool(os.getenv("OPENROUTER_API_KEY"))

    def validate_frequency_days(self, value):
        if not 1 <= value <= 365:
            raise serializers.ValidationError("Frequency must be between 1 and 365 days")
        return value

    def validate_temperature(self, value):
        if not 0 <= value <= 2:
            raise serializers.ValidationError("Temperature must be between 0 and 2")
        return value
