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
│   │   ├── main.tsx         # エントリーポイント
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
  - React Router DOMによるルーティング追加
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

## 推奨プラクティス

- TypeScriptの厳格な型チェック活用
- フロントエンドはTailwind CSSを活用したコンポーネント設計
- React Router DOMを使用した効率的なルーティング
- バックエンドはHonoのミドルウェアパターンとCloudflare Workersの制限を考慮
- 環境変数を適切に設定（特に認証情報）