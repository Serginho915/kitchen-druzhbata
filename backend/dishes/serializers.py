from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import Dish


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
            "special_offer_image",
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
