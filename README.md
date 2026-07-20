# 🌙 夜泣き・ワンオペ愚痴の駆け込み寺

夜泣きやワンオペ育児で疲れた保護者が、
匿名で気持ちを吐き出し、
共感スタンプだけでゆるくつながれるWebアプリです。

> **「アドバイスはいらない。ただ今だけ誰かに聞いてほしい。」**

---

# デモ

https://night-cry-support.vercel.app/

---

# スクリーンショット

公開後に追加予定です。

- ホーム画面
- 投稿画面
- 共感スタンプ

---

# コンセプト

本サービスは相談サイトではありません。

コメントもありません。

返信もありません。

評価機能もありません。

ただ、

- 今つらい
- 夜泣きで寝られない
- ワンオペが苦しい

そんな気持ちを短時間で吐き出し、

他の保護者から

「わかる」

という共感だけを受け取る場所です。

---

# 主な機能

## 投稿

- 匿名投稿
- 最大140文字
- Optimistic Update対応
- リアルタイム反映

---

## 共感スタンプ

1投稿につき1つだけ送信可能

スタンプ一覧

- 😮‍💨 お疲れ様
- 🌙 起きてるよ
- 🥹 わかる
- 🫂 泣きな
- 💪 がんばれ

同じスタンプ

→解除

別スタンプ

→変更

---

## リアルタイム同期

Supabase Realtime を利用し、

- 新規投稿
- スタンプ変更

が即時反映されます。

---

## 匿名利用

ユーザー登録不要

Guest ID を localStorage に保存し、

匿名のまま利用できます。

---

## 自動削除

毎朝6:00に

- 投稿
- スタンプ

を自動削除します。

---

# 技術スタック

|項目|内容|
|----|----|
|Framework|Next.js 15 (App Router)|
|Language|TypeScript|
|UI|React|
|CSS|Tailwind CSS v4|
|Database|Supabase PostgreSQL|
|Realtime|Supabase Realtime|
|Authentication|Guest ID（localStorage）|
|Hosting|Vercel|

---

# システム構成

```
Browser
    │
    ▼
Next.js(App Router)
    │
    ▼
Custom Hooks
    │
    ▼
Supabase SDK
    │
    ▼
PostgreSQL
```

---

# ディレクトリ構成

```
src
├── app
│   ├── globals.css
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── page.tsx
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── privacy
│   │   └── page.tsx
│   └── terms
│       └── page.tsx
│
├── components
│   ├── PostCard.tsx
│   ├── PostForm.tsx
│   ├── ReactionBar.tsx
│   └── Timeline.tsx
│
├── hooks
│   ├── useGuestId.ts
│   ├── usePosts.ts
│   └── useReactions.ts
│
├── lib
│   ├── guest.ts
│   └── supabase
│       └── client.ts
│
└── types
    └── index.ts
```

---

# アーキテクチャ

責務分離を重視しています。

```
UI

↓

Custom Hook

↓

Supabase SDK

↓

Database
```

UIは表示のみ。

通信処理は Hook に集約しています。

---

# データベース

## posts

|カラム|型|
|------|---|
|id|uuid|
|guest_id|uuid|
|body|text|
|created_at|timestamptz|

---

## post_reactions

|カラム|型|
|------|---|
|id|uuid|
|post_id|uuid|
|guest_id|text|
|reaction|text|
|created_at|timestamptz|

UNIQUE(post_id, guest_id)

---

# 工夫したポイント

## Optimistic Update

通信完了前に投稿を表示し、

待ち時間を感じさせないUIを実現しています。

---

## Realtime

投稿・スタンプは

Supabase Realtime により即時同期されます。

---

## RPC

スタンプ処理は

PostgreSQL Function(RPC)

へ集約し、

クライアント側をシンプルに保っています。

---

## アクセシビリティ

- aria-label
- aria-pressed
- focus-visible
- キーボード操作対応

を考慮しています。

---

# セットアップ

## Clone

```bash
git clone https://github.com/yourname/night-crying-board.git
```

```
cd night-crying-board
```

---

## Install

```
npm install
```

---

## Environment

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Run

```
npm run dev
```

---

# テスト

リリース前に以下を確認済み

- 投稿
- 投稿失敗
- スタンプ追加
- スタンプ変更
- スタンプ解除
- Realtime同期
- Guest ID保持
- Optimistic Update
- 朝6時自動削除
- レスポンシブ表示

---

# 今後の改善予定

- PWA対応
- NGワードフィルタ
- 投稿通報
- モデレーション機能
- ダークテーマ強化
- アニメーション追加
- Lighthouse最適化
- Sentry導入

---

# ライセンス

MIT License

---

# 作者

GitHubプロフィールは公開後に掲載予定です。

---

# 開発背景

育児中は、

「相談したい」のではなく、

「今だけ誰かに聞いてほしい」

という瞬間があります。

このアプリは、

そんな気持ちを安心して吐き出せる場所を目指して制作しました。