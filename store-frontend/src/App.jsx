import './App.css'
import Header from './components/common/Header'
import LoginPage from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<div className="py-20 text-center">홈 페이지 (준비 중)</div>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<div className="py-20 text-center">회원가입 페이지 준비 중</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
