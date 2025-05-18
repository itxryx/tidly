import React from 'react'
import PostItem from './PostItem'
import type { ClientPost } from '../types/post'

interface PostListProps {
  posts: ClientPost[]
  isLoading?: boolean
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading...
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-primary-evergreen p-4 rounded-md shadow text-center text-white">
        No posts yet.
      </div>
    )
  }

  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PostList