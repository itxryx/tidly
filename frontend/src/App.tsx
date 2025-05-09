import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import MainLayout from './components/layouts/MainLayout'
import LoginPage from './pages/LoginPage'
import LoginCallbackPage from './pages/LoginCallbackPage'
import LogoutPage from './pages/LogoutPage'
import TopPage from './pages/TopPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 未認証ユーザー向けルート */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-callback" element={<LoginCallbackPage />} />
        
        {/* MainLayoutを適用するルート */}
        <Route element={<MainLayout />}>
          {/* 認証済みユーザー向けルート */}
          <Route path="/top" element={<TopPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* 共通ページ */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          
          {/* リダイレクト */}
          <Route path="/" element={<Navigate replace to="/top" />} />
        </Route>
        
        <Route path="/logout" element={<LogoutPage />} />
        
        {/* 404ページ */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App