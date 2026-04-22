from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import AdminDishViewSet, AdminLoginView, AdminLogoutView, DishViewSet, TodayMenuView

router = DefaultRouter()
router.register("dishes", DishViewSet, basename="dish")
router.register("admin/dishes", AdminDishViewSet, basename="admin-dish")

urlpatterns = [
	path("admin/auth/login/", AdminLoginView.as_view(), name="admin-login"),
	path("admin/auth/logout/", AdminLogoutView.as_view(), name="admin-logout"),
	path("admin/today-menu/", TodayMenuView.as_view(), name="today-menu"),
]

urlpatterns += router.urls
