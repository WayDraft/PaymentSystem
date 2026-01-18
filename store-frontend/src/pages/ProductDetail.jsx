import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // navigate 추가
import { useAuth } from '../context/AuthContext.jsx';
import { handlePayment } from '../services/paymentService';
import apiClient from '../services/apiClient';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 배송 정보 입력을 위한 상태 추가 ---
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    apiClient.get(`/products/${id}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => console.error("상품 로딩 실패", err));
  }, [id]);

// onBuyNow 함수 부분 수정
const onBuyNow = () => {
  if (!user) {
    alert("로그인이 필요한 서비스입니다.");
    navigate("/login");
    return;
  }

  if (!address || !phone) {
    alert("배송지와 연락처를 정확히 입력해주세요.");
    return;
  }

  const orderData = {
    productId: product.id, // <<-- 상품 ID 추가
    name: product.name,
    price: product.price,
    username: user.username,
    email: user.email,
    address,
    phone,
    memo
  };

  handlePayment(orderData); // paymentService로 전달
};


  if (loading) return <div className="py-20 text-center text-gray-500">로딩 중...</div>;
  if (!product) return <div className="py-20 text-center text-gray-500">상품을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16 font-['AritaBuri']">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* 왼쪽: 상품 이미지 */}
        <div className="w-full lg:w-1/2 aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm">
          <img 
            src={product.image_url || "/img/default.png"} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 오른쪽: 상품 정보 및 배송지 입력 */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="mb-6">
            <span className="text-green-700 font-bold text-sm bg-green-50 px-2 py-1 rounded">
              {product.category?.name || "친환경 제품"}
            </span>
            <h1 className="text-3xl font-bold mt-4 text-gray-900">{product.name}</h1>
            <p className="text-2xl font-black mt-4 text-gray-900 border-b border-gray-100 pb-6">
              {product.price.toLocaleString()}원
            </p>
          </div>

          {/* 배송 정보 입력 섹션 (스마트스토어 스타일) */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4 mb-8">
            <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">배송 정보 입력</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">수령인 연락처</label>
              <input 
                type="text" 
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded border-gray-300 focus:ring-1 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">배송지 주소</label>
              <input 
                type="text" 
                placeholder="도로명 주소 또는 지번 주소"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded border-gray-300 focus:ring-1 focus:ring-green-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">배송 요청사항 (선택)</label>
              <input 
                type="text" 
                placeholder="문 앞에 놓아주세요"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="w-full p-2 border rounded border-gray-300 focus:ring-1 focus:ring-green-600 outline-none"
              />
            </div>
          </div>

          <div className="mt-auto flex gap-4">
            <button className="flex-1 h-14 border border-gray-300 rounded-md font-bold text-gray-700 hover:bg-gray-50 transition-colors">
              장바구니
            </button>
            <button 
              onClick={onBuyNow}
              className="flex-[2] h-14 bg-green-600 rounded-md font-bold text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-100"
            >
              구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}