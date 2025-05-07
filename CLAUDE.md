# CLAUDE.md

このファイルは、このリポジトリのコードを操作する際にClaude Code（claude.ai/code）へのガイダンスを提供します。

## プロジェクト概要

tidlyはフロントエンド/バックエンドのアーキテクチャを持つ新しいプロジェクトです。現在のプロジェクト構造は以下の通りです：

- `/frontend/` - React + TypeScript + Vite を使用したフロントエンドコード
- `/backend/` - バックエンドコード用ディレクトリ（現在は空）

## 技術スタック

### フロントエンド
- **フレームワーク**: React 19.1.0
- **言語**: TypeScript 5.8.3
- **ビルドツール**: Vite 6.3.5
- **リンター**: ESLint 9.25.0
- **Node.js**: 22.14.0 (Volta で管理)

### バックエンド
- まだ実装されていません

## コマンド

### フロントエンド
```bash
# 開発サーバーの起動
cd frontend && npm run dev

# ビルド
cd frontend && npm run build

# リント
cd frontend && npm run lint

# ビルドプレビュー
cd frontend && npm run preview
```

## 開発ワークフロー

1. フロントエンド開発は `frontend` ディレクトリで行います
2. バックエンド開発は `backend` ディレクトリで行います（今後実装予定）

## 現在のステータス

プロジェクトは初期段階にあります。フロントエンドは React + TypeScript + Vite の基本的な構成が設定されていますが、バックエンドはまだ実装されていません。