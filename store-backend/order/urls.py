from django.urls import path
from .views import PaymentCompleteView, OrderListView
 
urlpatterns = [
    path('payment-complete/', PaymentCompleteView.as_view(), name='payment_complete'),
    # GET /api/order/list/ 요청 시 주문 목록을 반환
    path('list/', OrderListView.as_view(), name='order_list'),
]