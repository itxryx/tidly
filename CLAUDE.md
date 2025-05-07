# CLAUDE.md

このファイルは、このリポジトリのコードを操作する際にClaude Code（claude.ai/code）へのガイダンスを提供します。

## プロジェクト概要

tidlyはフロントエンド/バックエンドのアーキテクチャを持つプロジェクトです。

## ディレクトリ構造

```
/
├── frontend/          # React + TypeScript + Vite フロントエンド
│   ├── src/           # ソースコード
│   │   ├── assets/    # 静的アセット
│   │   ├── App.tsx    # メインアプリケーションコンポーネント
│   │   └── main.tsx   # エントリーポイント
│   ├── public/        # 公開ファイル
│   └── package.json   # 依存関係と設定
│
└── backend/           # Hono + Cloudflare Workers バックエンド
    ├── src/           # ソースコード
    │   └── index.ts   # メインエントリーポイント
    ├── wrangler.jsonc # Cloudflare Workers設定
    └── package.json   # 依存関係と設定
```

## 技術スタック

### 共通
- **言語**: TypeScript
- **Node.js**: 22.14.0 (Volta)

### フロントエンド
- React 19.1.0, Vite 6.3.5
- ESLint 9.25.0

### バックエンド
- Hono 4.7.8, Cloudflare Workers
- Wrangler 4.4.0

## コマンド

### フロントエンド
```bash
cd frontend && npm run dev      # 開発サーバー起動
cd frontend && npm run build    # ビルド
cd frontend && npm run lint     # リント
```

### バックエンド
```bash
cd backend && npm run dev       # 開発サーバー起動
cd backend && npm run deploy    # デプロイ
cd backend && npm run cf-typegen # 型生成
```

## 現在のステータス

- **フロントエンド**: React + TypeScriptの基本設定完了、サンプルアプリのみ
- **バックエンド**: Hono + Cloudflare Workersの基本設定完了、Hello Worldエンドポイントのみ

## 推奨プラクティス

- TypeScriptの厳格な型チェック活用
- フロントエンドはコンポーネント分割と再利用を推奨
- バックエンドはHonoのミドルウェアパターンとCloudflare Workersの制限を考慮