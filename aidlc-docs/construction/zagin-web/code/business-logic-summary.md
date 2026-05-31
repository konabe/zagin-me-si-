# Business Logic Summary — zagin-web

## ファイル
- `src/lib/RestaurantSearchService.ts`
- `tests/lib/RestaurantSearchService.test.ts`

## 実装内容
- `RestaurantSearchService` クラス（クラスベース Service、Application Design Q2=C）
- 公開メソッド:
  - `getAll()` - 全店舗を返す
  - `getAvailableGenres()` - 重複除去 + 日本語ソート
  - `filter(criteria)` - ジャンル AND 予算で絞り込み

## フィルタルール
- `genres` 配列が空 → ジャンル条件をスキップ（すべて通過）
- `budget` が null → 予算条件をスキップ（すべて通過）
- 両方の条件を満たす店舗のみ返す（AND）
- 複数ジャンル指定時はジャンル内 OR（includes チェック）

## テスト
- 全 11 ケース
- getAll: 2、getAvailableGenres: 3、filter: 6（空 criteria / ジャンル単独 / 複数ジャンル / 予算単独 / 両方 / 該当無し）
- 元配列を破壊しないことも検証
