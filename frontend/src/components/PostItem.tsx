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
  const date = new Date(post.createdAt)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`

  return (
    <div className="bg-primary-evergreen p-4 rounded-md shadow mb-4">
      <div className="whitespace-pre-wrap break-words mb-3">{post.content}</div>
      <div className="flex justify-start items-end">
        <div className="text-sm text-white">{formattedDate}</div>
      </div>
    </div>
  )
}

export default PostItem