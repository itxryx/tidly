import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import TopPage from './pages/TopPage'
import AboutPage from './pages/AboutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicy'
import SignInPage from './pages/SignInPage'
import SignInCallbackPage from './pages/SignInCallbackPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  const auth = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ auth.isAuthenticated ? <TopPage /> : <Navigate replace to="/sign-in" />}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/sign-in" element={ !auth.isAuthenticated ? <SignInPage /> : <Navigate replace to="/" />}/>
        <Route path="/sign-in/callback" element={ !auth.isAuthenticated ? <SignInCallbackPage /> : <Navigate replace to="/" />}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
