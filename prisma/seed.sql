-- 質問データの投入
-- データベースに接続後、このSQLを実行してください

-- 既存の質問データを削除（必要に応じて）
-- DELETE FROM "Answer";
-- DELETE FROM "Submission";
-- DELETE FROM "Question";

-- 質問1: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '社内外問わず、受講してみたい研修がありますか？',
  'SINGLE_CHOICE',
  1,
  '["はい", "いいえ"]',
  NOW(),
  NOW()
);

-- 質問2: 自由記述
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  'それはどんな研修ですか？先の質問で"いいえ"と答えた方はこんな研修があったらいいなという理想を書いてください',
  'FREE_TEXT',
  2,
  NULL,
  NOW(),
  NOW()
);

-- 質問3: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '研修を受けるとすると理想の日数は何日間ですか？（複数選択可）',
  'MULTIPLE_CHOICE',
  3,
  '["半日", "1日", "2日間", "3日間", "不問"]',
  NOW(),
  NOW()
);

-- 質問4: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '研修を受けるとすると理想の曜日や時間帯はいつですか？（複数選択可）',
  'MULTIPLE_CHOICE',
  4,
  '["平日の日中", "平日の業務後", "土日の日中", "土日の夜"]',
  NOW(),
  NOW()
);

-- 質問5: 複数選択
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  '今後、自身のスキルとして拡充したい技術分野は何ですか？',
  'MULTIPLE_CHOICE',
  5,
  '["クラウド","AI","データベース","フロントエンド","バックエンド","ソフトウェアテスト","アーキテクチャ設計","要件定義","データ分析","その他"]',
  NOW(),
  NOW()
);


-- 質問6: 自由記述
INSERT INTO "Question" ("text", "type", "order", "options", "createdAt", "updatedAt")
VALUES (
  'その他、仕事上で学習が必要になった際に困っていることや課題があれば教えてください',
  'FREE_TEXT',
  6,
  NULL,
  NOW(),
  NOW()
);

