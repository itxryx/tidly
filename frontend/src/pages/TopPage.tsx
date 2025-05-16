import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TopPage: React.FC = () => {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <h1 className="text-3xl font-bold underline text-white">
        tidly / top
      </h1>
      <p className="text-green-500">top</p>
      <Link to="/about" className="text-blue-500 hover:underline">about</Link>
      <div className="p-16">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default TopPage
