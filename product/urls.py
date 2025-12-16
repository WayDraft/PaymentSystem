from rest_framework.routers import DefaultRouter
from .views import ProductViewSet

# DefaultRouter를 사용하여 CRUD 기능을 위한 URL을 자동으로 설정
router = DefaultRouter()
# /products 경로에 ProductViewSet을 연결
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = router.urls