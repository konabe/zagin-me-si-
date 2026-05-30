# Tech Stack Decisions — zagin-web

**作成日**: 2026-05-27
**Unit**: zagin-web

---

## サマリー

| 分類 | 採用技術 | 質問 |
|------|---------|------|
| 言語 | TypeScript 5.x | NFR-6（前提） |
| ビルド基盤 | Vite | Q1=A |
| UI フレームワーク | React 18.x | Q1=A |
| スタイリング | Emotion (`@emotion/react`, `@emotion/styled`) | Q2=D + フォローアップで Emotion |
| テストランナー | Vitest | Q3=A |
| UI コンポーネントテスト | @testing-library/react + jsdom | Q4=A |
| Lint / Format | Biome | Q5=B |
| パッケージマネージャー | pnpm | Q6=B |
| デプロイ | Vercel（または互換ホスティング） | Q7=B |
| Node.js（開発） | 20.x 以上 | — |

---

## 採用理由

### 言語: TypeScript
- 型による安全性
- Restaurant / BudgetRange / FilterCriteria の型を明確化

### ビルド基盤 / UI: Vite + React
- 開発サーバー起動・HMR が高速
- 設定が少なく MVP に適する
- Vercel が自動検出

### スタイリング: Emotion
- React との相性が良い（Hook ベース、SSR にも強い）
- `styled` API でコンポーネント単位のスタイル定義
- Tailwind と異なりクラス名を考えずに済み、メンテも良好

### テストランナー: Vitest
- Vite と同じ設定基盤で動く
- Jest 互換 API、移行コスト低
- jsdom 環境で React コンポーネントテスト可能

### Lint / Format: Biome
- ESLint + Prettier より高速・設定最小
- 単一ツールで lint + format
- 新興だが安定しつつあり、MVP には十分

### パッケージマネージャー: pnpm
- ディスク効率・速度に優れる
- Vercel もサポート

### デプロイ: Vercel
- Vite を自動検出（ビルドコマンド・出力ディレクトリ）
- GitHub と連携して push → 自動デプロイ
- 無料枠で十分

---

## 主要依存関係（想定）

### dependencies
- `react`
- `react-dom`
- `@emotion/react`
- `@emotion/styled`

### devDependencies
- `typescript`
- `vite`
- `@vitejs/plugin-react`
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `jsdom`
- `@biomejs/biome`
- `@types/react`
- `@types/react-dom`

---

## 不採用にしたもの

| 候補 | 不採用理由 |
|------|-----------|
| Next.js | SSR / API ルートが不要、Vite で十分 |
| Remix | 同上 |
| Tailwind CSS | ユーザー選択により Emotion を採用 |
| Jest | Vitest が Vite と統合されているため |
| ESLint + Prettier | Biome の方が高速・設定最小 |
| npm / yarn | pnpm 採用 |
| node:test | Vitest の方が DX が良い |

---

## デプロイ設定（Code Generation で実装）

- リポジトリルートに `vercel.json` を**必要に応じて**追加（Vite なら不要なことが多い）
- ビルドコマンド: `pnpm build`
- 出力ディレクトリ: `dist`
- Node version: 20.x

詳細手順は README に記載する。
