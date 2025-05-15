import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import TopPage from './pages/TopPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
