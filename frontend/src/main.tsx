import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// ダークテーマを強制適用する関数
function AppWithForcedDarkTheme() {
  useEffect(() => {
    // bodyにdarkクラスを追加して強制的にダークテーマを適用
    document.documentElement.classList.add('dark')
  }, [])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithForcedDarkTheme />
  </StrictMode>,
)
