import React, { useState, useEffect } from 'react'
import type { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxBytes?: number
}

const TextArea: React.FC<TextAreaProps> = ({
  maxBytes = 200,
  onChange,
  value,
  className = '',
  ...props
}) => {
  const [currentBytes, setCurrentBytes] = useState(0)
  const [inputValue, setInputValue] = useState(value || '')

  useEffect(() => {
    const stringValue = String(inputValue)
    const encoder = new TextEncoder()
    const bytes = encoder.encode(stringValue).length
    setCurrentBytes(bytes)
  }, [inputValue])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    const encoder = new TextEncoder()
    const bytes = encoder.encode(newValue).length

    if (bytes <= maxBytes) {
      setInputValue(newValue)
      onChange?.(e)
    }
  }

  return (
    <div className="w-full">
      <textarea
        value={inputValue}
        onChange={handleChange}
        className={`w-full p-2 border border-gray rounded-md focus:ring-2 focus:ring-primary-evergreen focus:border-transparent ${className}`}
        {...props}
      />
      <div className="flex justify-end text-sm text-gray mt-1">
        <span className={currentBytes >= maxBytes ? 'text-amber' : ''}>
          {currentBytes} / {maxBytes} バイト
        </span>
      </div>
    </div>
  )
}

export default TextArea