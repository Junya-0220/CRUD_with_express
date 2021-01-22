# CRUD_with_express

gitのコマンド

```bash

git add .
git commit -m "コミットメッセージ"
git push -u origin main

```

## API実践入門

## 実践編の前提

* SNSのシンプルなAPIを設計・開発します
* RESTfulなAPIにします

 GET
 POST
 PUT
 DELETE

・使用する技術は以下のとおり

 バックエンド言語: Node.js
 Webサーバー: Express
 データベース: sqlite3
  
### なぜユーザーを扱うのか？

* 今回扱うリソースはUserのみ
* ほぼ全てのWebサービスに「人」が存在するから
* 変更の多いリソースだから

### ハンズオンの流れ

1. 環境構築をしよう
2. リソース設計をしよう
3. 読み取り可能なAPI開発をしよう
4. APIを実行する簡易フォームを作ろう
5. 書き込み可能なAPIを開発しよう
6. より高度なリソース設計について

## モジュールの概要

* Express: Node.jsのWebアプリケーションフレームワーク
* sqlite3: 軽量なRDB
* body-parser: HTMLフォームから送信された値をパース
* node-dev: ファイル編集を検知してサーバーを再起動(ホットリローディング)

## リソース指向アーキテクチャ

1. Webサービスで利用するデータを特定する
    SNSならユーザーデータや、フォローフォロワーの関係等
2. データをリソースに分ける→リソース設計
   ユーザーやツイートなど
3. リソースにURIで名前をつける→URI設計
4. リソースの表現を設計する→JSONなど
5. リンクとフォームでリソースを結びつける
6. イベントの標準的なコース設計をする
7. エラーを想定する

### SNSのデータの特定とリソース設計

・ユーザー情報
ユーザーID、ユーザー名、プロフィール、写真、誕生日

・フォロー情報
フォロワーID、フォローID

今回対象とするリソース

1. ユーザーリソース
2. 検索結果リソース

### URI設計

 /users: ユーザーリソースのURI
 /search: 検索結果リソースのURI(?qはクエリパラメータ)

| メソッド | URI | 詳細 |
| :---: | :---: | :---: |
| GET | /api/v1/users | ユーザーリストの取得 |
| GET | /api/v1/users/123 | ユーザー情報の取得 |
| POST | /api/v1/users/ | 新規ユーザーの作成 |
| PUT | /api/v1/users/123 | ユーザー情報の更新 |
| DELETE | /api/v1/users/123 | ユーザーの削除 |
| GET | /api/v1/search?q=machida | ユーザー検索結果の取得 |

### データベース設計

Usersテーブル
| フィールド | データ型 |　NULL許容 |　その他 |
| :---: | :---: | :---: |:---: |
| id | INTEGER | NOT NULL | PRIMARY KEY|
| name | TEXT | NOT NULL | |
| profile |  |  | |
| date_of_birth | TEXT |  | |
| created_at | TEXT | NOT NULL | datetime関数で日付を取得 |
| updated_at | TEXT | NOT NULL | datetime関数で日付を取得 |

### Create users table

```bash
CREATE TABLE users (  
  id INTEGER NOT NULL PRIMARY KEY, 
  name TEXT NOT NULL, 
  profile TEXT, 
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), 
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), 
  date_of_birth TEXT
);
```

## Node.jsのsqlite基本3メソッド

```JavaScript
const dbPath = "app/db/database.sqlite3"
const db = new sqlite3.Database(dbPath)// データベースの接続開始

db.serialize(() => {queries})// 内部のSQLクエリを同期的に実行
db.all(sql,(err,rows))//全ての結果を1度に取得
db.get(sql,(err,row))//1つだけ結果を取得
db.run(sql,(err))//SQLクエリを実行
db.close()//データベース接続を終了
```

### Create sample data

```bash
INSERT INTO users (name, profile) VALUES ("Subaru", "エミリアたんマジ天使！");
INSERT INTO users (name, profile) VALUES ("Emilia", "もう、スバルのオタンコナス！");
INSERT INTO users (name, profile) VALUES ("Ram", "いいえお客様、きっと生まれて来たのが間違いだわ");
INSERT INTO users (name, profile) VALUES ("Rem", "はい、スバルくんのレムです。");
INSERT INTO users (name, profile) VALUES ("Roswaal", "君は私になーぁにを望むのかな？");
```

## 同じサーバーでHTMLを表示する

```JavaScript
const path = require('path')
app.use(express.static(path.join(__dirname,'public')));
```

1. path:パス指定用モジュール
2. express.static(): 静的ファイルのルーティングディレクトリを設定

## リクエストのbodyを読み取る設定

```JavaScript
const bodyParser = require('body-parser');

//Configure body-parser to get values from input form

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

```

## DBクエリ実行用関数

```JavaScript
const run = async (sql) => {
    return new Promise((resolve, reject) => {
        db.run(sql, (err) => {
            res.status(500).send(err)
            return reject();
        }else{
            res.json({message:"新規ユーザーを作成しました！"})
            return resolve();
        })
    });
}

```

## 書き込み用SQLクエリの基本

```bash

INSERT INTO users (name, profile) VALUES ("${name}","${profile}")
UPDATE users SET name="${name}", profile="${profile}" WHERE id="${id}"
DELERE FROM users WHERE id=${id}

```
