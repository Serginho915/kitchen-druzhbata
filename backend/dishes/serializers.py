from rest_framework import serializers
from django.contrib.auth import authenticate

from .models import Dish, TodayMenu


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = [
            "id",
            "name",
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


class AdminLoginSerializer(serializers.Serializer):
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


class TodayMenuSerializer(serializers.ModelSerializer):
    dishes = DishSerializer(many=True, read_only=True)
    dish_ids = serializers.ListField(
        child=serializers.IntegerField(min_value=1),
        write_only=True,
        required=False,
    )

    class Meta:
        model = TodayMenu
        fields = ["id", "date", "updated_at", "dishes", "dish_ids"]
        read_only_fields = ["id", "date", "updated_at", "dishes"]

    def update(self, instance, validated_data):
        dish_ids = validated_data.pop("dish_ids", None)
        if dish_ids is not None:
            dishes = Dish.objects.filter(id__in=dish_ids)
            instance.dishes.set(dishes)
        instance.save()
        return instance
