import React from 'react'
import PostItem from './PostItem'
import Button from './Button'
import type { ClientPost } from '../types/post'

interface PostListProps {
  posts: ClientPost[]
  isLoading?: boolean
  hasMore?: boolean
  onLoadMore?: () => void
}

const PostList: React.FC<PostListProps> = ({
  posts,
  isLoading = false,
  hasMore = false,
  onLoadMore
}) => {
  if (isLoading && posts.length === 0) {
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
      <div className="space-y-4 mb-4">
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6 mb-8">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            className="px-6"
          >
            {isLoading ? 'Loading...' : 'more'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default PostList