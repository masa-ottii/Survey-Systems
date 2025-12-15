-- サンプル質問データの投入
-- データベースに接続後、このSQLを実行してください

-- 既存の質問データを削除（必要に応じて）
-- DELETE FROM "Answer";
-- DELETE FROM "Submission";
-- DELETE FROM "Question";

-- 質問1: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '普段利用するプログラミング言語を選択してください（複数選択可）',
  'MULTIPLE_CHOICE',
  1,
  '["JavaScript", "TypeScript", "Python", "Java", "C#", "Go", "Rust", "その他"]',
  NOW(),
  NOW()
);

-- 質問2: 自由記述
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  'プログラミングを始めたきっかけを教えてください',
  'FREE_TEXT',
  2,
  NULL,
  NOW(),
  NOW()
);

-- 質問3: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '興味のある技術分野を選択してください（複数選択可）',
  'MULTIPLE_CHOICE',
  3,
  '["Web開発", "モバイルアプリ開発", "機械学習・AI", "クラウド", "DevOps", "セキュリティ", "データベース", "その他"]',
  NOW(),
  NOW()
);

-- 質問4: 自由記述
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '現在取り組んでいるプロジェクトや学習内容について教えてください',
  'FREE_TEXT',
  4,
  NULL,
  NOW(),
  NOW()
);

-- 質問5: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '使用したことのあるフレームワークを選択してください（複数選択可）',
  'MULTIPLE_CHOICE',
  5,
  '["React", "Vue.js", "Angular", "Next.js", "Express", "Django", "Flask", "Spring Boot", "その他"]',
  NOW(),
  NOW()
);

-- 質問6: 自由記述
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '技術学習で困っていることや課題があれば教えてください',
  'FREE_TEXT',
  6,
  NULL,
  NOW(),
  NOW()
);

-- 質問7: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '情報収集に使用しているメディアを選択してください（複数選択可）',
  'MULTIPLE_CHOICE',
  7,
  '["公式ドキュメント", "Qiita", "Zenn", "Stack Overflow", "YouTube", "技術書", "オンライン学習サイト", "その他"]',
  NOW(),
  NOW()
);

-- 質問8: 自由記述
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '今後挑戦してみたい技術やプロジェクトはありますか',
  'FREE_TEXT',
  8,
  NULL,
  NOW(),
  NOW()
);

-- 質問9: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '開発環境として使用しているツールを選択してください（複数選択可）',
  'MULTIPLE_CHOICE',
  9,
  '["VS Code", "IntelliJ IDEA", "Vim/Neovim", "Sublime Text", "WebStorm", "PyCharm", "その他"]',
  NOW(),
  NOW()
);

-- 質問10: 自由記述
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  'このアンケートへのご意見・ご感想をお聞かせください',
  'FREE_TEXT',
  10,
  NULL,
  NOW(),
  NOW()
);
