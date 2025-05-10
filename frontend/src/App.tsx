import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import MainLayout from './components/layouts/MainLayout'
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute'
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
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/login-callback" element={<LoginCallbackPage />} />

        {/* 認証が必要なルート */}
        <Route element={<ProtectedRoute />}>
          {/* MainLayoutを適用するルート */}
          <Route element={<MainLayout />}>
            {/* 認証済みユーザー向けルート */}
            <Route path="/top" element={<TopPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* リダイレクト */}
            <Route path="/" element={<Navigate replace to="/top" />} />
          </Route>
        </Route>

        {/* 共通ページ - 認証不要 */}
        <Route element={<MainLayout />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        </Route>

        <Route path="/logout" element={<LogoutPage />} />

        {/* 404ページ */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App