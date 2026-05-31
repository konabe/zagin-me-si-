# Repository Summary — zagin-web

## ファイル
- `src/lib/RestaurantRepository.ts`
- `tests/lib/RestaurantRepository.test.ts`

## 実装内容
- `RestaurantRepository` クラス
- `loadAll()`: `fetch(dataUrl)` → JSON パース → `Restaurant[]` を返す
- レスポンスが `ok` でない場合は `Error` を投げる
- fetch そのものの例外（ネットワーク失敗等）はそのまま伝播

## テスト
- 全 3 ケース
- 成功 / HTTP エラー (404) / ネットワーク例外
- `vi.stubGlobal('fetch', ...)` で fetch をモック
