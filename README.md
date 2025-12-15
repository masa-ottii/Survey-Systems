# Survey System

Next.js + TypeScript + Prisma + Neon PostgreSQLで構築したアンケートシステム

## 機能

- 10問程度のアンケート表示
- 複数選択（チェックボックス）形式の質問
- 自由記述形式の質問
- 回答のデータベース保存
- **回答送信後に全体結果を表示**
  - 複数選択：グラフ形式で集計結果を表示
  - 自由記述：全回答を箇条書きで表示
- ユーザー認証なし（誰でも回答可能）

## 技術スタック

- **フレームワーク**: Next.js 16.0 (App Router)
- **言語**: TypeScript 5.9
- **ORM**: Prisma
- **UI**: shadcn/ui + Tailwind CSS
- **データベース**: Neon PostgreSQL
- **デプロイ**: Vercel

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を参考に`.env`ファイルを作成し、Neon PostgreSQLの接続情報を設定します。

```bash
cp .env.example .env
```

`.env`ファイルを編集して、Neonのデータベース接続文字列を設定してください：

```env
DATABASE_URL="postgresql://user:password@hostname.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:password@hostname.neon.tech/dbname?sslmode=require"
```

### 3. データベースのセットアップ

Prismaスキーマをデータベースにプッシュします：

```bash
npx prisma db push
```

Prisma Clientを生成します：

```bash
npx prisma generate
```

### 4. サンプルデータの投入

Neon のダッシュボードまたは Prisma Studio を使って `prisma/seed.sql` の内容を実行してください。

**Prisma Studioを使う場合:**

```bash
npx prisma studio
```

ブラウザで開いたPrisma Studioから、SQLエディタで `prisma/seed.sql` の内容を実行できます。

**Neon Consoleを使う場合:**

1. Neonのダッシュボードにログイン
2. プロジェクトを選択
3. SQL Editorを開く
4. `prisma/seed.sql`の内容をコピー＆ペーストして実行

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

### 6. アンケートページへアクセス

- トップページ: [http://localhost:3000](http://localhost:3000)
- アンケートページ: [http://localhost:3000/survey](http://localhost:3000/survey)
- 結果ページ: [http://localhost:3000/survey/results](http://localhost:3000/survey/results)

アンケートに回答すると、自動的に結果ページへリダイレクトされます。

## プロジェクト構造

```
/app
  /api
    /survey
      /submit         # 回答送信API
        route.ts
      /results        # 結果取得API
        route.ts
  /survey
    /results          # 結果表示ページ
      page.tsx
    page.tsx          # アンケートページ
  layout.tsx
  page.tsx            # トップページ
  globals.css
/components
  /ui                 # shadcn/ui コンポーネント
  survey-form.tsx     # アンケートフォームコンポーネント
  survey-results.tsx  # 結果表示コンポーネント
/lib
  prisma.ts           # Prisma Client インスタンス
  utils.ts            # ユーティリティ関数
/prisma
  schema.prisma       # データベーススキーマ
  seed.sql            # サンプルデータ投入用SQL
```

## データベーススキーマ

### Question (質問)

- `id`: 質問ID
- `text`: 質問文
- `type`: 質問形式 (MULTIPLE_CHOICE | FREE_TEXT)
- `order`: 表示順序
- `options`: 選択肢 (JSON配列、MULTIPLE_CHOICEの場合のみ)

### Submission (提出)

- `id`: 提出ID
- `createdAt`: 提出日時

### Answer (回答)

- `id`: 回答ID
- `submissionId`: 提出ID
- `questionId`: 質問ID
- `value`: 回答値 (JSON)

## 開発コマンド

```bash
npm run dev          # 開発サーバー起動
npm run build        # プロダクションビルド
npm run start        # プロダクションサーバー起動
npm run lint         # ESLint実行
npx prisma studio    # Prisma Studio起動（データベースGUI）
npx prisma generate  # Prisma Client生成
npx prisma db push   # スキーマをデータベースに反映
```

## デプロイ

Vercelへのデプロイ手順：

1. GitHubにプロジェクトをプッシュ
2. Vercelダッシュボードで新規プロジェクトを作成
3. GitHubリポジトリを接続
4. 環境変数を設定 (`DATABASE_URL`, `DIRECT_URL`)
5. デプロイ

## ライセンス

MIT
