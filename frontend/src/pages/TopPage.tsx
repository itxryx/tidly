import React, { useState } from 'react'
import MainLayout from '../components/MainLayout'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import { mockPosts } from '../mockData'
import type { Post } from '../components/PostItem'

const TopPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts)

  const handlePostSubmit = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString()
    }

    setPosts([newPost, ...posts])
  }

  return (
    <MainLayout showLogout>
      <PostForm onSubmit={handlePostSubmit} />
      <PostList posts={posts} />
    </MainLayout>
  )
}

export default TopPage