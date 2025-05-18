import React, { useState, useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import { useUser } from '../contexts/UserContext'
import { postApi } from '../api'
import type { ApiPost, ClientPost } from '../types/post'
import { convertApiPostsToClientPosts, convertApiPostToClientPost } from '../types/post'

const TopPage: React.FC = () => {
  const { user } = useUser()
  const [posts, setPosts] = useState<ClientPost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    if (!user?.cognito_sub) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await postApi.getPosts(user.cognito_sub)

      if (result.success) {
        const clientPosts = convertApiPostsToClientPosts(result.data.posts)
        setPosts(clientPosts)
      } else {
        setError(`Failed to fetch posts: ${result.error.error.message}`)
      }
    } catch (err) {
      setError('Error occurred while fetching posts')
      console.error('Error fetching posts:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchPosts()
    }
  }, [user])

  const handlePostSubmit = (apiPost: ApiPost) => {
    const newClientPost = convertApiPostToClientPost(apiPost)
    setPosts(prevPosts => [newClientPost, ...prevPosts])
  }

  const handlePostError = (message: string) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  return (
    <MainLayout>
      <PostForm
        onSubmit={handlePostSubmit}
        onError={handlePostError}
      />

      {error && (
        <div className="mb-4 p-3 bg-amber/10 border border-amber text-amber rounded">
          {error}
        </div>
      )}

      <PostList
        posts={posts}
        isLoading={isLoading}
      />
    </MainLayout>
  )
}

export default TopPage