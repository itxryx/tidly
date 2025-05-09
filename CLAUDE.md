# CLAUDE.md

このファイルは、このリポジトリのコードを操作する際にClaude Code（claude.ai/code）へのガイダンスを提供します。

## プロジェクト概要

tidlyはフロントエンド/バックエンドのアーキテクチャを持つプロジェクトで、Cloudflare Workersを活用したモダンなウェブアプリケーションです。

## ディレクトリ構造

```
/
├── frontend/                # React + TypeScript + Vite フロントエンド
│   ├── src/                 # ソースコード
│   │   ├── App.tsx          # メインアプリケーションコンポーネント
│   │   ├── components/      # UIコンポーネント
│   │   │   ├── board/       # ボード関連コンポーネント
│   │   │   ├── layouts/     # レイアウトコンポーネント
│   │   │   ├── posts/       # 投稿関連コンポーネント
│   │   │   └── ui/          # shadcn/uiコンポーネント
│   │   ├── lib/             # ユーティリティ関数
│   │   │   └── utils.ts     # ヘルパー関数
│   │   ├── main.tsx         # エントリーポイント
│   │   ├── pages/           # ページコンポーネント
│   │   ├── types/           # 型定義
│   │   └── worker.js        # Cloudflare Workersスクリプト
│   ├── public/              # 公開ファイル
│   └── package.json         # 依存関係と設定
│
└── backend/                 # Hono + Cloudflare Workers バックエンド
    ├── src/                 # ソースコード
    │   ├── index.ts         # メインエントリーポイント
    │   └── middlewares/     # ミドルウェアコンポーネント
    │       └── api-auth-middleware.ts # API認証ミドルウェア
    ├── wrangler.jsonc       # Cloudflare Workers設定
    └── package.json         # 依存関係と設定
```

## 技術スタック

### 共通
- **言語**: TypeScript
- **Node.js**: 22.14.0 (Volta)
- **デプロイ**: Cloudflare Workers (Wrangler)

### フロントエンド
- React 19.1.0, Vite 6.3.5
- React Router DOM 7.5.3
- Tailwind CSS 4.1.5
- shadcn/ui コンポーネントライブラリ
- ESLint 9.25.0
- Wrangler 4.14.3 (デプロイ用)

### バックエンド
- Hono 4.7.8 
- Wrangler 4.4.0
- API認証ミドルウェア

## コマンド

### フロントエンド
```bash
cd frontend && npm run dev      # 開発サーバー起動
cd frontend && npm run build    # ビルド
cd frontend && npm run lint     # リント
cd frontend && npm run preview  # Wranglerでプレビュー
cd frontend && npm run deploy   # ビルドしてデプロイ
```

### バックエンド
```bash
cd backend && npm run dev       # 開発サーバー起動
cd backend && npm run deploy    # デプロイ
cd backend && npm run cf-typegen # 型生成
```

## 現在のステータス

- **フロントエンド**: 
  - React + TypeScriptの基本設定完了
  - Wranglerによるデプロイ設定追加
  - Tailwind CSSによるスタイリング導入
  - shadcn/uiコンポーネントの導入・実装
  - React Router DOMによるルーティング追加
  - コンポーネント分割とレスポンシブ対応実装
  - 型定義の集約と適切な管理
  - Basic認証とカスタムヘッダー機能を持つWorker実装

- **バックエンド**: 
  - Hono + Cloudflare Workers構成
  - API認証ミドルウェア実装済み

## 認証システム

### バックエンド
バックエンドは「Bearer」トークンを使ったシンプルなAPI認証を実装しています：
- 環境変数 `API_KEY` で有効なAPIキーを設定
- リクエストは `Authorization: Bearer <API_KEY>` ヘッダーが必要
- 認証が失敗すると401エラーを返す

### フロントエンド
フロントエンドはCloudflare Workersを使用したBasic認証を実装しています：
- 環境変数 `BASIC_AUTH_USERNAME` と `BASIC_AUTH_PASSWORD` を設定
- Basic認証ヘッダーによる認証
- `X-Robots-Tag: noindex, nofollow` などのカスタムヘッダーを追加

## フロントエンド構成

### コンポーネント構成
- **components/board/**: ボード機能関連のコンポーネント
- **components/posts/**: 投稿機能関連のコンポーネント
- **components/layouts/**: レイアウト用コンポーネント
- **components/ui/**: shadcn/uiベースのUIコンポーネント

### 型定義
- **types/index.ts**: プロジェクト全体で使用する共通型定義

### 主要機能
- **投稿機能**: 文字数カウントとプレビュー機能付きのテキスト投稿
- **ボード機能**: フリーテキスト形式のメモボード
- **レスポンシブデザイン**: モバイル向けタブビューとデスクトップ向け2カラムレイアウト

## 推奨プラクティス

- TypeScriptの厳格な型チェックを活用し、型定義ファイルで共通型を管理
- コンポーネントの適切な分割と責務の明確化
- フロントエンドはTailwind CSSとshadcn/uiを活用したコンポーネント設計
- React Router DOMを使用した効率的なルーティング
- shadcnコンポーネントの追加: `npx shadcn@latest add [コンポーネント名]`
- レスポンシブデザインパターンの統一
- バックエンドはHonoのミドルウェアパターンとCloudflare Workersの制限を考慮
- 環境変数を適切に設定（特に認証情報）