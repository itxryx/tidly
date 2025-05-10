.PHONY: dev deploy typegen create-migration migrate-diff migrate-local migrate-remote

# マイグレーションファイル作成
create-migration:
	@read -p "マイグレーション名を入力: " name; \
	npx wrangler d1 migrations create tidly $$name

# Prismaスキーマから初期マイグレーションファイル生成
migrate-diff-init:
	npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script --output migrations/0001_init.sql

# Prismaスキーマから差分マイグレーションファイル生成
migrate-diff:
	@read -p "変更内容（ファイル名）: " name; \
	npx prisma migrate diff --from-migrations --to-schema-datamodel prisma/schema.prisma --script --output migrations/$(shell date +%Y%m%d%H%M%S)_$$name.sql

# ローカル環境へのマイグレーション適用
migrate-local:
	npx wrangler d1 migrations apply tidly --local

# リモート環境へのマイグレーション適用
migrate-remote:
	npx wrangler d1 migrations apply tidly --remote