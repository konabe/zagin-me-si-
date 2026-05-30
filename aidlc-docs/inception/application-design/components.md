# Components — zagin-me-si-

**作成日**: 2026-05-27
**対象**: INCEPTION - Application Design

設計判断の根拠: Application Design Plan の Q1=C（細分化）, Q2=C（クラスベース Service）, Q3=A（useState）, Q4=A（標準フィールド + lat?/lng?）, Q5=B（ランタイム fetch）

---

## コンポーネント分類

本アプリのコンポーネントは大きく3レイヤーに分かれる:

| レイヤー | 目的 | 含まれるコンポーネント |
|---------|------|-----------------------|
| **Presentation（UI）** | 画面表示・ユーザー入力 | App / FilterPanel / GenreFilter / BudgetFilter / RestaurantList / RestaurantCard / EmptyState |
| **Service（業務ロジック）** | 検索・絞り込み | RestaurantSearchService |
| **Data Access** | データ取得 | RestaurantRepository |
| **型定義** | 共通モデル | Restaurant / BudgetRange / FilterCriteria |

---

## UI コンポーネント

### C-1: App
- **責務**: アプリ全体のルート。データ取得・状態管理・子コンポーネントへの props 配布
- **状態**: 全店舗データ / 選択中フィルタ / フィルタ後の店舗一覧
- **依存**: RestaurantSearchService, RestaurantRepository, FilterPanel, RestaurantList

### C-2: FilterPanel
- **責務**: 絞り込みUIのコンテナ。GenreFilter と BudgetFilter を内包し、ユーザー入力を親（App）に伝える
- **入力**: 選択中のジャンル一覧 / 予算帯、利用可能なジャンル一覧
- **出力**: ジャンル選択変更、予算帯選択変更のイベント
- **依存**: GenreFilter, BudgetFilter

### C-3: GenreFilter
- **責務**: ジャンルの複数選択UI（チェックボックス or トグル）
- **入力**: 選択中ジャンル / 全ジャンル候補
- **出力**: 選択変更イベント
- **依存**: なし（純粋なUI）

### C-4: BudgetFilter
- **責務**: 予算帯の単一選択UI（ラジオ or セレクタ）
- **入力**: 選択中の予算帯 / 全予算帯候補
- **出力**: 選択変更イベント
- **依存**: なし（純粋なUI）

### C-5: RestaurantList
- **責務**: フィルタ後の店舗一覧のレイアウト。リスト内が空ならば EmptyState を表示
- **入力**: 表示対象の店舗配列
- **依存**: RestaurantCard, EmptyState

### C-6: RestaurantCard
- **責務**: 単一店舗の表示カード。店名・ジャンル・予算帯・紹介文・エリアを描画
- **入力**: 単一の Restaurant オブジェクト
- **依存**: なし

### C-7: EmptyState
- **責務**: 該当する店舗が無い旨を表示
- **入力**: なし（または空メッセージのカスタム文）
- **依存**: なし

---

## サービス層コンポーネント

### S-1: RestaurantSearchService（クラス）
- **責務**: 店舗一覧に対する絞り込み（ジャンル・予算）を提供
- **形態**: クラスベース（OOP）
- **状態**: 内部に元の店舗データを保持
- **インターフェース**: filter(criteria) → 絞り込み後の配列を返す

### S-2: RestaurantRepository（クラス）
- **責務**: 店舗データの取得を抽象化（現在はランタイム fetch、将来は API 等に差し替え可）
- **形態**: クラスベース（OOP）
- **インターフェース**: `loadAll(): Promise<Restaurant[]>`

---

## データ型（モデル）

### T-1: Restaurant
```typescript
type Restaurant = {
  id: string;
  name: string;
  genre: string;
  budget: BudgetRange;
  description: string;
  area: string;
  lat?: number;   // FR-Future-1 用（オプショナル）
  lng?: number;   // FR-Future-1 用（オプショナル）
};
```

### T-2: BudgetRange
```typescript
type BudgetRange = 'UNDER_1000' | 'B_1000_2000' | 'B_2000_3000' | 'OVER_3000';
```

### T-3: FilterCriteria
```typescript
type FilterCriteria = {
  genres: string[];          // 空配列なら「すべて」
  budget: BudgetRange | null; // null なら「すべて」
};
```

---

## コンポーネント責務マトリクス

| Component | 描画 | 状態保持 | データ取得 | 業務ロジック |
|-----------|:---:|:---:|:---:|:---:|
| App | ✓（コンテナ） | ✓ | ✓（呼び出し） | - |
| FilterPanel | ✓ | - | - | - |
| GenreFilter | ✓ | - | - | - |
| BudgetFilter | ✓ | - | - | - |
| RestaurantList | ✓ | - | - | - |
| RestaurantCard | ✓ | - | - | - |
| EmptyState | ✓ | - | - | - |
| RestaurantSearchService | - | ✓（元データ保持） | - | ✓ |
| RestaurantRepository | - | - | ✓ | - |
