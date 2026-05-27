# Application Design Plan — zagin-me-si-

**作成日**: 2026-05-27
**ステージ**: INCEPTION - Application Design
**目的**: コンポーネントの責務・インターフェース・依存関係をハイレベルに定義する

---

## Part 1: 計画チェックリスト

### 1. コンテキスト分析
- [ ] requirements.md を読み込み、機能/非機能要件を整理
- [ ] 主要な機能領域を識別
  - 店舗データの読み込み
  - 絞り込みロジック（ジャンル / 予算）
  - 一覧UI表示
  - 絞り込みUIコントロール

### 2. コンポーネント設計
- [ ] components.md（コンポーネント定義と責務）を作成
- [ ] component-methods.md（メソッドシグネチャ）を作成
- [ ] services.md（サービス層・オーケストレーション）を作成
- [ ] component-dependency.md（依存関係と通信パターン）を作成
- [ ] application-design.md（上記を統合）を作成

### 3. 設計検証
- [ ] 設計の完全性と一貫性を確認
- [ ] 将来拡張（FR-Future-1: 位置情報）の余地が確保されているか確認

---

## Part 2: 設計判断のための質問

以下の質問に `[Answer]:` の隣に **A〜E** で回答してください。E（その他）を選んだ場合は自由記述してください。

---

### Q1: コンポーネント構成のスタイル

絞り込みUIと一覧表示UIの構造をどうしますか？

- **A**: シンプル — 単一ページに全部入れる（最小構成、ファイル数少）
- **B**: 分離 — 「FilterPanel コンポーネント」と「RestaurantList コンポーネント」を別ファイルに分け、ページから両者を組み合わせる（再利用性・テスト容易性が高い）
- **C**: さらに細分化 — 「FilterPanel」「GenreFilter」「BudgetFilter」「RestaurantList」「RestaurantCard」「EmptyState」など細かく分割（拡張性最大、ファイル数多）

[Answer]: 

---

### Q2: 絞り込みロジックの配置

フィルタロジック（ジャンル/予算による絞り込み）をどこに配置しますか？

- **A**: UIコンポーネント内に直接書く（最速、ただしテスト・再利用が難しい）
- **B**: **純粋関数として `lib/filter.ts` などに切り出す**（テスト容易、推奨）
- **C**: クラスベースの Service オブジェクトに包む（OOPで設計したい場合）

[Answer]: 

---

### Q3: 状態管理

絞り込み条件（選択中のジャンル・予算）の状態管理はどうしますか？

- **A**: React の `useState` のみで十分（MVP として軽量）
- **B**: React Context で複数コンポーネントから共有
- **C**: Redux / Zustand など外部ライブラリ
- **D**: URLクエリパラメータに同期させる（リンク共有可能）

[Answer]: 

---

### Q4: 店舗データの構造

店舗データ（`Restaurant` 型）に最低限含めるフィールドは？（複数選択可）

- 必須候補:
  - `id: string`（一意ID）
  - `name: string`（店名）
  - `genre: string`（ジャンル）
  - `budget: BudgetRange`（予算帯）
  - `description: string`（紹介文）
  - `area: string`（銀座X丁目など）
- 将来拡張のためにオプショナルで含めたいもの:
  - `lat?: number; lng?: number;`（FR-Future-1 のため）
  - その他

回答スタイル: **A**（上記の必須セット + lat/lng オプショナル を採用）/ **B**（さらに項目を追加したい、内容を記述）/ **C**（減らしたい、内容を記述）

[Answer]: 

---

### Q5: データの読み込み方式

JSONサンプルデータの読み込み方は？

- **A**: ビルド時に静的 import（`import data from './data/restaurants.json'`）— シンプルで高速、データ更新時は再ビルド
- **B**: ランタイムで fetch（`/data/restaurants.json` をブラウザから取得）— データ差し替えがビルドなしで可能
- **C**: ファイルシステムからサーバー側で読み込み（SSR/API経由）

[Answer]: 

---

## Part 3: 回答後の生成物

回答後、以下を `aidlc-docs/inception/application-design/` 配下に生成します:

- `components.md`
- `component-methods.md`
- `services.md`
- `component-dependency.md`
- `application-design.md`（統合版）
