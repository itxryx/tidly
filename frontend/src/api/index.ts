import { createApiClient } from './client';
import type { ApiResult } from './client';
import { API_CONFIG } from './config';

export interface User {
  id: number;
  created_at: number;
  updated_at: number;
  cognito_sub: string;
  email: string;
}

export interface Post {
  id: number;
  created_at: number;
  updated_at: number;
  user_id: number;
  content: string;
  is_deleted: number;
}

export interface PostsResponse {
  posts: Post[];
}

export interface CreateUserRequest {
  sub: string;
  email: string;
}

export interface CreatePostRequest {
  sub: string;
  content: string;
}

const apiClient = createApiClient(API_CONFIG.apiKey);

export const userApi = {
  async getUser(cognitoSub: string): Promise<ApiResult<User>> {
    return apiClient.get<User>(`/users?sub=${encodeURIComponent(cognitoSub)}`);
  },

  async createUser(data: CreateUserRequest): Promise<ApiResult<User>> {
    return apiClient.post<User>('/users', data);
  },

  async authenticateUser(sub: string, email: string): Promise<ApiResult<User>> {
    const userResult = await this.getUser(sub);

    if (!userResult.success) {
      console.log('User authentication failed, creating new user...', userResult.error);
      return this.createUser({ sub, email });
    }

    return userResult;
  }
};

export const postApi = {
  async getPosts(cognitoSub: string): Promise<ApiResult<PostsResponse>> {
    return apiClient.get<PostsResponse>(`/posts?sub=${encodeURIComponent(cognitoSub)}`);
  },

  async createPost(data: CreatePostRequest): Promise<ApiResult<Post>> {
    return apiClient.post<Post>('/posts', data);
  }
};