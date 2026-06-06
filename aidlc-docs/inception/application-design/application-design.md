# Application Design (Consolidated) — zagin-me-si-

**作成日**: 2026-05-27
**プロジェクト**: zagin-me-si-（銀座 飯 探し）
**ステージ**: INCEPTION - Application Design

本ドキュメントは以下の個別ドキュメントを統合した概観である:

- [components.md](./components.md)
- [component-methods.md](./component-methods.md)
- [services.md](./services.md)
- [component-dependency.md](./component-dependency.md)

---

## 1. 設計の前提

| # | 質問 | 採用回答 |
|---|------|---------|
| Q1 | コンポーネント構成 | **C** — 細分化（FilterPanel / GenreFilter / BudgetFilter / RestaurantList / RestaurantCard / EmptyState） |
| Q2 | 絞り込みロジックの配置 | **C** — クラスベース Service オブジェクト（RestaurantSearchService） |
| Q3 | 状態管理 | **A** — React `useState` |
| Q4 | 店舗データのフィールド | **A** — 標準セット + `lat?` / `lng?` を将来用に optional |
| Q5 | データの読み込み方式 | **B** — ランタイム fetch |

---

## 2. アーキテクチャ概要

3 レイヤー構成:

```
┌─────────────────────────────────────────────────┐
│  Presentation 層（React コンポーネント）         │
│   App                                            │
│    ├── FilterPanel                               │
│    │   ├── GenreFilter                           │
│    │   └── BudgetFilter                          │
│    └── RestaurantList                            │
│        ├── RestaurantCard (× N)                  │
│        └── EmptyState                            │
└─────────────────────────────────────────────────┘
                    │ props（単方向）
                    ▼
┌─────────────────────────────────────────────────┐
│  Service 層（OOP クラス）                        │
│   RestaurantSearchService.filter(criteria)       │
└─────────────────────────────────────────────────┘
                    │ uses
                    ▼
┌─────────────────────────────────────────────────┐
│  Data Access 層                                  │
│   RestaurantRepository.loadAll()                 │
└─────────────────────────────────────────────────┘
                    │ fetch
                    ▼
            /data/restaurants.json
```

---

## 3. 主要コンポーネント

| ID | 種別 | 名前 | 責務 |
|----|------|------|------|
| C-1 | UI | App | ルート。データ取得・状態保持・派生計算 |
| C-2 | UI | FilterPanel | 絞り込みUIのコンテナ |
| C-3 | UI | GenreFilter | ジャンル複数選択 |
| C-4 | UI | BudgetFilter | 予算帯単一選択 |
| C-5 | UI | RestaurantList | 店舗一覧の描画 |
| C-6 | UI | RestaurantCard | 単一店舗カード |
| C-7 | UI | EmptyState | 該当無し表示 |
| S-1 | Service | RestaurantSearchService | 絞り込み（業務ロジック） |
| S-2 | Service | RestaurantRepository | データ取得 |

---

## 4. データモデル

```typescript
type BudgetRange = 'UNDER_1000' | 'B_1000_2000' | 'B_2000_3000' | 'OVER_3000';

type Restaurant = {
  id: string;
  name: string;
  genre: string;
  budget: BudgetRange;
  description: string;
  area: string;
  lat?: number;   // FR-Future-1 用
  lng?: number;   // FR-Future-1 用
};

type FilterCriteria = {
  genres: string[];           // 空配列 = すべて
  budget: BudgetRange | null; // null = すべて
};
```

---

## 5. 公開インターフェース（主要）

```typescript
class RestaurantRepository {
  constructor(dataUrl: string);
  loadAll(): Promise<Restaurant[]>;
}

class RestaurantSearchService {
  constructor(restaurants: Restaurant[]);
  getAll(): Restaurant[];
  getAvailableGenres(): string[];
  filter(criteria: FilterCriteria): Restaurant[];
}
```

---

## 6. 状態管理

| 状態 | 所有 | 種別 |
|------|------|------|
| 全店舗 | RestaurantSearchService（内部） | 不変 |
| 選択中の絞り込み条件 | App（useState） | 可変 |
| ローディング | App（useState） | 可変 |
| エラー | App（useState） | 可変 |
| フィルタ結果（派生） | App の計算結果 | 派生 |

---

## 7. データフロー

1. **マウント時**: `App` → `RestaurantRepository.loadAll()` → 取得 → `RestaurantSearchService` 生成
2. **絞り込み変更時**: `FilterPanel` → `App` の `setCriteria` → 再描画 → `service.filter(criteria)` → `RestaurantList` 更新

詳細は [component-dependency.md](./component-dependency.md) のシーケンス図参照。

---

## 8. 拡張性

- **FR-Future-1（現在地）**: `Restaurant` 型に `lat?` / `lng?` を既に含めることで、サービスメソッドを追加するだけで対応可能
- **データソース差し替え**: `RestaurantRepository` を抽象化しているため、JSON → REST API への切り替えは UI 側に影響しない
- **新しいフィルタ次元**: `FilterCriteria` 型と `RestaurantSearchService.filter` のみ拡張すれば良い

---

## 9. 設計検証

- [x] 全主要機能要件（FR-1〜FR-5）にマップされたコンポーネントが存在する
  - FR-1 一覧表示: `App + RestaurantList + RestaurantCard`
  - FR-2 ジャンル絞り込み: `GenreFilter + RestaurantSearchService.filter`
  - FR-3 予算絞り込み: `BudgetFilter + RestaurantSearchService.filter`
  - FR-4 絞り込み組合せ: `FilterCriteria` 型 + `filter` の AND 結合
  - FR-5 結果ゼロ件: `EmptyState`
- [x] 循環依存なし（DAG）
- [x] テスト容易性: ロジックは Service クラスに分離、UI は純粋関数的に props 駆動
- [x] FR-Future-1（位置情報）の拡張余地が確保されている
