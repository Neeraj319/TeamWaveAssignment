from django.urls import path
from core import views

urlpatterns = [
    path("search", views.SearchAPIView.as_view()),
]
