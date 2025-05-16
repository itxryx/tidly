import React from 'react'
import MainLayout from '../components/MainLayout'

const PrivacyPolicyPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-primary-evergreen p-6 rounded-md shadow">
        <h1 className="text-3xl font-bold mb-4 text-white">プライバシーポリシー</h1>
        <div className="space-y-4">
          <p className="text-white">
            tidlyは、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
            本プライバシーポリシーでは、当サービスにおける個人情報の取り扱いについて説明します。
          </p>

          <h2 className="text-xl font-semibold mt-6 text-white">1. 収集する情報</h2>
          <p className="text-white">
            当サービスでは、以下の情報を収集することがあります：
          </p>
          <ul className="list-disc pl-6">
            <li>アカウント情報（ユーザー名、メールアドレスなど）</li>
            <li>投稿内容</li>
            <li>利用状況データ（アクセス日時、IPアドレスなど）</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">2. 情報の利用目的</h2>
          <p>
            収集した情報は、以下の目的で利用します：
          </p>
          <ul className="list-disc pl-6">
            <li>サービスの提供・維持・改善</li>
            <li>ユーザーサポート</li>
            <li>セキュリティ確保</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">3. 情報の共有</h2>
          <p>
            当サービスは、法的要請がある場合を除き、収集した個人情報を第三者と共有しません。
          </p>

          <h2 className="text-xl font-semibold mt-6">4. データセキュリティ</h2>
          <p>
            当サービスは、収集した情報の保護のために適切なセキュリティ対策を講じています。
            ただし、インターネット上の通信においては完全な安全性を保証することはできません。
          </p>

          <h2 className="text-xl font-semibold mt-6">5. ポリシーの変更</h2>
          <p>
            本プライバシーポリシーは、必要に応じて変更されることがあります。
            変更があった場合は、当サイト上でお知らせします。
          </p>

          <p className="mt-8">
            最終更新日：2025年5月17日
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default PrivacyPolicyPage