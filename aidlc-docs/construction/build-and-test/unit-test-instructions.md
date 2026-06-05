# Unit Test Execution — zagin-web

## 実行

### 全テスト実行
```bash
pnpm test
```

内部的に `vitest run` を呼び出す。

### ウォッチモード
```bash
pnpm test:watch
```

### 個別ファイル実行
```bash
pnpm exec vitest run tests/lib/RestaurantSearchService.test.ts
```

## テスト構成

### ライブラリ層（src/lib）
| ファイル | テスト数 | 内容 |
|---------|---------|------|
| `tests/lib/RestaurantSearchService.test.ts` | 12 | getAll / getAvailableGenres / filter（空 criteria / ジャンル単独 / 複数ジャンル / 予算単独 / AND / 該当無し / 元配列を破壊しない） |
| `tests/lib/RestaurantRepository.test.ts` | 3 | fetch 成功 / HTTP エラー / ネットワーク例外 |

### コンポーネント層（src/components）
| ファイル | テスト数 | 内容 |
|---------|---------|------|
| `tests/components/RestaurantCard.test.tsx` | 2 | 主要フィールドの描画 / data-testid |
| `tests/components/EmptyState.test.tsx` | 2 | デフォルト/カスタムメッセージ |
| `tests/components/GenreFilter.test.tsx` | 4 | 描画 / 選択状態 / 追加クリック / 削除クリック |
| `tests/components/BudgetFilter.test.tsx` | 4 | 描画 / 指定なし状態 / 予算選択 / 指定なし戻し |
| `tests/components/RestaurantList.test.tsx` | 2 | 一覧描画 / 空時 EmptyState |
| `tests/components/FilterPanel.test.tsx` | 3 | 内包確認 / ジャンル変更 / 予算変更 |
| `tests/components/App.test.tsx` | 5 | loading → 一覧 / ジャンル絞り込み / AND / EmptyState / fetch エラー（統合シナリオ） |

### 合計
- **9 ファイル / 37 テストケース**

## 期待される結果

```
 Test Files  9 passed (9)
      Tests  37 passed (37)
```

## カバレッジ目標
- フィルタロジック（RestaurantSearchService）: 100%
- データアクセス（RestaurantRepository）: 100%
- UI コンポーネント: 主要パスをすべてカバー（描画・主要なユーザー操作）

## テスト失敗時の対応
1. `pnpm test` の出力で失敗箇所を確認
2. テストファイルの該当箇所と実装を見比べる
3. 単体ファイル実行（`pnpm exec vitest run <path>`）で素早く反復
