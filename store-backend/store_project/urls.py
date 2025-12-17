"""store_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
# from django.contrib import admin
# from django.urls import path, include

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # --- API 엔드포인트 연결 ---
#     # /api/ 경로로 들어오는 요청을 product 앱의 URL 설정으로 전달
#     path('api/', include('product.urls')),
# ]

from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Access/Refresh 토큰 발급
    TokenRefreshView,     # Access 토큰 재발급
)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # /api/products/ 등 상품 관련 URL
    path('api/', include('product.urls')), 
    
    # --- JWT 인증 API 추가 ---
    # POST /api/token/ : 로그인 (username, password로 토큰 획득)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # POST /api/token/refresh/ : 토큰 갱신
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # --- ---
]