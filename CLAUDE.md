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

フロントエンドは、React + TypeScript + Viteを使用して構築されています。UIフレームワークとしてTailwind CSSを使用しており、ルーティングにはreact-router-domを採用しています。Cloudflare Pagesにデプロイするための設定（Wrangler）も含まれており、Cloudflare Workersを使用したカスタムレスポンス処理も実装されています。

### バックエンド

バックエンドはHonoフレームワークを使用したCloudflare Workersアプリケーションとして実装されています。現在は基本的なAPIエンドポイントのみ実装されています。将来的にはKV、R2、D1データベースなどのCloudflareサービスとの連携も可能です。

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
│   ├── pages/            # ページコンポーネント
│   │   ├── TopPage.tsx   # トップページ
│   │   └── AboutPage.tsx # Aboutページ
│   ├── App.tsx           # アプリケーションのメインコンポーネント（ルーティング設定）
│   ├── main.tsx          # エントリーポイント
│   └── worker.js         # Cloudflare Workersのエントリーポイント
├── public/               # 公開ディレクトリ
├── dist/                 # ビルド出力ディレクトリ
├── vite.config.ts        # Vite設定
└── wrangler.jsonc        # Cloudflare Wrangler設定

backend/
├── src/                  # ソースコード
│   └── index.ts          # アプリケーションのエントリーポイント（Honoフレームワーク）
└── wrangler.jsonc        # Cloudflare Wrangler設定
```

## 技術スタック

### フロントエンド
- React 19
- TypeScript
- Vite
- Tailwind CSS
- react-router-dom
- Cloudflare Pages
- Cloudflare Workers

### バックエンド
- Hono 4.7.9（Cloudflare Workers向けWebフレームワーク）
- TypeScript
- Cloudflare Workers
- Wrangler CLI 4.15.1

### 開発環境
- Node.js 22.14.0 (volta管理)
- ESLint 9
- TypeScript 5.8
- Wrangler CLI（Cloudflareのデプロイツール）

## Git情報

- 現在のブランチ: develop
- メインブランチ: 未定
- 初期コミット: "init"

## 開発ワークフロー

### フロントエンド
1. `npm run dev` でローカル開発サーバーを起動
2. 変更を加える
3. `npm run lint` でコードをチェック
4. `npm run build` でビルド
5. `npm run preview` でビルド結果をプレビュー

### バックエンド
1. `npm run dev` でローカル開発サーバーを起動
2. 変更を加える
3. `npm run cf-typegen` で必要に応じてCloudflare向けの型を生成
4. `npm run deploy` でCloudflare Workersにデプロイ

## デプロイ

### フロントエンド
フロントエンドはCloudflare Pagesにデプロイします。wrangler.jsonc設定ファイルが用意されており、以下の機能が設定されています：

- SPA（Single Page Application）モードでの404ハンドリング
- Cloudflare Workersを使用したカスタムレスポンス処理（X-Robots-Tagヘッダーの追加など）
- ディレクトリ指定したアセットの配信

### バックエンド
バックエンドはCloudflare Workersにデプロイします。Wranglerを使用したデプロイコマンドが設定されています。現在の設定では以下のオプションがコメントアウトされており、必要に応じて有効化できます：

- Node.js互換モード
- 環境変数の設定
- KV名前空間の利用
- R2バケットの利用
- D1データベースの利用
- AIの利用
- 監視機能の有効化