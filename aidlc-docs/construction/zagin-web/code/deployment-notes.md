# Deployment Notes — zagin-web

## デプロイ先
Vercel（または互換ホスティング: Netlify / Cloudflare Pages 等）

## vercel.json の判断

**結論: 作成しない（Vercel の自動検出に任せる）**

理由:
- Vercel は Vite プロジェクトを自動検出する
  - Build Command: `pnpm build`
  - Output Directory: `dist`
  - Install Command: `pnpm install`（package.json の `packageManager` で pnpm が選ばれる）
- 環境変数なし、リダイレクト/ヘッダー設定なし、サーバーレス関数なし
- 余計な `vercel.json` を置くと、将来 Vercel 側のデフォルト改善を取り込めなくなる

## デプロイ手順
1. GitHub にリポジトリを push（既に push 済み）
2. https://vercel.com にログインし「Add New Project」
3. リポジトリ `konabe/zagin-me-si-` を選択
4. Framework Preset が **Vite** に自動設定されることを確認
5. **Deploy** クリック → 完了

## 検証
- Vercel が割り当てる URL（例: `zagin-me-si.vercel.app`）にアクセス
- 一覧が表示され、フィルタが動作することを確認
- Lighthouse でパフォーマンスを軽くチェック（NFR-1）

## 注意
- `public/data/restaurants.json` は静的アセットとして配信される
- `/data/restaurants.json` パスでブラウザから取得可能
