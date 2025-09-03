# API Schema（Backend, MVP）

## 共通仕様
- **Base URL**: `https://api.example.com/v1`  
- **認証**: `Authorization: Bearer <token>`（全エンドポイント必須）  
- **ヘッダ**
  - `Content-Type: application/json`
  - `Idempotency-Key: <uuid>`（`POST /transfers` のみ推奨）
- **日時フォーマット**: ISO 8601, UTC
- **エラーフォーマット（共通）**
  - `error_code`: string
  - `message`: string

---

## オブジェクト定義

### User
- `id`: int (連番)
- `name`: string
- `icon`: string  // サーバに保存されたアイコンのファイル名

### Account
- `user_id`: int
- `account_number`: string
- `deposit`: integer  // 整数円

### Transfer
- `id`: int (連番)
- `from_user_id`: int
- `to_user_id`: int
- `amount`: integer
- `message`: string | null
- `date`: string (ISO 8601)
- `completed`: boolean

---

## エンドポイント一覧

### 1. ログイン中ユーザ情報取得
**GET /me**  
- ログインユーザのプロフィールと口座情報を返す

**response例**
```
{
  "user": {
    "id": 1,
    "name": "Taro",
    "icon": "u1.png"
  },
  "account": {
    "account_number": "12345678",
    "deposit": 10000
  }
}
```
---

### 2. ユーザ一覧取得（送金相手）
**GET /users**  
- 送金相手候補（自分以外のユーザ）を返す  
- クエリ: `exclude=self` （自分を除外する）

**response例**
```
[
  { "id": 2, "name": "Hanako", "icon": "u2.png" },
  { "id": 3, "name": "Jiro",   "icon": "u3.png" }
]
```

---

### 3. 宛先ユーザ詳細取得
**GET /users/{user_id}**  
- 送金画面で宛先情報を表示するために利用  
- エラー:  
  - `USER_NOT_FOUND`  
  - `INVALID_USER_ID`


**response例**
```
{
  "user": {
    "id": 2,
    "name": "Hanako",
    "icon": "u2.png"
  },
  "account": {
    "account_number": "98765432"
  }
}
```

---

### 4. 送金実行
**POST /transfers**  
- 宛先ユーザと金額、任意メッセージを指定して送金を行う  
- エラー:  
  - `INSUFFICIENT_FUNDS`  
  - `INVALID_AMOUNT`  
  - `USER_NOT_FOUND`

**request例**
```
{
  "to_user_id": 2,
  "money": 5000,
  "message": "ランチ代ありがとう！"
}
```

**response例**
```
{
  "id": 1001,
  "from_user_id": 1,
  "to_user_id": 2,
  "money": 5000,
  "message": "ランチ代ありがとう！",
  "date": "2025-09-01T10:00:00Z",
  "completed": true
}
```

---

### 5. 送金履歴取得（オプション）
**GET /transfers?direction=sent|received&limit=20**  
- 過去の送金履歴を取得（MVPではUI不要、内部利用想定）
