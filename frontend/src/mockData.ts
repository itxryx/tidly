import type { Post } from './components/PostItem'

export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'こんにちは！tidlyへようこそ。短い投稿を共有できるサービスです。',
    createdAt: '2025-05-01T10:30:00Z'
  },
  {
    id: '2',
    content: '今日もいい天気ですね。散歩に行ってきました。',
    createdAt: '2025-05-15T08:45:00Z'
  },
  {
    id: '3',
    content: '新しいプロジェクトを始めました。進捗はtidlyで共有していきます！',
    createdAt: '2025-05-16T16:20:00Z'
  }
]