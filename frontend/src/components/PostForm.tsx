import React, { useState, useEffect, useCallback } from 'react'
import TextArea from './TextArea'
import Button from './Button'
import CircleProgressBar from './CircleProgressBar'

interface PostFormProps {
  onSubmit?: (content: string) => void
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return
    if (isSubmitting) return
    if (new TextEncoder().encode(content).length >= 200) return

    setIsSubmitting(true)

    setTimeout(() => {
      onSubmit?.(content)
      setContent('')
      setIsSubmitting(false)
    }, 500)
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()

      if (!content.trim()) return
      if (isSubmitting) return
      if (new TextEncoder().encode(content).length >= 200) return

      setIsSubmitting(true)

      setTimeout(() => {
        onSubmit?.(content)
        setContent('')
        setIsSubmitting(false)
      }, 500)
    }
  }, [content, isSubmitting, onSubmit])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-primary-evergreen p-4 rounded-md shadow">
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        maxBytes={200}
        disabled={isSubmitting}
      />
      <div className="mt-2 flex justify-end items-center gap-4">
        <div className="flex items-center gap-2">
          <span className={content.length > 0 && new TextEncoder().encode(content).length >= 200 ? 'text-amber' : 'text-gray'}>
            {new TextEncoder().encode(content).length} / 200 bytes
          </span>
          <CircleProgressBar
            progress={Math.round((new TextEncoder().encode(content).length / 200) * 100)}
            size={36}
            strokeWidth={4}
            progressColor={content.length > 0 && new TextEncoder().encode(content).length >= 200 ? 'var(--color-amber)' : 'var(--color-primary-forest)'}
          />
        </div>
        <Button
          type="submit"
          disabled={!content.trim() || isSubmitting || new TextEncoder().encode(content).length >= 200}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  )
}

export default PostForm