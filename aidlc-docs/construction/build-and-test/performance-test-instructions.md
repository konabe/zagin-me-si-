# Performance Test Instructions — zagin-web

## 位置づけ

MVP スコープにおいては大規模なパフォーマンステスト（負荷試験・ストレステスト）は **適用外**。
NFR-1（初回 2 秒以内 / 絞り込み即時）を満たすことの確認は、以下の軽量手段で十分とする。

## パフォーマンス要件（NFR-1）

| 項目 | 目標 |
|------|------|
| 初回ページ表示 | 2 秒以内（ローカル / ファーストロード） |
| 絞り込み応答 | 即時（< 100ms） |
| バンドルサイズ（gzip） | 過大でないこと（参考: 60KB 前後） |

## 実測手段

### 1. ビルドサイズ確認
```bash
pnpm build
```

期待値:
```
dist/assets/index-<hash>.js   ~177 kB │ gzip: ~59 kB
```

### 2. Lighthouse 計測（任意）
1. `pnpm dev` または `pnpm preview` でサーバー起動
2. Chrome DevTools → Lighthouse → Performance 計測
3. 確認指標:
   - First Contentful Paint < 1.5s
   - Largest Contentful Paint < 2.5s
   - Total Blocking Time < 200ms

### 3. 絞り込みレスポンス
- ブラウザで操作し、フィルタクリック → 一覧更新が体感即時であることを確認
- React DevTools の Profiler で 1 操作あたり < 16ms（60fps）を狙う

## ボトルネックが見つかった場合

- バンドル過大: `pnpm build` の出力を確認し、不要な依存を削除
- 描画遅延: メモ化（React.memo / useMemo）を検討。本実装では既に `useMemo` で service とフィルタ結果を派生計算
- データ膨張: 件数増加時は仮想スクロール（react-window 等）の導入を検討（MVP 外）
