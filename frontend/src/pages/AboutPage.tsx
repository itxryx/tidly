import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const TopPage: React.FC = () => {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        tidly / about
      </h1>
      <Link to="/" className="text-blue-500 hover:underline">top</Link>
      <p className="text-green-500">about</p>
      <div className="p-16">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default TopPage
