# Component Methods — zagin-me-si-

**作成日**: 2026-05-27
**注**: 詳細な業務ルールは Functional Design ステージで定義する（本ステージはシグネチャと役割の定義まで）

---

## RestaurantRepository

```typescript
class RestaurantRepository {
  constructor(dataUrl: string);

  // 店舗データを取得する（ランタイム fetch）
  loadAll(): Promise<Restaurant[]>;
}
```

- **loadAll**:
  - 入力: なし
  - 出力: `Restaurant[]` の Promise
  - 役割: 指定 URL (`/data/restaurants.json`) から JSON を fetch し配列で返す
  - エラー: fetch 失敗時は例外を投げる（UI 側で捕捉する想定）

---

## RestaurantSearchService

```typescript
class RestaurantSearchService {
  constructor(restaurants: Restaurant[]);

  // 全店舗
  getAll(): Restaurant[];

  // 全店舗から利用可能なジャンル一覧を抽出
  getAvailableGenres(): string[];

  // 絞り込み条件に従って店舗をフィルタリング
  filter(criteria: FilterCriteria): Restaurant[];
}
```

- **getAll**:
  - 入力: なし
  - 出力: 全 Restaurant 配列
  - 役割: コンストラクタで受け取った全件を返す
- **getAvailableGenres**:
  - 入力: なし
  - 出力: 重複を除いたジャンル名一覧
  - 役割: GenreFilter の選択肢候補を生成
- **filter**:
  - 入力: FilterCriteria
  - 出力: 絞り込まれた Restaurant 配列
  - 役割: ジャンル AND 予算で AND 絞り込み
  - 詳細ルール: Functional Design ステージで定義（例: genres 空配列はすべて通過、budget null はすべて通過、両方一致したもののみ返す等）

---

## App（React コンポーネント）

```typescript
function App(): JSX.Element;
```

- 内部状態:
  - `restaurants: Restaurant[]`（取得後の全店舗）
  - `criteria: FilterCriteria`（選択中の絞り込み条件）
  - `loading: boolean`
  - `error: Error | null`
- 副作用: マウント時に `RestaurantRepository.loadAll()` を呼ぶ
- 派生値: `service.filter(criteria)` の結果
- 子に渡す: `availableGenres`, `criteria`, `setCriteria`, `filteredRestaurants`

---

## FilterPanel

```typescript
type FilterPanelProps = {
  availableGenres: string[];
  criteria: FilterCriteria;
  onChange: (criteria: FilterCriteria) => void;
};

function FilterPanel(props: FilterPanelProps): JSX.Element;
```

- 子コンポーネントに分配: GenreFilter / BudgetFilter
- 子からの選択変更を統合して `onChange` で親に通知

---

## GenreFilter

```typescript
type GenreFilterProps = {
  selected: string[];
  available: string[];
  onChange: (selected: string[]) => void;
};

function GenreFilter(props: GenreFilterProps): JSX.Element;
```

- 役割: チェックボックス群で複数選択UIを描画

---

## BudgetFilter

```typescript
type BudgetFilterProps = {
  selected: BudgetRange | null;
  onChange: (selected: BudgetRange | null) => void;
};

function BudgetFilter(props: BudgetFilterProps): JSX.Element;
```

- 役割: 予算帯のラジオまたはセレクタを描画
- 「指定なし」を選べる UI を含める

---

## RestaurantList

```typescript
type RestaurantListProps = {
  restaurants: Restaurant[];
};

function RestaurantList(props: RestaurantListProps): JSX.Element;
```

- 役割: 受け取った配列をカードで列挙。空なら EmptyState を表示

---

## RestaurantCard

```typescript
type RestaurantCardProps = {
  restaurant: Restaurant;
};

function RestaurantCard(props: RestaurantCardProps): JSX.Element;
```

- 役割: 1店舗を視覚的に表現（店名・ジャンル・予算帯・紹介・エリア）

---

## EmptyState

```typescript
type EmptyStateProps = {
  message?: string;
};

function EmptyState(props: EmptyStateProps): JSX.Element;
```

- 役割: 「該当する店舗がありません」を表示
