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
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const fetchPosts = async (page = 1, append = false) => {
    if (!user?.cognito_sub) return

    setIsLoading(true)
    setError(null)

    try {
      const result = await postApi.getPosts(user.cognito_sub, page)

      if (result.success) {
        const clientPosts = convertApiPostsToClientPosts(result.data.posts)

        if (append) {
          setPosts(prevPosts => [...prevPosts, ...clientPosts])
        } else {
          setPosts(clientPosts)
        }

        setHasMore(result.data.pagination.hasMore)
        setCurrentPage(result.data.pagination.page)
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

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchPosts(currentPage + 1, true)
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
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
    </MainLayout>
  )
}

export default TopPage