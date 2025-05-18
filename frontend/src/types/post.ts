export interface ApiPost {
  id: number;
  created_at: number;
  updated_at: number;
  user_id: number;
  content: string;
  is_deleted: number;
}

export interface ClientPost {
  id: string;
  content: string;
  createdAt: string;
}

export function convertApiPostToClientPost(apiPost: ApiPost): ClientPost {
  return {
    id: apiPost.id.toString(),
    content: apiPost.content,
    createdAt: new Date(apiPost.created_at * 1000).toISOString()
  };
}

export function convertApiPostsToClientPosts(apiPosts: ApiPost[]): ClientPost[] {
  return apiPosts.map(convertApiPostToClientPost);
}