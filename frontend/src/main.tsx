import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

function AppWithForcedDarkTheme() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithForcedDarkTheme />
  </StrictMode>,
)
