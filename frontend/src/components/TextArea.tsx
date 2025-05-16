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
  const [inputValue, setInputValue] = useState(value || '')

  useEffect(() => {
    setInputValue(value === undefined ? '' : value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    setInputValue(newValue)
    onChange?.(e)
  }

  return (
    <div className="w-full">
      <textarea
        value={inputValue}
        onChange={handleChange}
        className={`w-full p-2 border border-gray rounded-md focus:ring-2 focus:ring-primary-evergreen focus:border-transparent h-[calc(1.2em*6+1em)] resize-none scrollbar-hide overflow-y-auto ${className}`}
        {...props}
      />
    </div>
  )
}

export default TextArea