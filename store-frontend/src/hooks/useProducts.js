import { useState, useEffect } from 'react';
import axios from 'axios';

// Django 백엔드의 기본 주소
const API_BASE_URL = 'http://127.0.0.1:8000/api/products'; 

// 상품 데이터를 가져오는 커스텀 훅
export function useProducts(categoryName = '') {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // 쿼리 파라미터 구성 (categoryName이 있으면 추가)
    const url = categoryName 
      ? `${API_BASE_URL}/?category=${categoryName}`
      : API_BASE_URL;

    // Axios를 사용하여 API 호출
    axios.get(url)
      .then(response => {
        // 성공적으로 데이터를 받아왔을 때 상태 업데이트
        setProducts(response.data);
      })
      .catch(err => {
        console.error("API 호출 실패:", err);
        setError("상품 데이터를 불러오는 데 실패했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [categoryName]); // categoryName이 변경될 때마다 다시 호출

  return { products, loading, error };
}