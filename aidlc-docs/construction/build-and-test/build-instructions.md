# Build Instructions — zagin-web

## Prerequisites
- **Build Tool**: Vite 5.4
- **言語**: TypeScript 5.x
- **Runtime**: Node.js 20 以上
- **Package Manager**: pnpm 9 以上
- **Env Vars**: なし
- **System**: 任意の OS（Linux / macOS / Windows）

## Build Steps

### 1. 依存インストール
```bash
pnpm install
```

### 2. 型チェック + プロダクションビルド
```bash
pnpm build
```

内部的に `tsc -b && vite build` を実行。

### 3. ビルド成功の確認
- **出力**: `dist/` 配下に静的アセットが生成される
- 期待される出力例:
  ```
  dist/index.html                  0.45 kB │ gzip:  0.36 kB
  dist/assets/index-<hash>.js    177.08 kB │ gzip: 59.35 kB
  ```
- **エラーが無いこと** を確認

### 4. ローカルプレビュー
```bash
pnpm preview
```
http://localhost:4173 でビルド成果物を確認。

## Troubleshooting

### Build Fails: 型エラー
- `pnpm exec tsc -b` で個別に実行し、メッセージを確認
- `tsconfig.json` の `strict` が true なので、型注釈の漏れに注意

### Build Fails: 依存解決エラー
- `pnpm install` を再実行
- `node_modules` を削除して再インストール: `rm -rf node_modules && pnpm install`

### Vite Plugin Conflict
- Emotion JSX runtime を使うため `tsconfig.json` の `jsxImportSource: "@emotion/react"` と `vite.config.ts` の `react({ jsxImportSource: "@emotion/react" })` が両方必要
