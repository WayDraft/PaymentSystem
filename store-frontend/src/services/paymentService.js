// store-frontend/src/services/paymentService.js
import apiClient from './apiClient';

export const handlePayment = async (orderData) => {
  try {
    // 1. 포트원 결제창 호출
    const response = await window.PortOne.requestPayment({
      storeId: "store-INIpayTest", // 포트원 관리자 콘솔 -> 결제 연동 -> 내 식별코드 (상점 ID)
      channelKey: "channel-key-f6d3a3ce-502d-4e04-a9ea-e3ddf3b26101", // 결제 연동 -> 채널 관리 -> 채널 키
      paymentId: `order_${new Date().getTime()}`, // 매번 고유해야 함
      orderName: orderData.name,
      totalAmount: orderData.price,
      currency: "CURRENCY_KRW",
      payMethod: "CARD",
      customer: {
        fullName: orderData.username,
        email: orderData.email,
      },
    });

    // 2. 결제창 닫힘 후 처리
    if (response.code != null) {
      // 결제 실패 또는 취소
      return alert(`결제 실패: ${response.message}`);
    }

    // 3. 백엔드에 결제 검증 요청 (포트원이 준 paymentId 전달)
    const validation = await apiClient.post('/order/payment-complete/', {
      paymentId: response.paymentId,
      product_id: orderData.productId, // <- 백엔드 변수명에 맞춰 전달
    });

    if (validation.data.status === 'success') {
      alert("결제가 완료되었습니다!");
      window.location.href = "/order/success"; // 성공 페이지 이동
    }

  } catch (error) {
    console.error("결제 프로세스 에러:", error);
    alert("결제 처리 중 오류가 발생했습니다.");
  }
};