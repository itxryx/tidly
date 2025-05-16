import React, { useState } from 'react'
import TextArea from './TextArea'
import Button from './Button'

interface PostFormProps {
  onSubmit?: (content: string) => void
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!content.trim()) return
    
    setIsSubmitting(true)

    setTimeout(() => {
      onSubmit?.(content)
      setContent('')
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-primary-moss p-4 rounded-md shadow">
      <TextArea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="いまどうしてる？"
        maxBytes={200}
        rows={4}
        disabled={isSubmitting}
      />
      <div className="mt-2 flex justify-end">
        <Button
          type="submit"
          disabled={!content.trim() || isSubmitting}
        >
          {isSubmitting ? '送信中...' : '送信'}
        </Button>
      </div>
    </form>
  )
}

export default PostForm