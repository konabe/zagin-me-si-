# Component Dependency — zagin-me-si-

**作成日**: 2026-05-27

---

## 依存方向

矢印は「A → B = A が B に依存する（A が B を import / 呼び出す）」を意味する。

```mermaid
flowchart TD
    App["App"]
    Repo["RestaurantRepository"]
    Svc["RestaurantSearchService"]
    FP["FilterPanel"]
    GF["GenreFilter"]
    BF["BudgetFilter"]
    RL["RestaurantList"]
    RC["RestaurantCard"]
    ES["EmptyState"]
    Types["Types (Restaurant / BudgetRange / FilterCriteria)"]

    App --> Repo
    App --> Svc
    App --> FP
    App --> RL
    FP --> GF
    FP --> BF
    RL --> RC
    RL --> ES

    App --> Types
    Repo --> Types
    Svc --> Types
    FP --> Types
    GF --> Types
    BF --> Types
    RL --> Types
    RC --> Types

    style App fill:#FFD180,stroke:#E65100,stroke-width:2px,color:#000
    style Repo fill:#80CBC4,stroke:#00695C,stroke-width:2px,color:#000
    style Svc fill:#80CBC4,stroke:#00695C,stroke-width:2px,color:#000
    style Types fill:#CE93D8,stroke:#6A1B9A,stroke-width:2px,color:#000
    linkStyle default stroke:#333,stroke-width:1px
```

---

## 依存マトリクス

|              | App | Repo | Svc | FP | GF | BF | RL | RC | ES | Types |
|--------------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| App          |  -  |  ✓  |  ✓  |  ✓  |  -  |  -  |  ✓  |  -  |  -  |  ✓   |
| Repo         |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  ✓   |
| Svc          |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  ✓   |
| FilterPanel  |  -  |  -  |  -  |  -  |  ✓  |  ✓  |  -  |  -  |  -  |  ✓   |
| GenreFilter  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  ✓   |
| BudgetFilter |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  ✓   |
| RestaurantList |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  ✓  |  ✓  |  ✓   |
| RestaurantCard |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  ✓   |
| EmptyState   |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -  |  -   |

- 依存は **一方向**（DAG）
- 循環依存は存在しない
- 子コンポーネント（GF/BF/RC/ES）は他のドメインコンポーネントを知らない（再利用性が高い）

---

## 通信パターン

| ソース → デスティネーション | 方法 | データ |
|------------------|------|--------|
| App → Repo | コンストラクタ + `await loadAll()` | URL |
| App → Svc | コンストラクタで配列を渡す | `Restaurant[]` |
| App → FilterPanel | props 経由（criteria, availableGenres, onChange） | 値 + コールバック |
| FilterPanel → GenreFilter | props 経由 | selected, available, onChange |
| FilterPanel → BudgetFilter | props 経由 | selected, onChange |
| App → RestaurantList | props 経由 | `Restaurant[]` |
| RestaurantList → RestaurantCard | 各要素を map で渡す | `Restaurant` |
| RestaurantList → EmptyState | 空判定で条件レンダリング | - |

- UI 層は完全に **単方向データフロー**（React の標準パターン）
- グローバル状態管理ライブラリは使わない（useState で十分、Q3=A）

---

## データフロー図

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant App
    participant Repo as RestaurantRepository
    participant Svc as RestaurantSearchService
    participant UI as Filter & List UI

    App->>Repo: loadAll()
    Repo-->>App: Restaurant[]
    App->>Svc: new Service(restaurants)
    Svc-->>App: instance
    App->>UI: 初期描画(全店舗)

    U->>UI: ジャンル/予算を変更
    UI->>App: onChange(criteria)
    App->>Svc: filter(criteria)
    Svc-->>App: 絞り込み結果
    App->>UI: 再描画
```
