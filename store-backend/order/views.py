import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Order
from product.models import Product  # 재고 차감을 위해 Product 모델 임포트
from django.db import transaction  # 안전한 처리를 위해 트랜잭션 사용

class PaymentCompleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        payment_id = request.data.get('payment_id')
        product_id = request.data.get('product_id') # 프론트엔드에서 전달받아야 함
        
        # 1. 포트원 API를 통해 결제 정보 조회 (V2)
        portone_api_url = f"https://api.portone.io/payments/{payment_id}"
        headers = {
            "Authorization": "PortOne YOUR_PORTONE_API_SECRET",
            "Content-Type": "application/json"
        }
        
        response = requests.get(portone_api_url, headers=headers)
        payment_data = response.json()

        # 2. 결제 상태 확인 및 처리
        if response.status_code == 200 and payment_data.get('status') == 'PAID':
            
            # 데이터 정합성을 위해 트랜잭션(하나라도 실패하면 취소)으로 묶어줍니다.
            with transaction.atomic():
                # [1] 주문 내역 저장
                Order.objects.create(
                    user=request.user,
                    payment_id=payment_id,
                    order_name=payment_data.get('orderName'),
                    amount=payment_data['amount']['total'],
                    status='PAID',
                    # 만약 모델에 추가하셨다면 아래 필드도 포함
                    # address=request.data.get('address'),
                    # phone=request.data.get('phone')
                )

                # [2] 재고 차감 로직 추가 위치!
                try:
                    product = Product.objects.get(id=product_id)
                    if product.stock >= 1: # 재고가 있을 때만
                        product.stock -= 1
                        product.save()
                    else:
                        return Response({"status": "fail", "message": "재고가 부족합니다."}, status=400)
                except Product.DoesNotExist:
                    return Response({"status": "fail", "message": "상품 정보를 찾을 수 없습니다."}, status=400)

            return Response({"status": "success"})
        
        return Response({"status": "fail", "message": "결제 검증 실패"}, status=400)

# order/views.py (기존 코드 아래에 추가)
from .serializers import OrderListSerializer # Serializer 임포트 추가

class OrderListView(APIView):
    # 인증된 사용자만 자신의 주문 내역을 볼 수 있어야 합니다.
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 현재 로그인한 사용자의 주문 내역만 최신순으로 가져옵니다.
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        
        # 가져온 데이터를 Serializer를 통해 JSON으로 변환합니다.
        serializer = OrderListSerializer(orders, many=True)
        
        return Response(serializer.data)