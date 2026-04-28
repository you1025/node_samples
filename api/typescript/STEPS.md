# TypeScript 移行手順

## 方針

- `.js` ファイルを `.ts` にリネームし、型アノテーションを追加する
- 各ファイルの変換は依存関係の少ない順に進める
- `strict: true` を前提とし、`any` は使わない

---

## 事前準備

- [x] `package.json` の更新（devDependencies・scripts・main）
- [x] `tsconfig.json` の作成
- [x] `npm install` の実行

---

## src 以下のファイル変換

### ① `src/models/itemModel.js` → `itemModel.ts`

- [x] ファイルのリネーム（`.js` → `.ts`）
- [x] `Item` インターフェースの定義
- [x] クラスのプロパティに型を付ける
- [x] 各メソッドの引数・戻り値に型を付ける

### ② `src/services/itemService.js` → `itemService.ts`

- [x] ファイルのリネーム（`.js` → `.ts`）
- [x] 各メソッドの引数・戻り値に型を付ける

### ③ `src/controllers/itemController.js` → `itemController.ts`

- [x] ファイルのリネーム（`.js` → `.ts`）
- [x] `Request` / `Response` / `NextFunction` の型を付ける（`@types/express`）
- [x] 各メソッドの戻り値に型を付ける

### ④ `src/routes/itemRoutes.js` → `itemRoutes.ts`

- [x] ファイルのリネーム（`.js` → `.ts`）
- [x] import パスの拡張子を `.js` に統一（NodeNext ルール）

### ⑤ `src/app.js` → `app.ts`

- [x] ファイルのリネーム（`.js` → `.ts`）
- [x] import パスの拡張子を `.js` に統一（NodeNext ルール）

### ⑥ `src/index.js` → `index.ts`

- [x] ファイルのリネーム（`.js` → `.ts`）
- [x] import パスの拡張子を `.js` に統一（NodeNext ルール）

---

## 動作確認

- [x] `npm run dev` で起動確認
- [x] `npm run build` でコンパイルエラーがないことを確認
