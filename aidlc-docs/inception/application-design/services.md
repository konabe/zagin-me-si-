# Services — zagin-me-si-

**作成日**: 2026-05-27

サービス層は OOP（クラスベース）として実装する（Application Design Plan Q2=C）。
状態は不変な入力に対する純粋なフィルタ計算のみを行い、UI の状態（選択中の絞り込み条件）は React の useState 側で保持する。

---

## サービス一覧

| Service | 役割 | ライフサイクル |
|---------|------|---------------|
| RestaurantRepository | 店舗データ取得の抽象化 | App マウント時に 1 度だけ呼ぶ |
| RestaurantSearchService | 絞り込みオーケストレーション | データロード後に生成し、再描画ごとに `filter` を呼ぶ |

---

## オーケストレーションフロー

```
1. App マウント
   │
   ▼
2. RestaurantRepository.loadAll() を呼ぶ (Promise)
   │
   ▼
3. 取得結果で RestaurantSearchService を初期化
   │
   ▼
4. App は useState で FilterCriteria を保持
   │
   ▼
5. ユーザーがフィルタを変更すると criteria が更新される
   │
   ▼
6. 派生計算: service.filter(criteria) → 表示用 restaurants[]
   │
   ▼
7. RestaurantList が再描画される
```

---

## サービスの境界

- **RestaurantRepository は I/O の抽象化のみ持つ**。
  - 入力: URL（コンストラクタ引数）
  - 出力: `Restaurant[]`
  - 将来 fetch → REST API 切り替えがあっても呼び出し側に影響を与えない

- **RestaurantSearchService は計算（フィルタリング）のみ持つ**。
  - 副作用なし、I/O なし、純粋計算
  - これにより単体テストが容易（ユニットテスト計画と合致）

---

## 状態の所有者

| 状態 | 所有者 | 理由 |
|------|--------|------|
| 全店舗データ（不変） | RestaurantSearchService（インスタンス内） | 一度生成したら不変 |
| 選択中の絞り込み条件 | App コンポーネント (useState) | UI の状態は UI 層に置く |
| 派生: フィルタ後の店舗 | App コンポーネントの計算結果 | criteria 変更時に再計算 |
| ローディング状態 | App コンポーネント (useState) | UI の状態 |
| エラー状態 | App コンポーネント (useState) | UI の状態 |

---

## 拡張余地（FR-Future-1 対応）

将来「現在地の近さ」を加味する場合、サービスを拡張する想定:

- `RestaurantSearchService.filter(criteria)` の `criteria` に `location?: { lat: number; lng: number }` を追加
- または `sortByDistance(restaurants, origin)` のような新メソッドを追加
- `Restaurant.lat / lng` が optional なので、データに緯度経度が無い店舗は除外 or 後ろ送りなど挙動を決められる
- 今回はインターフェースに含めず、Restaurant 型の余地のみ確保しておく（YAGNI）
