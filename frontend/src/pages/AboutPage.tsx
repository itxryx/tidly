import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">About</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          tidlyは、シンプルで使いやすい投稿とボード管理アプリケーションです。
          日々の考えや情報を簡単に記録し、整理することができます。
        </p>
        <p className="mb-4">
          主な機能:
        </p>
        <ul className="mb-4 list-disc pl-5">
          <li>シンプルな投稿機能</li>
          <li>カスタマイズ可能なボード</li>
          <li>モバイルフレンドリーなデザイン</li>
          <li>統計情報の確認</li>
        </ul>
        <p>
          詳細については、<Link to="/" className="text-blue-500 underline">ホームページ</Link>をご覧ください。
        </p>
      </div>
    </div>
  )
}