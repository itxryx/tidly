import React from 'react'

export interface Post {
  id: string
  content: string
  createdAt: string
}

interface PostItemProps {
  post: Post
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="bg-primary-moss p-4 rounded-md shadow mb-4">
      <div className="flex justify-end items-start">
        <div className="text-sm text-white">{formattedDate}</div>
      </div>
      <div className="mt-2 whitespace-pre-wrap break-words">{post.content}</div>
    </div>
  )
}

export default PostItem