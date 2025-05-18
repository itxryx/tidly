import { describe, it, expect } from 'vitest'
import { ApiError, formatErrorResponse, getTextByteLength } from '../../src/lib/error'

describe('エラーユーティリティ', () => {
  describe('ApiError', () => {
    it('正しくインスタンス化されること', () => {
      const error = new ApiError('INVALID_PARAMETER', 'テストエラー', 400)
      
      expect(error).toBeInstanceOf(Error)
      expect(error).toBeInstanceOf(ApiError)
      expect(error.code).toBe('INVALID_PARAMETER')
      expect(error.message).toBe('テストエラー')
      expect(error.statusCode).toBe(400)
      expect(error.name).toBe('ApiError')
    })
    
    it('statusCodeが指定されない場合、デフォルト値が使用されること', () => {
      const error = new ApiError('INVALID_PARAMETER', 'テストエラー')
      
      expect(error.statusCode).toBe(400) // デフォルト値
    })
  })

  describe('formatErrorResponse', () => {
    it('エラーレスポンスを正しくフォーマットすること', () => {
      const error = new ApiError('INVALID_PARAMETER', 'テストエラー', 400)
      const response = formatErrorResponse(error)
      
      expect(response).toEqual({
        error: {
          code: 'INVALID_PARAMETER',
          message: 'テストエラー'
        }
      })
    })
  })

  describe('getTextByteLength', () => {
    it('ASCII文字のバイト長を正しく計算すること', () => {
      const text = 'Hello, World!'
      const byteLength = getTextByteLength(text)
      
      expect(byteLength).toBe(13) // ASCIIは1文字1バイト
    })
    
    it('日本語文字のバイト長を正しく計算すること', () => {
      const text = 'こんにちは'
      const byteLength = getTextByteLength(text)
      
      // UTF-8での日本語は3バイト/文字
      expect(byteLength).toBe(15) // 5文字 * 3バイト = 15バイト
    })
    
    it('絵文字のバイト長を正しく計算すること', () => {
      const text = '😀'
      const byteLength = getTextByteLength(text)
      
      // 絵文字は4バイト
      expect(byteLength).toBe(4)
    })
    
    it('混合テキストのバイト長を正しく計算すること', () => {
      const text = 'Hello, こんにちは 😀'
      const byteLength = getTextByteLength(text)
      
      // "Hello, " (7バイト) + "こんにちは" (15バイト) + " " (1バイト) + "😀" (4バイト) = 27バイト
      expect(byteLength).toBe(27)
    })
    
    it('空文字列のバイト長は0を返すこと', () => {
      const text = ''
      const byteLength = getTextByteLength(text)
      
      expect(byteLength).toBe(0)
    })
  })
})