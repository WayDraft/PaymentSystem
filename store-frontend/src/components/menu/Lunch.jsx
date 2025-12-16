// Lunch.jsx

import React from 'react';
import { useProducts } from '../../hooks/useProducts'; // 커스텀 훅 임포트

export default function Lunch() {
  // 훅을 사용하여 '도시락' 카테고리 상품 데이터 가져오기
  const { products, loading, error } = useProducts('도시락');

  // 로딩 또는 에러 처리
  if (loading) {
    return <div className="py-[100px] text-lg">상품 목록을 불러오는 중입니다...</div>;
  }
  if (error) {
    return <div className="py-[100px] text-red-600">{error}</div>;
  }

  // 기존 메뉴 컨텐츠 (하드코딩된 데이터 대신 products 사용)
  return (
    <div className="flex flex-col bg-white justify-center items-center py-[100px] lg:py-[160px]">
      {/* ... (이전 코드 생략) ... */}

      <div className="flex justify-center items-center lg:pt-16">
        <div className="w-full lg:px-[200px] grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          
          {/* 하드코딩된 배열 대신 백엔드에서 가져온 products 배열을 사용 */}
          {products.map((item, index) => (
            <div 
              key={item.id} // key는 고유 ID를 사용
              className="relative flex justify-center items-center w-[130px] lg:w-[200px] aspect-square rounded-full"
            >
              {/* Django 모델에서 가져온 image_url 사용 */}
              <img src={item.imageUrl || "/img/default.png"} className="absolute inset-0 w-full h-full object-cover" /> 
              
              {/* 이미지의 기타 요소는 제거하거나 필요에 따라 조정 */}

              {/* Django 모델에서 가져온 name 사용 */}
              <p className="relative z-10 text-lg lg:text-xl text-white font-bold">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}