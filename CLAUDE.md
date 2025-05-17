# CLAUDE.md

このファイルは、このリポジトリのコードを操作する際にClaude Code（claude.ai/code）にガイダンスを提供します。

## Claude Code Rules

- 日本語で回答を行うこと
- コメントは必要最低限で、端的な日本語で記述すること
- 指示を受けてから最初に設計を行い、常に保守性を意識したコードを記述すること
- 使われていないファイルやコードを常に精査して、それらが存在した場合は削除すること
- type: anyは使用せず、どうしても使用する必要がある場合は許可を得ること
- 指示なく勝手にコード内のテキストを書き換えることは禁止

## プロジェクト: tidly

このプロジェクトはフロントエンドとバックエンドを分離したアプリケーションです。両方ともCloudflare Platformを使用してデプロイするよう設計されています。

### フロントエンド

フロントエンドは、React + TypeScript + Viteを使用して構築されています。UIフレームワークとしてTailwind CSSを使用しており、ルーティングにはreact-router-domを採用しています。トップページ、Aboutページの他に、プライバシーポリシーページ、サインイン関連のページ、404ページなどの基本的なページが実装されています。Cloudflareのvite-pluginを使用してビルド設定を最適化し、Cloudflare Pagesにデプロイするための設定が含まれています。開発サーバーはすべてのネットワークインターフェースでリッスンするように設定されています。また、Cloudflare Workersを使用したカスタムレスポンス処理も実装されています。

投稿フォームではCircleProgressBarコンポーネントを使用して、入力されたテキストのバイト数を視覚的に表示します。投稿は最大200バイトに制限されており、マルチバイト文字（日本語など）も適切に処理されます。

認証機能はAWS Cognitoを使用して実装されています。ユーザーはGoogle認証を通じてログインでき、認証状態に応じてアプリケーションの各ページへのアクセス制御が行われます。認証情報は環境変数を通じて設定され、`react-oidc-context`と`oidc-client-ts`パッケージを使用してOIDC認証フローを管理しています。

### バックエンド

バックエンドはHonoフレームワークを使用したCloudflare Workersアプリケーションとして実装されています。API認証のためのミドルウェアが実装されており、環境変数からAPI_KEYを取得して認証を行います。将来的にはKV、R2、D1データベースなどのCloudflareサービスとの連携も可能です。

## コマンド

### フロントエンド

```bash
# 開発サーバー起動
cd frontend && npm run dev

# ビルド
cd frontend && npm run build

# リント
cd frontend && npm run lint

# ビルドプレビュー
cd frontend && npm run preview
```

### バックエンド

```bash
# 開発サーバー起動
cd backend && npm run dev

# デプロイ
cd backend && npm run deploy

# Cloudflare Workers用の型生成
cd backend && npm run cf-typegen
```

## プロジェクト構造

```
frontend/
├── src/                  # ソースコード
│   ├── assets/           # 静的アセット（画像など）
│   ├── components/       # 共通コンポーネント
│   │   ├── Button.tsx            # ボタンコンポーネント
│   │   ├── CircleProgressBar.tsx # 円形進捗バー
│   │   ├── Footer.tsx            # フッターコンポーネント
│   │   ├── Header.tsx            # ヘッダーコンポーネント（認証状態表示）
│   │   ├── MainLayout.tsx        # メインレイアウト
│   │   ├── PostForm.tsx          # 投稿フォーム
│   │   ├── PostItem.tsx          # 投稿アイテム
│   │   ├── PostList.tsx          # 投稿リスト
│   │   └── TextArea.tsx          # テキストエリア
│   ├── pages/            # ページコンポーネント
│   │   ├── TopPage.tsx          # トップページ
│   │   ├── AboutPage.tsx        # Aboutページ
│   │   ├── PrivacyPolicy.tsx    # プライバシーポリシーページ
│   │   ├── SignInPage.tsx       # サインインページ
│   │   ├── SignInCallbackPage.tsx # サインインコールバックページ
│   │   └── NotFoundPage.tsx     # 404ページ
│   ├── App.tsx           # アプリケーションのメインコンポーネント（ルーティング設定）
│   ├── main.tsx          # エントリーポイント（認証設定）
│   ├── mockData.ts       # モックデータ（開発用）
│   └── worker.js         # Cloudflare Workersのエントリーポイント
├── public/               # 公開ディレクトリ
├── dist/                 # ビルド出力ディレクトリ
├── vite.config.ts        # Vite設定（server設定、cloudflare/react/tailwindcssプラグイン）
└── wrangler.jsonc        # Cloudflare Wrangler設定

backend/
├── src/                  # ソースコード
│   ├── middlewares/      # ミドルウェア
│   │   └── api-authentication.ts # API認証ミドルウェア
│   └── index.ts          # アプリケーションのエントリーポイント（Honoフレームワーク）
└── wrangler.jsonc        # Cloudflare Wrangler設定
```

## データ構造

### 投稿データ（Post）

フロントエンドのモックデータとして以下の構造の投稿データを使用しています：

```typescript
interface Post {
  id: string;       // 投稿ID
  content: string;  // 投稿内容
  createdAt: string; // 作成日時（ISO 8601形式）
}
```

`mockData.ts`ファイルには現在空の投稿配列が定義されています。アプリケーションを使用すると、ユーザーが作成した投稿がこの配列に追加されていきます。

## ルーティング構造

フロントエンドでは以下のルートが設定されています：

```
/ - トップページ（認証必須）
/about - アバウトページ
/privacy-policy - プライバシーポリシーページ
/sign-in - サインインページ（未認証時のみアクセス可能）
/sign-in/callback - サインインコールバックページ（未認証時のみアクセス可能）
* - 404ページ（ワイルドカードマッチ）
```

## 技術スタック

### フロントエンド
- React 19
- TypeScript 5.8
- Vite 6.3
- Tailwind CSS 4.1
- react-router-dom 7.6
- @cloudflare/vite-plugin 1.2
- react-oidc-context 3.3.0
- oidc-client-ts 3.2.1
- Cloudflare Pages
- Cloudflare Workers

### バックエンド
- Hono 4.7.9（Cloudflare Workers向けWebフレームワーク）
- TypeScript
- Cloudflare Workers
- Wrangler CLI 4.4.0

### 開発環境
- Node.js 22.14.0 (volta管理)
- ESLint 9.25.0
- TypeScript 5.8.3
- typescript-eslint 8.30.1

## Git情報

- 現在のブランチ: develop
- メインブランチ: main
- 最近のコミット:
  - `a9398aa` add frontend authentication
  - `7e59214` update CLAUDE.md
  - `890c7c0` fix frontend mock
  - `4d8f610` update CLAUDE.md
  - `418cdb7` fix frontend mock

## 開発ワークフロー

### フロントエンド
1. `npm run dev` でローカル開発サーバーを起動（すべてのIPアドレスでリッスンするよう設定済み）
2. 変更を加える
3. `npm run lint` でコードをチェック
4. `npm run build` でビルド
5. `npm run preview` でビルド結果をプレビュー

### バックエンド
1. `npm run dev` でローカル開発サーバーを起動
2. 変更を加える
3. `npm run cf-typegen` で必要に応じてCloudflare向けの型を生成
4. `npm run deploy` でCloudflare Workersにデプロイ

## セキュリティ

### フロントエンド
フロントエンドの認証にはAWS Cognitoを使用しています。認証情報は以下の環境変数を通じて設定されます：
- VITE_COGNITO_AUTHORITY: Cognitoの認証エンドポイント
- VITE_COGNITO_CLIENT_ID: アプリケーションのクライアントID
- VITE_COGNITO_REDIRECT_URI: 認証成功後のリダイレクトURI

認証プロバイダーとしてGoogle認証が実装されており、OIDCプロトコルを使用して認証フローを管理しています。

### バックエンド
バックエンドAPIはBearer認証を採用しています。環境変数`API_KEY`に設定された値と一致するトークンをAuthorizationヘッダーで送信する必要があります。認証が失敗した場合は401エラーが返されます。

## デプロイ

### フロントエンド
フロントエンドはCloudflare Pagesにデプロイします。vite.config.tsにcloudflareプラグインが設定されており、Cloudflare Pagesへのデプロイが最適化されています。

- SPA（Single Page Application）モードでの404ハンドリング
- Cloudflare Workersを使用したカスタムレスポンス処理（X-Robots-Tagヘッダーの追加など）
- ディレクトリ指定したアセットの配信

### バックエンド
バックエンドはCloudflare Workersにデプロイします。Wranglerを使用したデプロイコマンドが設定されています。環境変数API_KEYを設定してデプロイする必要があります。