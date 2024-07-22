# urls.py

from django.urls import path
from .views import RegisterView, ItemListCreateView, ItemDetailView, UserProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('items/', ItemListCreateView.as_view(), name='item-list-create'),
    path('items/<int:pk>/', ItemDetailView.as_view(), name='item-detail'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
]
