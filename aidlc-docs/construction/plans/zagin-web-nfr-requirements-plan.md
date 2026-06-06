# NFR Requirements Plan — zagin-web

**作成日**: 2026-05-27
**Unit**: zagin-web（単一Unit）
**ステージ**: CONSTRUCTION - NFR Requirements

requirements.md で既に多くの NFR は確定済み（パフォーマンス Local 2秒 / 認証なし / モダンブラウザ / レスポンシブ）。
本ステージでは **技術スタックの具体決定** に集中する。

---

## Part 1: 計画チェックリスト

- [ ] requirements.md / application-design.md の NFR 関連を再確認
- [ ] 技術スタック判断のための質問への回答を収集
- [ ] nfr-requirements.md を生成
- [ ] tech-stack-decisions.md を生成

---

## Part 2: 質問

### Q1: フロントエンドフレームワーク

React を採用する前提で、ビルド基盤は？

- **A**: **Vite + React + TypeScript**（軽量・高速・SPA、推奨）
- **B**: Next.js（フルスタック、将来のSSR/APIに強い、設定多め）
- **C**: Remix（フォーム駆動、現代的）

[Answer]: A

---

### Q2: スタイリング

UIスタイルの実装方法は？

- **A**: **Tailwind CSS**（ユーティリティ、開発速度高、推奨）
- **B**: CSS Modules（コンポーネント単位、シンプル）
- **C**: 素のCSS / 単一スタイルシート（最小構成）
- **D**: styled-components / Emotion（CSS-in-JS）

[Answer]: D（具体ライブラリは **Emotion** に確定）

---

### Q3: テストフレームワーク

ユニットテストフレームワークは？

- **A**: **Vitest**（Vite と統合、高速、推奨）
- **B**: Jest（成熟、エコシステム大）
- **C**: Node 標準の `node:test`（最小依存）

[Answer]: A

---

### Q4: コンポーネントテスト

UI コンポーネントのテストも書く？

- **A**: 書く（@testing-library/react を導入し RestaurantCard 等の描画テスト）
- **B**: 書かない（フィルタロジックのユニットテストだけにする、MVP として軽量）

[Answer]: A

---

### Q5: Linter / Formatter

コード品質ツールは？

- **A**: **ESLint + Prettier**（標準、設定多め）
- **B**: Biome（高速、設定最小、新興）
- **C**: 入れない（MVP として最小構成）

[Answer]: B

---

### Q6: パッケージマネージャー

依存管理は？

- **A**: **npm**（Node 標準、シンプル）
- **B**: pnpm（高速・ディスク効率）
- **C**: yarn

[Answer]: B

---

### Q7: 追加の NFR 確認

requirements.md の以下は変更不要でよいか？

- 認証なし
- 個人情報なし
- ローカル動作のみ（クラウドデプロイは MVP 外）
- ブラウザ: Chrome / Edge / Safari の最新
- ユニットテスト・統合テスト実施、PBT は不要

回答: **A**（このまま）/ **B**（変更したい。内容を記述）

[Answer]: B — デプロイは Vercel などのデプロイメントサービスを利用したい（クラウドデプロイをスコープに含める）

---

## Part 3: 回答後の生成物

- `aidlc-docs/construction/zagin-web/nfr-requirements/nfr-requirements.md`
- `aidlc-docs/construction/zagin-web/nfr-requirements/tech-stack-decisions.md`
