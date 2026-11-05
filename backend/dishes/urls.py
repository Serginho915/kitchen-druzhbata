from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import (
	AdminCurrentDailyMenuView,
	AdminCurrentSpecialOfferView,
	AdminDishViewSet,
	AdminSpecialOfferViewSet,
	AdminRecipePostViewSet,
	AdminRecipeAutomationView,
	AdminGenerateRecipeView,
	CurrentDailyMenuView,
	CurrentSpecialOfferView,
	DishViewSet,
	RecipePostViewSet,
	UserLoginView,
	UserLogoutView,
)

router = DefaultRouter()
router.register("dishes", DishViewSet, basename="dish")
router.register("admin/dishes", AdminDishViewSet, basename="admin-dish")
router.register("admin/special-offers", AdminSpecialOfferViewSet, basename="admin-special-offer-item")
router.register("recipes", RecipePostViewSet, basename="recipe")
router.register("admin/recipes", AdminRecipePostViewSet, basename="admin-recipe")

urlpatterns = [
	path("auth/login/", UserLoginView.as_view(), name="auth-login"),
	path("auth/logout/", UserLogoutView.as_view(), name="auth-logout"),
	path("menu/today/", CurrentDailyMenuView.as_view(), name="menu-today"),
	path("special-offer/", CurrentSpecialOfferView.as_view(), name="special-offer"),
	path("admin/menu/today/", AdminCurrentDailyMenuView.as_view(), name="admin-menu-today"),
	path("admin/special-offer/", AdminCurrentSpecialOfferView.as_view(), name="admin-special-offer"),
	path("admin/recipe-automation/", AdminRecipeAutomationView.as_view(), name="admin-recipe-automation"),
	path("admin/recipes/generate/", AdminGenerateRecipeView.as_view(), name="admin-recipe-generate"),
]

urlpatterns += router.urls
