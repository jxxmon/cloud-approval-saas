from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApprovalViewSet, CurrentUserView, UserListView

router = DefaultRouter()
router.register(r'approvals', ApprovalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/', CurrentUserView.as_view()),
    path('users/', UserListView.as_view()),
]
