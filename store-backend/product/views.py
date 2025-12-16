# ViewSet 정의: Product 모델에 대한 읽기 전용 API 엔드포인트를 제공 : 상품목록조회, 상세조회 등 CRUD 기능을 담당하는 로직 처리
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

# ReadOnlyModelViewSet: POST, PUT, DELETE 없이 GET 요청(조회)만 허용
# 일반 사용자용 API이므로 조회 기능만 제공하는 것이 적합
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    # API가 사용할 모델 데이터 지정
    queryset = Product.objects.filter(is_active=True) # 활성화된 상품만 조회
    
    # API가 사용할 Serializer 지정
    serializer_class = ProductSerializer

    # 카테고리별 필터링 기능 추가 (예: /api/products/?category=도시락)
    def get_queryset(self):
        queryset = self.queryset
        
        # URL 쿼리 파라미터에서 'category' 값을 가져옴
        category_name = self.request.query_params.get('category')
        
        if category_name is not None:
            # 해당 카테고리 이름과 일치하는 상품만 필터링
            queryset = queryset.filter(category__name=category_name)
            
        return queryset.order_by('id') # 정렬 기준