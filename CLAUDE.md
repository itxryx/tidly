# CLAUDE.md

このファイルは、このリポジトリのコードを操作する際にClaude Code（claude.ai/code）へのガイダンスを提供します。

## プロジェクト概要

tidlyはフロントエンド/バックエンドのアーキテクチャを持つプロジェクトで、Cloudflare Workersを活用したモダンなウェブアプリケーションです。

## ディレクトリ構造

```
/
├── frontend/                # React + TypeScript + Vite フロントエンド
│   ├── src/                 # ソースコード
│   │   ├── assets/          # 静的アセット
│   │   ├── App.tsx          # メインアプリケーションコンポーネント
│   │   └── main.tsx         # エントリーポイント
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

- **フロントエンド**: React + TypeScriptの基本設定完了、Wranglerによるデプロイ設定追加
- **バックエンド**: Hono + Cloudflare Workers構成、API認証ミドルウェア実装済み

## 認証システム

バックエンドは「Bearer」トークンを使ったシンプルなAPI認証を実装しています：

- 環境変数 `API_KEY` で有効なAPIキーを設定
- リクエストは `Authorization: Bearer <API_KEY>` ヘッダーが必要
- 認証が失敗すると401エラーを返す

## 推奨プラクティス

- TypeScriptの厳格な型チェック活用
- フロントエンドはコンポーネント分割と再利用を推奨
- バックエンドはHonoのミドルウェアパターンとCloudflare Workersの制限を考慮
- 環境変数を適切に設定（特にAPI認証キー）