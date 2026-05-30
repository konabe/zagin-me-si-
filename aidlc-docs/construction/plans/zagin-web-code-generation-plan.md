# Code Generation Plan — zagin-web

**作成日**: 2026-05-27
**Unit**: zagin-web（単一 Unit、Greenfield）
**ワークスペースルート**: `/home/user/zagin-me-si-`

---

## ユニットコンテキスト

### スコープ
- 銀座のランチ店を「ジャンル」「予算」で絞り込めるWebアプリ（MVP）
- ローカル開発 + Vercel デプロイ

### 実装する Functional Requirements
- FR-1 ランチ店一覧表示
- FR-2 ジャンル絞り込み
- FR-3 予算絞り込み
- FR-4 絞り込みの組み合わせ
- FR-5 結果ゼロ件のハンドリング

### 採用技術
TypeScript / React 18 / Vite / Emotion / Vitest / @testing-library/react / Biome / pnpm

### ターゲットディレクトリ構成

```text
/home/user/zagin-me-si-/
├── package.json
├── pnpm-lock.yaml（生成）
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── biome.json
├── index.html
├── README.md（更新）
├── public/
│   └── data/
│       └── restaurants.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types/
│   │   └── restaurant.ts
│   ├── lib/
│   │   ├── RestaurantRepository.ts
│   │   └── RestaurantSearchService.ts
│   ├── components/
│   │   ├── FilterPanel.tsx
│   │   ├── GenreFilter.tsx
│   │   ├── BudgetFilter.tsx
│   │   ├── RestaurantList.tsx
│   │   ├── RestaurantCard.tsx
│   │   └── EmptyState.tsx
│   └── test/
│       └── setup.ts
└── tests/
    ├── lib/
    │   ├── RestaurantSearchService.test.ts
    │   └── RestaurantRepository.test.ts
    └── components/
        ├── RestaurantCard.test.tsx
        ├── GenreFilter.test.tsx
        ├── BudgetFilter.test.tsx
        ├── RestaurantList.test.tsx
        ├── FilterPanel.test.tsx
        └── App.test.tsx
```

---

## 実装ステップ

### Step 1: プロジェクト構造セットアップ
- [ ] `package.json` を作成（dependencies / devDependencies / scripts: dev, build, preview, test, lint, format）
- [ ] `tsconfig.json` / `tsconfig.node.json` を作成（strict, ESNext, JSX）
- [ ] `vite.config.ts` を作成（@vitejs/plugin-react + Vitest 設定）
- [ ] `biome.json` を作成（lint + format）
- [ ] `index.html` を作成（root div + main.tsx エントリ）
- [ ] `.gitignore` を作成（node_modules, dist, coverage 等）

### Step 2: 型定義の生成（モデル層）
- [ ] `src/types/restaurant.ts` を作成
  - `Restaurant` 型（id, name, genre, budget, description, area, lat?, lng?）
  - `BudgetRange` 型
  - `FilterCriteria` 型
  - `BUDGET_RANGES` 定数（UI で使う表示順 + ラベル）

### Step 3: サンプルデータ
- [ ] `public/data/restaurants.json` を作成
  - 15件程度の銀座ランチ店サンプルデータ（実在しない架空店舗で良い）
  - 各店に id / name / genre / budget / description / area を持たせる
  - lat / lng は今回は含めない（将来用に optional）

### Step 4: ビジネスロジック層の生成
- [ ] `src/lib/RestaurantSearchService.ts` を作成
  - `class RestaurantSearchService { constructor(restaurants) ... }`
  - `getAll()` / `getAvailableGenres()` / `filter(criteria)` を実装
  - フィルタルール: genres が空配列ならすべて通過、budget が null ならすべて通過、両者の AND で絞り込む

### Step 5: ビジネスロジック層のユニットテスト
- [ ] `tests/lib/RestaurantSearchService.test.ts` を作成
  - `getAll`: 全件返すこと
  - `getAvailableGenres`: 重複除去・ソート
  - `filter`: ジャンル単体 / 予算単体 / 両方 / 空 criteria / 該当無し のケース

### Step 6: ビジネスロジック層のサマリー
- [ ] `aidlc-docs/construction/zagin-web/code/business-logic-summary.md` を作成

### Step 7: データアクセス層の生成
- [ ] `src/lib/RestaurantRepository.ts` を作成
  - `class RestaurantRepository { constructor(dataUrl) ... loadAll() }`
  - `loadAll` は `fetch(dataUrl)` → JSON パース → 配列を返す
  - 失敗時は例外を投げる

### Step 8: データアクセス層のユニットテスト
- [ ] `tests/lib/RestaurantRepository.test.ts` を作成
  - `fetch` をモックし、成功・失敗ケースをテスト

### Step 9: データアクセス層のサマリー
- [ ] `aidlc-docs/construction/zagin-web/code/repository-summary.md` を作成

### Step 10: フロントエンドコンポーネント生成 - 葉ノード
- [ ] `src/components/EmptyState.tsx`
- [ ] `src/components/RestaurantCard.tsx`
- [ ] `src/components/GenreFilter.tsx`
- [ ] `src/components/BudgetFilter.tsx`
- [ ] data-testid 属性を主要要素に付与（例: `restaurant-card`, `genre-filter-checkbox`, `budget-filter-radio`, `empty-state`）

### Step 11: フロントエンドコンポーネント生成 - 中間/ルート
- [ ] `src/components/FilterPanel.tsx`（GenreFilter + BudgetFilter を内包）
- [ ] `src/components/RestaurantList.tsx`（RestaurantCard × N or EmptyState）
- [ ] `src/App.tsx`（Repository + Service + 状態管理）
- [ ] `src/main.tsx`（React DOM root マウント）
- [ ] Emotion でレスポンシブなスタイルを実装

### Step 12: テスト環境セットアップ
- [ ] `src/test/setup.ts` を作成（@testing-library/jest-dom の設定）

### Step 13: フロントエンドコンポーネントのテスト
- [ ] `tests/components/RestaurantCard.test.tsx`
- [ ] `tests/components/EmptyState.test.tsx`
- [ ] `tests/components/GenreFilter.test.tsx`
- [ ] `tests/components/BudgetFilter.test.tsx`
- [ ] `tests/components/RestaurantList.test.tsx`
- [ ] `tests/components/FilterPanel.test.tsx`
- [ ] `tests/components/App.test.tsx`（fetch モック → ロード → フィルタ → 描画の統合テスト）

### Step 14: フロントエンドのサマリー
- [ ] `aidlc-docs/construction/zagin-web/code/frontend-summary.md` を作成

### Step 15: デプロイ成果物
- [ ] 必要なら `vercel.json` を作成（Vite なら不要のことが多い。判断: 静的ホスティング設定が自動検出されない場合のみ）
- [ ] 不要と判断した場合はその旨を documentation に記載

### Step 16: ドキュメント
- [ ] `README.md` を更新（プロジェクト概要・セットアップ・起動・テスト・デプロイ手順）
- [ ] `aidlc-docs/construction/zagin-web/code/code-generation-summary.md` を作成

---

## 検証観点（Build and Test ステージで実施）

- TypeScript の型チェック通過
- Biome lint pass
- Vitest 全 pass
- `pnpm dev` で起動 → ブラウザでフィルタ動作確認

---

## ストーリーマッピング

| FR | 実装ファイル |
|----|--------------|
| FR-1 一覧表示 | `App.tsx` + `RestaurantList.tsx` + `RestaurantCard.tsx` + `RestaurantRepository.ts` + `restaurants.json` |
| FR-2 ジャンル絞り込み | `GenreFilter.tsx` + `RestaurantSearchService.filter` |
| FR-3 予算絞り込み | `BudgetFilter.tsx` + `RestaurantSearchService.filter` |
| FR-4 組合せ | `FilterPanel.tsx` + `FilterCriteria` 型 + `App.tsx` の状態統合 |
| FR-5 ゼロ件 | `EmptyState.tsx` + `RestaurantList.tsx` の条件分岐 |
| NFR-7 デプロイ | `vercel.json`（任意） + README デプロイ手順 |

---

## 総ステップ数: 16
