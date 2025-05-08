export default function PrivacyPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none">
        <p className="mb-4">
          本プライバシーポリシーは、tidlyサービス（以下「本サービス」）における個人情報の取り扱いについて定めるものです。
        </p>
        
        <h2 className="text-xl font-bold mt-6 mb-4">1. 収集する情報</h2>
        <p className="mb-4">
          本サービスでは、以下の情報を収集することがあります:
        </p>
        <ul className="mb-4 list-disc pl-5">
          <li>アカウント情報（メールアドレス、ユーザー名など）</li>
          <li>サービス利用情報（アクセスログ、利用状況など）</li>
          <li>ユーザーが本サービス上で作成したコンテンツ</li>
        </ul>
        
        <h2 className="text-xl font-bold mt-6 mb-4">2. 情報の利用目的</h2>
        <p className="mb-4">
          収集した情報は、以下の目的で利用します:
        </p>
        <ul className="mb-4 list-disc pl-5">
          <li>本サービスの提供・維持・改善</li>
          <li>ユーザーサポート</li>
          <li>利用状況の分析</li>
        </ul>
        
        <h2 className="text-xl font-bold mt-6 mb-4">3. お問い合わせ</h2>
        <p>
          プライバシーポリシーに関するお問い合わせは、support@example.comまでご連絡ください。
        </p>
      </div>
    </div>
  )
}