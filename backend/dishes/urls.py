from rest_framework.routers import DefaultRouter
from django.urls import re_path

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
# Next.js rewrites normalize trailing slashes. Accept both URL forms so
# mutating requests are never forced through Django's unsafe POST redirect.
router.trailing_slash = "/?"
router.register("dishes", DishViewSet, basename="dish")
router.register("admin/dishes", AdminDishViewSet, basename="admin-dish")
router.register("admin/special-offers", AdminSpecialOfferViewSet, basename="admin-special-offer-item")
router.register("recipes", RecipePostViewSet, basename="recipe")
router.register("admin/recipes", AdminRecipePostViewSet, basename="admin-recipe")

urlpatterns = [
	re_path(r"^auth/login/?$", UserLoginView.as_view(), name="auth-login"),
	re_path(r"^auth/logout/?$", UserLogoutView.as_view(), name="auth-logout"),
	re_path(r"^menu/today/?$", CurrentDailyMenuView.as_view(), name="menu-today"),
	re_path(r"^special-offer/?$", CurrentSpecialOfferView.as_view(), name="special-offer"),
	re_path(r"^admin/menu/today/?$", AdminCurrentDailyMenuView.as_view(), name="admin-menu-today"),
	re_path(r"^admin/special-offer/?$", AdminCurrentSpecialOfferView.as_view(), name="admin-special-offer"),
	re_path(r"^admin/recipe-automation/?$", AdminRecipeAutomationView.as_view(), name="admin-recipe-automation"),
	re_path(r"^admin/recipes/generate/?$", AdminGenerateRecipeView.as_view(), name="admin-recipe-generate"),
]

urlpatterns += router.urls
