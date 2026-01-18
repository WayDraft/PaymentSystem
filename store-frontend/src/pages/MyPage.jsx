import React, { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

export default function MyPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/order/list/')
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("주문 목록 로딩 실패", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="py-20 text-center">주문 내역을 불러오는 중...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 font-['AritaBuri']">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 border-b-2 border-green-600 pb-2 inline-block">
        주문/배송 조회
      </h1>

      {orders.length === 0 ? (
        <div className="py-20 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">아직 주문한 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* 상단: 주문 날짜 및 상태 */}
              <div className="bg-beige-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center bg-[#fdfaf5]">
                <span className="text-sm text-gray-600 font-medium">
                  {new Date(order.created_at).toLocaleDateString()} 주문
                </span>
                <span className={`font-bold ${order.status === 'PAID' ? 'text-green-600' : 'text-blue-600'}`}>
                  {order.status === 'PAID' ? '결제완료' : order.status}
                </span>
              </div>

              {/* 중단: 상품 정보 */}
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    {/* 이미지 정보를 시리얼라이저에 추가했다면 이미지도 출력 가능 */}
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">이미지</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{order.order_name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{order.amount.toLocaleString()}원</p>
                  </div>
                </div>
                
                {/* 하단 버튼 영역 */}
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">배송조회</button>
                  <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">문의하기</button>
                </div>
              </div>
              
              {/* 하단: 배송지 정보 요약 (클릭 시 펼치기 등으로 확장 가능) */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-50 text-xs text-gray-500">
                주문번호: {order.id} | 배송지: {order.address}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}