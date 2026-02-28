from django.urls import path
from .interface.views.view import TaskCreateAPIView, PMTaskListAPIView, TaskSoftDeleteAPIView, DevTaskListAPIView

urlpatterns = [
    path("create/", TaskCreateAPIView.as_view()),
    path("list/", PMTaskListAPIView.as_view()),
    path("dev/", DevTaskListAPIView.as_view()),
    path("<int:pk>/delete/", TaskSoftDeleteAPIView.as_view())
]
