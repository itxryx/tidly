import { beforeAll, afterAll, vi } from 'vitest'
import { PrismaClient } from '@prisma/client'
import type { D1Database } from '@cloudflare/workers-types'

// モックのD1データベース
const mockD1Database = {
  prepare: vi.fn().mockReturnValue({
    bind: vi.fn().mockReturnThis(),
    first: vi.fn().mockResolvedValue({}),
    all: vi.fn().mockResolvedValue([]),
    run: vi.fn().mockResolvedValue({})
  }),
  exec: vi.fn().mockResolvedValue({}),
  batch: vi.fn().mockResolvedValue([]),
  dump: vi.fn().mockResolvedValue({})
} as unknown as D1Database

// モックのPrismaクライアント
const mockPrismaClient = {
  user: {
    findFirst: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn()
  },
  post: {
    findMany: vi.fn(),
    create: vi.fn()
  },
  $disconnect: vi.fn()
} as unknown as PrismaClient

// モックのCloudflare環境
export const mockEnv = {
  DB: mockD1Database,
  API_KEY: 'test-api-key',
  MAX_POST_BYTES: '200'
}

// APIエラー関連のモック
vi.mock('../src/lib/error', async () => {
  const actualModule = await vi.importActual<typeof import('../src/lib/error')>('../src/lib/error')
  return {
    ...actualModule
  }
})

// PrismaClientのモック
vi.mock('@prisma/client', () => {
  return {
    PrismaClient: vi.fn(() => mockPrismaClient)
  }
})

// DB接続のモック
vi.mock('../src/lib/db', () => {
  return {
    getDB: vi.fn(() => mockPrismaClient)
  }
})

// PrismaD1アダプターのモック
vi.mock('@prisma/adapter-d1', () => {
  return {
    PrismaD1: vi.fn().mockImplementation(() => ({
      query: vi.fn().mockResolvedValue({}),
      executeRaw: vi.fn().mockResolvedValue({}),
      queryRaw: vi.fn().mockResolvedValue({}),
      transaction: vi.fn().mockImplementation(async (args: any[]) => {
        for (const query of args) {
          await query();
        }
      })
    }))
  }
})

// テスト用のPrismaインスタンスをエクスポート
export const prisma = mockPrismaClient

// テスト前の設定
beforeAll(() => {
  vi.clearAllMocks()
})

// テスト後のクリーンアップ
afterAll(() => {
  vi.resetAllMocks()
})