import React, { useState, useEffect, useCallback } from 'react'
import TextArea from './TextArea'
import Button from './Button'
import CircleProgressBar from './CircleProgressBar'
import { useUser } from '../contexts/UserContext'
import { postApi } from '../api'
import type { CreatePostRequest } from '../api'
import type { ApiPost } from '../types/post'

interface PostFormProps {
  onSubmit?: (post: ApiPost) => void
  onError?: (message: string) => void
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, onError }) => {
  const { user } = useUser()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitPost = async () => {
    if (!content.trim()) return
    if (isSubmitting) return
    if (new TextEncoder().encode(content).length >= 200) return
    if (!user?.cognito_sub) return

    setIsSubmitting(true)
    setError(null)

    try {
      const postData: CreatePostRequest = {
        sub: user.cognito_sub,
        content: content.trim()
      }

      const result = await postApi.createPost(postData)

      if (result.success) {
        onSubmit?.(result.data)
        setContent('')
      } else {
        const errorMessage = result.error.error.message || 'Failed to create post'
        setError(errorMessage)
        onError?.(errorMessage)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error occurred while creating post'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitPost()
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      submitPost()
    }
  }, [content, isSubmitting, user])

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
        placeholder="No need to tidy up your words..."
        maxBytes={200}
        disabled={isSubmitting}
      />
      {error && (
        <div className="mt-2 text-amber text-sm">
          {error}
        </div>
      )}
      <div className="mt-2 flex justify-end items-center gap-4">
        <CircleProgressBar
          progress={Math.round((new TextEncoder().encode(content).length / 200) * 100)}
          size={36}
          strokeWidth={4}
          progressColor={content.length > 0 && new TextEncoder().encode(content).length >= 200 ? 'var(--color-amber)' : 'var(--color-primary-forest)'}
          displayText={`${new TextEncoder().encode(content).length}`}
        />
        <Button
          type="submit"
          disabled={!content.trim() || isSubmitting || new TextEncoder().encode(content).length >= 200 || !user}
        >
          {isSubmitting ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </form>
  )
}

export default PostForm