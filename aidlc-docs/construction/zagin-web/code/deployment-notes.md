# Deployment Notes — zagin-web

## デプロイ方式
**GitHub Actions → Vercel CLI**（Vercel ネイティブの Git 自動デプロイは無効化）

## ファイル
- `.github/workflows/ci-cd.yml` — CI（test ジョブ） + Deploy（deploy ジョブ）
- `vercel.json` — `git.deploymentEnabled: false`（Vercel 側の自動デプロイ無効化）

## ワークフロー

### `test` ジョブ（PR と main push の両方で実行）
- `pnpm install --frozen-lockfile`
- `pnpm check`（Biome lint + format）
- `pnpm exec tsc -b`（型チェック）
- `pnpm test`（Vitest 全テスト）
- `pnpm build`（プロダクションビルド）

### `deploy` ジョブ（test ジョブが成功した後に実行）
- Vercel CLI を pnpm 経由でインストール
- `main` への push なら **Production** デプロイ、PR なら **Preview** デプロイ
- 流れ: `vercel pull` → `vercel build` → `vercel deploy --prebuilt`
- PR では deploy 後に Preview URL を PR コメントとして投稿（既存コメントがあれば更新）

## 必須 GitHub Secrets

| Secret 名 | 取得方法 |
|-----------|---------|
| `VERCEL_TOKEN` | https://vercel.com/account/tokens で発行 |
| `VERCEL_ORG_ID` | ローカルで `pnpm dlx vercel link` 実行後、`.vercel/project.json` の `orgId` |
| `VERCEL_PROJECT_ID` | 同上、`.vercel/project.json` の `projectId` |

## なぜ Vercel ネイティブ自動デプロイではなく Actions か

| 観点 | Vercel 自動デプロイ | GitHub Actions |
|------|-------------------|---------------|
| CI ゲート | プロジェクト側の Ignored Build Step に閉じる | テスト / lint / 型チェックを明示的に gate にできる |
| カスタマイズ | 限定的 | 任意のステップ追加可（PR コメント、Slack 通知 等） |
| 可視性 | Vercel ダッシュボード | GitHub の Actions タブで一元管理 |
| 二重デプロイ | 両方有効だと衝突 | `vercel.json` で Vercel 側を無効化 |

## 検証

ローカルからは検証できない（GitHub Actions と Vercel 環境が必要）。
セットアップ後、以下で確認:

1. Secrets 登録後、PR を作成 → Actions の `deploy` ジョブが Preview URL を返す
2. PR にコメントが付き、Preview URL でアクセス可能
3. main にマージ → 同じワークフローが Production デプロイを実行
