import { useState } from 'react'
import './App.css'
import { Button } from '@/components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container mx-auto p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">Vite + React</h1>
      <Button 
        variant="default" 
        size="lg" 
        onClick={() => setCount((count) => count + 1)}
        className="font-semibold"
      >
        count is {count}
      </Button>
    </div>
  )
}

export default App
