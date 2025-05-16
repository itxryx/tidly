import React from 'react'
import MainLayout from '../components/MainLayout'

const AboutPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-primary-evergreen p-6 rounded-md shadow">
        <h1 className="text-3xl font-bold mb-4 text-white">tidlyについて</h1>
        <div className="space-y-4">
          <p className="text-white">
            tidlyは、シンプルな短文投稿サービスです。
            200バイト以内の短い文章を気軽に投稿して、共有することができます。
          </p>
          <p className="text-white">
            特徴：
          </p>
          <ul className="list-disc pl-6 text-white">
            <li>シンプルで使いやすいインターフェース</li>
            <li>200バイト制限による簡潔な表現</li>
            <li>リアルタイムの投稿共有</li>
          </ul>
          <p className="text-white">
            tidlyを通じて、あなたの考えやアイデアを気軽に共有してみましょう。
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default AboutPage