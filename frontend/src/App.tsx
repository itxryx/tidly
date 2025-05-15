import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopPage from './pages/TopPage'
import AboutPage from './pages/AboutPage'
import PrivacyPolicyPage from './pages/PrivacyPolicy'
import SignInPage from './pages/SignInPage'
import SignInCallbackPage from './pages/SignInCallbackPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-in/callback" element={<SignInCallbackPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
