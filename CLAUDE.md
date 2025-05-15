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

このプロジェクトはフロントエンドとバックエンドを分離したアプリケーションです。

### フロントエンド

フロントエンドは、React + TypeScript + Viteを使用して構築されています。UIフレームワークとしてTailwind CSSを使用しており、ルーティングにはreact-router-domを採用しています。CloudflareのWranglerを使用してデプロイする設定も含まれています。

### バックエンド

バックエンドは現在まだ実装されていません。

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

## プロジェクト構造

```
frontend/
├── src/                  # ソースコード
│   ├── assets/           # 静的アセット（画像など）
│   ├── pages/            # ページコンポーネント
│   │   ├── TopPage.tsx   # トップページ
│   │   └── AboutPage.tsx # Aboutページ
│   ├── App.tsx           # アプリケーションのメインコンポーネント（ルーティング設定）
│   └── main.tsx          # エントリーポイント
├── public/               # 公開ディレクトリ
├── dist/                 # ビルド出力ディレクトリ
├── vite.config.ts        # Vite設定
└── wrangler.jsonc        # Cloudflare Wrangler設定

backend/
└── （実装待ち）
```

## 技術スタック

### フロントエンド
- React 19
- TypeScript
- Vite
- Tailwind CSS
- react-router-dom
- Cloudflare Pages

### 開発環境
- Node.js 22.14.0 (volta管理)
- ESLint 9
- TypeScript 5.8

## Git情報

- 現在のブランチ: develop
- メインブランチ: 未定
- 初期コミット: "init"

## 開発ワークフロー

1. `npm run dev` でローカル開発サーバーを起動
2. 変更を加える
3. `npm run lint` でコードをチェック
4. `npm run build` でビルド
5. `npm run preview` でビルド結果をプレビュー

## デプロイ

フロントエンドはCloudflare Pagesにデプロイする予定です。wrangler.jsonc設定ファイルがすでに用意されています。