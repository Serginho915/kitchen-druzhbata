from django.utils import timezone
from rest_framework import permissions, status, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DailyMenu, DailySpecialOffers, Dish, SpecialOffer
from .serializers import (
    DailyMenuSerializer,
    DailyMenuUpdateSerializer,
    DailySpecialOffersSerializer,
    DailySpecialOffersUpdateSerializer,
    DishSerializer,
    SpecialOfferSerializer,
    UserLoginSerializer,
)


class DishViewSet(viewsets.ModelViewSet):
    serializer_class = DishSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = Dish.objects.all()
        category = self.request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset


class AdminDishViewSet(DishViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class AdminSpecialOfferViewSet(viewsets.ModelViewSet):
    serializer_class = SpecialOfferSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = SpecialOffer.objects.all().order_by("-updated_at")


class CurrentDailyMenuView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        menu, _ = DailyMenu.objects.get_or_create(date=timezone.localdate())
        serializer = DailyMenuSerializer(menu)
        return Response(serializer.data)


class AdminCurrentDailyMenuView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        menu, _ = DailyMenu.objects.get_or_create(date=timezone.localdate())
        serializer = DailyMenuSerializer(menu)
        return Response(serializer.data)

    def put(self, request):
        update_serializer = DailyMenuUpdateSerializer(data=request.data)
        update_serializer.is_valid(raise_exception=True)

        menu, _ = DailyMenu.objects.get_or_create(date=timezone.localdate())
        dish_ids = update_serializer.validated_data["dish_ids"]
        dishes = Dish.objects.filter(id__in=dish_ids)
        menu.dishes.set(dishes)
        menu.save()

        serializer = DailyMenuSerializer(menu)
        return Response(serializer.data)


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)
        return Response({"token": token.key, "username": user.username})


class UserLogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        Token.objects.filter(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CurrentSpecialOfferView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        daily_offers, _ = DailySpecialOffers.objects.get_or_create(date=timezone.localdate())
        serializer = DailySpecialOffersSerializer(daily_offers)
        return Response(serializer.data)


class AdminCurrentSpecialOfferView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        daily_offers, _ = DailySpecialOffers.objects.get_or_create(date=timezone.localdate())
        return daily_offers

    def get(self, request):
        serializer = DailySpecialOffersSerializer(self.get_object())
        return Response(serializer.data)

    def put(self, request):
        update_serializer = DailySpecialOffersUpdateSerializer(data=request.data)
        update_serializer.is_valid(raise_exception=True)

        daily_offers = self.get_object()
        offer_ids = update_serializer.validated_data["offer_ids"]
        offers = SpecialOffer.objects.filter(id__in=offer_ids)
        daily_offers.offers.set(offers)
        daily_offers.save()

        serializer = DailySpecialOffersSerializer(daily_offers)
        return Response(serializer.data)
