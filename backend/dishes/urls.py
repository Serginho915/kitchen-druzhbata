from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import AdminDishViewSet, DishViewSet, UserLoginView, UserLogoutView

router = DefaultRouter()
router.register("dishes", DishViewSet, basename="dish")
router.register("admin/dishes", AdminDishViewSet, basename="admin-dish")

urlpatterns = [
	path("auth/login/", UserLoginView.as_view(), name="auth-login"),
	path("auth/logout/", UserLogoutView.as_view(), name="auth-logout"),
]

urlpatterns += router.urls
