import React from 'react'
import PostItem from './PostItem'
import type { Post } from './PostItem'

interface PostListProps {
  posts: Post[]
  isLoading?: boolean
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        ロード中...
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-primary-moss p-4 rounded-md shadow text-center text-white">
        投稿がありません。最初の投稿をしてみましょう！
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