# NFR Requirements — zagin-web

**作成日**: 2026-05-27
**Unit**: zagin-web
**ステージ**: CONSTRUCTION - NFR Requirements

requirements.md の NFR-1〜NFR-7 をベースに、本 Unit 固有の NFR 詳細と技術スタックの判断根拠を記録する。

---

## 1. パフォーマンス（NFR-1）

| 項目 | 要件 | 達成手段 |
|------|------|---------|
| 初回表示 | 2秒以内（ローカル） | Vite による高速ビルド、静的アセット配信 |
| 絞り込み応答 | 即時（〜100ms） | クライアントサイドの純粋関数フィルタ、サンプル件数 10〜20 |
| バンドルサイズ | 過大でないこと | React + Emotion 程度に抑える、不要ライブラリを入れない |

## 2. データ（NFR-2）

| 項目 | 要件 |
|------|------|
| 形式 | JSON ファイル `public/data/restaurants.json`（ランタイム fetch） |
| 件数 | 10〜20 件のサンプル |
| 取得 | ブラウザから `fetch('/data/restaurants.json')` |
| 静的化 | Vite の `public/` ディレクトリで静的アセットとして配信 |

## 3. セキュリティ（NFR-3）

| 項目 | 要件 |
|------|------|
| 認証 | なし |
| 個人情報 | 取り扱わない |
| 秘匿情報 | なし（API キー不要、環境変数不要） |
| Security Baseline 拡張 | 適用しない |

## 4. 対応環境（NFR-4）

| 項目 | 要件 |
|------|------|
| ブラウザ | Chrome / Edge / Safari の最新版 |
| デバイス | PC / スマホ両対応（レスポンシブ） |
| Node.js（開発） | 20.x 以上 |

## 5. テスト（NFR-5）

| 項目 | 要件 |
|------|------|
| ユニットテスト | RestaurantSearchService の filter / getAvailableGenres を中心にカバー |
| UI コンポーネントテスト | @testing-library/react で RestaurantCard / FilterPanel / RestaurantList の主要な描画パスをテスト |
| 統合テスト（軽量） | App コンポーネントで「データロード → フィルタ → 一覧描画」の流れをテスト |
| PBT | 適用しない |
| カバレッジ目標 | フィルタロジック 100%、UI は主要パスのみ |

## 6. 技術スタック（NFR-6）

詳細は [tech-stack-decisions.md](./tech-stack-decisions.md) 参照。

## 7. デプロイ（NFR-7） — **本ステージで追加**

| 項目 | 要件 |
|------|------|
| デプロイ先 | Vercel（または同等の静的ホスティング: Netlify, Cloudflare Pages 等） |
| ビルド方式 | `pnpm build` で `dist/` に静的ファイルを生成し、それを配信 |
| 環境変数 | 不要 |
| デプロイ設定 | フレームワーク自動検出に任せる（Vercel は Vite を自動認識）。必要なら最小限の `vercel.json` を用意 |
| CI | 本 MVP では Git push → Vercel 自動デプロイで十分（GitHub Actions 等は MVP 外） |

### Infrastructure Design の扱い

Workflow Planning の時点で Infrastructure Design は **SKIPPED**（ローカル動作のみ）と判定していたが、Vercel デプロイが要件に加わった。
ただし以下の理由から **Infrastructure Design ステージを再開する必要はない** と判断する:

- Vercel は Vite プロジェクトを自動検出し、ビルドコマンド・出力ディレクトリを自動設定する
- インフラ構成は実質「静的ホスティング 1 種類」のみ
- 必要な設定はリポジトリの `vercel.json`（または不要）レベルで完結
- 本 NFR Requirements ステージでデプロイ要件を明文化することで、Code Generation 段階で適切に対応可能

代替として、Code Generation ステージで以下を成果物に含める:

- `vercel.json`（必要に応じて）
- README にデプロイ手順を追記

---

## 8. 使われないが将来確保しておく NFR

| 項目 | 状況 |
|------|------|
| FR-Future-1（位置情報） | 型に `lat?` `lng?` を含めることで余地確保済み |
| 外部 API 連携 | スコープ外（変更なし） |
| 認証 | スコープ外（変更なし） |
