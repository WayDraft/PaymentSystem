# order/serializers.py
from rest_framework import serializers
from .models import Order

class OrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'order_name', 'amount', 'status', 'created_at', 'address', 'phone']