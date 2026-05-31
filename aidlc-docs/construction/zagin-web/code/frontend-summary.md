# Frontend Summary — zagin-web

## ファイル

### コンポーネント
- `src/main.tsx` - React DOM root マウント
- `src/App.tsx` - ルート。Repository + Service + 状態管理 + レイアウト
- `src/components/FilterPanel.tsx` - GenreFilter + BudgetFilter を内包
- `src/components/GenreFilter.tsx` - ジャンル複数選択（チップUI）
- `src/components/BudgetFilter.tsx` - 予算帯単一選択（チップUI + 指定なし）
- `src/components/RestaurantList.tsx` - 一覧 or EmptyState
- `src/components/RestaurantCard.tsx` - 単一店舗カード
- `src/components/EmptyState.tsx` - 該当無し表示

### テスト
- `src/test/setup.ts` - testing-library 環境セットアップ
- `tests/components/RestaurantCard.test.tsx`
- `tests/components/EmptyState.test.tsx`
- `tests/components/GenreFilter.test.tsx`
- `tests/components/BudgetFilter.test.tsx`
- `tests/components/RestaurantList.test.tsx`
- `tests/components/FilterPanel.test.tsx`
- `tests/components/App.test.tsx` - 統合シナリオ（ロード→絞り込み→ゼロ件→エラー）

## スタイル方針
- Emotion `styled` API でコンポーネント単位にスタイル定義
- `Global` で reset + base font
- レスポンシブ: 768px 以下で 1 カラム、それ以上で 2 カラム（フィルタ + 一覧）
- グリッド: `auto-fill, minmax(280px, 1fr)` で柔軟に追従

## アクセシビリティ / 自動テスト
- 全インタラクティブ要素に `data-testid` を付与
  - `restaurant-card` / `genre-filter-checkbox` / `budget-filter-radio` / `empty-state`
  - `loading` / `error` / `result-count` / `filter-panel` / `restaurant-list`
- `role="status"` (EmptyState) / `role="alert"` (Error)
- 隠し input + label でラジオ/チェックボックスとして機能（スクリーンリーダー互換）

## 状態の流れ
1. App マウント → Repository.loadAll() → restaurants をセット
2. useMemo で Service とジャンル一覧を派生
3. ユーザーが FilterPanel で操作 → setCriteria
4. useMemo で `service.filter(criteria)` を再計算 → RestaurantList を再描画
