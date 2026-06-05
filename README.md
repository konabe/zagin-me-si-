# zagin-me-si-（銀座 飯 探し）

職場が銀座にある人のためのランチ場所探しWebアプリ。ジャンルと予算でサクッと絞り込めます。

## 技術スタック

- TypeScript / React 18 / Vite
- Emotion（CSS-in-JS）
- Vitest + @testing-library/react
- Biome（lint + format）
- pnpm

## 必要環境

- Node.js 20 以上
- pnpm 9 以上

## セットアップ

```bash
pnpm install
```

## 開発

```bash
pnpm dev
```

ブラウザで http://localhost:5173 を開く。

## テスト

```bash
pnpm test          # 単発実行
pnpm test:watch    # ウォッチモード
```

## ビルド

```bash
pnpm build
pnpm preview       # ビルド成果物のプレビュー
```

## Lint / Format

```bash
pnpm check         # チェックのみ
pnpm lint
pnpm format        # フォーマット適用
```

## デプロイ（Vercel）

1. GitHub にリポジトリを push
2. [Vercel](https://vercel.com/) で「Add New Project」→ このリポジトリを選択
3. Framework Preset が **Vite** に自動設定されることを確認して **Deploy**

`vercel.json` は不要（Vercel が Vite を自動検出するため）。

## ディレクトリ構成

```text
src/
├── main.tsx                       # React DOM root
├── App.tsx                        # ルートコンポーネント
├── types/restaurant.ts            # 型定義
├── lib/
│   ├── RestaurantRepository.ts    # データ取得
│   └── RestaurantSearchService.ts # 絞り込みロジック
├── components/
│   ├── FilterPanel.tsx
│   ├── GenreFilter.tsx
│   ├── BudgetFilter.tsx
│   ├── RestaurantList.tsx
│   ├── RestaurantCard.tsx
│   └── EmptyState.tsx
└── test/setup.ts

tests/
├── lib/                # サービス・リポジトリのユニットテスト
└── components/         # React コンポーネントテスト + 統合テスト

public/
└── data/restaurants.json  # サンプル店舗データ

aidlc-docs/             # AI-DLC ワークフローのドキュメント
```

## 言語

**日本語限定**。多言語対応（i18n）は実装していません（UI テキストは日本語ハードコード、ソートも `localeCompare(..., "ja")` で日本語ロケール固定）。

## ライセンス

このリポジトリは個人の学習・実験用です。サンプル店舗データは架空のものです。
