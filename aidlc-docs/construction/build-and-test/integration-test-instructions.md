# Integration Test Instructions — zagin-web

## 位置づけ

本プロジェクトは単一フロントエンドアプリ（外部サービスなし）のため、伝統的な意味でのサービス間統合テストは存在しない。
代わりに `tests/components/App.test.tsx` が **コンポーネント統合テスト** を担い、以下の流れをカバーする:

1. App マウント → RestaurantRepository（fetch をモック）→ データ取得
2. RestaurantSearchService 経由でフィルタ
3. FilterPanel → RestaurantList の更新（React の単方向データフロー）
4. EmptyState 切替 / エラー切替

## 統合シナリオ

| シナリオ | テストケース |
|---------|-------------|
| 起動 → 一覧表示 | "起動時に loading を表示し、その後一覧を表示する" |
| フィルタ単独 | "ジャンル選択で絞り込まれる" |
| フィルタ AND | "ジャンル + 予算の AND 絞り込みが機能する" |
| ゼロ件遷移 | "該当無しの条件では EmptyState を表示する" |
| エラー処理 | "fetch 失敗時はエラーを表示する" |

## 実行

```bash
pnpm exec vitest run tests/components/App.test.tsx
```

または全テスト実行で含まれる:

```bash
pnpm test
```

## 環境

- jsdom（Vitest 内蔵）
- `vi.stubGlobal('fetch', ...)` で fetch をモック化
- @testing-library/react で実 DOM 操作と同等のテスト

## 期待される結果

```
✓ tests/components/App.test.tsx (5 tests)
```

## 手動 E2E 確認（推奨）

ユニット/統合テストに加え、ブラウザでの実機確認を推奨:

1. `pnpm dev`
2. http://localhost:5173 を開く
3. 以下を確認:
   - 15件の店舗が一覧表示される
   - ジャンルチップをクリックすると絞り込まれる（複数選択 OR）
   - 予算チップをクリックすると絞り込まれる（単一選択）
   - ジャンル + 予算の AND 動作
   - 「指定なし」で予算フィルタが解除される
   - 該当無し条件で EmptyState が表示される
   - スマホ幅（〜768px）で 1 カラムレイアウトに切り替わる
