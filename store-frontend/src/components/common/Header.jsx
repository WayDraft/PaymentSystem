import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Header() {
  // Context에서 필요한 모든 상태와 함수를 가져옴
  const { user, login, logout, loading } = useAuth();

  // 테스트를 위한 핸들러 (실제 서비스에서는 /login 페이지의 폼에서 처리하게 됨)
  const handleQuickLogin = () => {
    login('testuser', 'strongpassword123');
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. 로고 영역 */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-black text-green-600 tracking-tighter">
            MY<span className="text-black">SHOP</span>
          </Link>
        </div>

        {/* 2. 네비게이션 메뉴 (데스크톱) */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          <Link to="/menu/lunch" className="hover:text-green-600 transition-colors">도시락</Link>
          <Link to="/menu/salad" className="hover:text-green-600 transition-colors">샐러드</Link>
          <Link to="/menu/sandwich" className="hover:text-green-600 transition-colors">샌드위치</Link>
        </nav>

        {/* 3. 사용자 인증 영역 */}
        <div className="flex items-center space-x-4 text-sm font-medium">
          {loading ? (
            // 로딩 중일 때 표시할 UI
            <span className="text-gray-400 animate-pulse">인증 확인 중...</span>
          ) : user ? (
            // 로그인 완료 상태
            <>
              <span className="text-gray-900">
                <span className="font-bold text-green-700">{user.username}</span>님 환영합니다
              </span>
              <button 
                onClick={logout}
                className="text-gray-500 hover:text-red-500 transition-colors border border-gray-200 px-3 py-1.5 rounded-md hover:bg-red-50"
              >
                로그아웃
              </button>
            </>
          ) : (
            // 로그아웃 상태
            <>
              {/* 테스트용 빠른 로그인 버튼 (선택 사항) */}
              <button 
                onClick={handleQuickLogin}
                className="hidden lg:block text-xs text-gray-400 hover:underline"
              >
                퀵로그인
              </button>
              
              <Link to="/login" className="text-gray-700 hover:text-green-600">
                로그인
              </Link>
              <Link 
                to="/register" 
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all shadow-sm"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}


// // 예시: 로그인 버튼 컴포넌트
// import React from 'react';
// import { useAuth } from '../context/AuthContext';

// function Header() {
//   const { user, login, logout, loading } = useAuth();
  
//   const handleLogin = () => {
//     // 실제로는 폼에서 username과 password를 받아서 사용
//     login('testuser', 'strongpassword123'); 
//   }

//   if (loading) {
//       return <div>로딩 중...</div>;
//   }

//   return (
//     <div>
//       {user ? (
//         // 로그인 상태
//         <>
//           <span>환영합니다, {user.username}님!</span>
//           <button onClick={logout}>로그아웃</button>
//         </>
//       ) : (
//         // 로그아웃 상태
//         <button onClick={handleLogin}>로그인</button>
//       )}
//     </div>
//   );
// }

// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import { Link } from 'react-router-dom'; // 라우터 사용 시

// export default function Header() {
//   const { user, logout, loading } = useAuth();

//   return (
//     <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//         {/* 로고 영역 */}
//         <div className="flex items-center">
//           <Link to="/" className="text-2xl font-black text-green-600 tracking-tighter">
//             MY<span className="text-black">SHOP</span>
//           </Link>
//         </div>

//         {/* 메뉴 영역 */}
//         <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
//           <Link to="/menu/lunch" className="hover:text-green-600">도시락</Link>
//           <Link to="/menu/salad" className="hover:text-green-600">샐러드</Link>
//           <Link to="/menu/sandwich" className="hover:text-green-600">샌드위치</Link>
//         </nav>

//         {/* 사용자 버튼 영역 */}
//         <div className="flex items-center space-x-4 text-sm font-medium">
//           {loading ? (
//             <span className="text-gray-400">...</span>
//           ) : user ? (
//             <>
//               <span className="text-gray-900"><span className="font-bold">{user.username}</span>님</span>
//               <button 
//                 onClick={logout}
//                 className="text-gray-500 hover:text-red-500 transition-colors"
//               >
//                 로그아웃
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="text-gray-700 hover:text-green-600">로그인</Link>
//               <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
//                 회원가입
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }