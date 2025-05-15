import React, { useState } from 'react'

const SignInCallbackPage: React.FC = () => {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        tidly / sign-in-callback
      </h1>
      <div className="p-16">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default SignInCallbackPage
