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

## デプロイ（Vercel via GitHub Actions）

このリポジトリは **GitHub Actions** から Vercel にデプロイします。Vercel ネイティブの Git 連携自動デプロイは `vercel.json` で無効化済み（二重デプロイ防止）。

### デプロイの発火条件

| イベント | デプロイ先 |
|---------|-----------|
| `main` への push | **Production** |
| Pull Request | **Preview**（PR にコメントで URL が貼られる） |

CI（lint + 型チェック + テスト + ビルド）が通った時のみデプロイされます。

### 初回セットアップ

1. **Vercel プロジェクトを作成**
   - ローカルで `pnpm dlx vercel link` を実行し、Vercel アカウントにログインしてプロジェクトを作成
   - 完了すると `.vercel/project.json` が生成され、`orgId` / `projectId` が記録される
2. **Vercel トークンを取得**
   - https://vercel.com/account/tokens で Personal Token を発行
3. **GitHub Secrets を登録**（Repository settings → Secrets and variables → Actions）

   | Secret 名 | 値 |
   |-----------|----|
   | `VERCEL_TOKEN` | 上記で発行した Token |
   | `VERCEL_ORG_ID` | `.vercel/project.json` の `orgId` |
   | `VERCEL_PROJECT_ID` | `.vercel/project.json` の `projectId` |
4. PR を作成または `main` に push すると、Actions が自動でデプロイします

### ワークフロー
`.github/workflows/ci-cd.yml` を参照。

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
