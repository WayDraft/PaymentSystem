# Django 모델 객체를 JSON 등으로 변환하기 위한 시리얼라이저 정의, 클라이언트에서 받은 JSON 데이터를 모델 객체로 역변환하는 역할
from rest_framework import serializers
from .models import Product, Category

from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    # image_url 필드 선언을 제거하거나, 간단히 읽기 전용으로만 남김
    # ModelSerializer가 models.py의 image_url 필드를 자동으로 인식 : 중복선언으로 나는 error 방지

    class Meta:
        model = Product
        fields = [
            'id', 
            'category', 
            'name', 
            'price', 
            'stock_quantity', 
            'description', 
            'image_url' # 모델 필드 이름을 그대로 사용합니다.
        ]


# # Category 모델을 위한 시리얼라이저 (상품에 카테고리 이름을 포함하기 위함)
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ['name'] # 카테고리 이름만 필요

# # Product 모델을 위한 시리얼라이저
# class ProductSerializer(serializers.ModelSerializer):
#     # Category를 ID 대신 이름으로 보여주기 위해 Serializer를 중첩
#     category = CategorySerializer(read_only=True)
    
#     # 이미지 URL이 /img/... 로 시작하도록 설정 (React public 폴더 경로)
#     # 실제 환경에서는 MEDIA_URL 설정과 FileField를 사용하지만, 초기에는 URLField로 단순화
#     image_url = serializers.CharField(source='image_url', required=False) 

#     class Meta:
#         model = Product
#         fields = [
#             'id', 
#             'category', 
#             'name', 
#             'price', 
#             'stock_quantity', 
#             'description', 
#             'image_url'
#         ]