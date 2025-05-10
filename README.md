# tidly

React と Cloudflare Workers の習作。

## 概要

投稿機能とメモボード機能が実装されてます。

## セットアップ

### 前提条件
- Node.js 22.14.0

### フロントエンド
```bash
# 依存関係のインストール
cd frontend
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# デプロイ
npm run deploy
```

### バックエンド
```bash
# 依存関係のインストール
cd backend
npm install

# 開発サーバーの起動
npm run dev
# または: make dev

# 型生成
npm run cf-typegen
# または: make typegen

# デプロイ
npm run deploy
# または: make deploy
```

### マイグレーション

```bash
cd backend

# マイグレーションファイルの作成
make create-migration

# 初期マイグレーションファイルの生成
make migrate-diff-init

# 差分マイグレーションファイルの生成
make migrate-diff

# ローカル環境への適用
make migrate-local

# リモート環境への適用
make migrate-remote
```

### デプロイ

develop / main ブランチへのマージでリリースが可能です。

データベースのマイグレーションは手動で行ってください。

### 環境変数

#### フロントエンド
- `BASIC_AUTH_USERNAME`: Basic 認証のユーザー名
- `BASIC_AUTH_PASSWORD`: Basic 認証のパスワード

#### バックエンド
- `API_KEY`: Bearer トークン認証用の API キー