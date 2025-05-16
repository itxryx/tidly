import React, { useState, useEffect } from 'react'
import MainLayout from '../components/MainLayout'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import { mockPosts } from '../mockData'
import type { Post } from '../components/PostItem'

const TopPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const sortedPosts = [...mockPosts].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    setPosts(sortedPosts)
  }, [])

  const handlePostSubmit = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString()
    }

    setPosts([newPost, ...posts])
  }

  return (
    <MainLayout showSignOut>
      <PostForm onSubmit={handlePostSubmit} />
      <PostList posts={posts} />
    </MainLayout>
  )
}

export default TopPage