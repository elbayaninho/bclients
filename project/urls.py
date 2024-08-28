"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path
from core import views as core_views

urlpatterns = [
    path('', core_views.client_list, name='client_list'),
    path('clients', core_views.client_list, name='client_list'),
    path('clients/create/', core_views.client_create, name='client_create'),
    path('clients/update/<int:pk>', core_views.client_update, name='client_update'),
    path('clients/delete/<int:pk>', core_views.client_delete, name='client_delete'),
    path('clients/view/<int:pk>', core_views.client_view, name='client_view'),
    path('clients/test/<int:count>', core_views.test_faker_data, name='test_faker_data'),
    path('admin/', admin.site.urls),
]

urlpatterns += static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
)
urlpatterns += static(
    settings.STATIC_URL, document_root=settings.STATIC_ROOT
)
