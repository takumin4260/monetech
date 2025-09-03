# API Schema（Backend, MVP）

## 共通仕様
- **Base URL**: `http://localhost:8000`  
- **認証**: サーバーサイドsessionを使用
- **ヘッダ**
  - `Content-Type: application/json`
- **エラーフォーマット（共通）**
  - `error_code`: string
  - `message`: string

---

## オブジェクト定義

### User
- `id`: int (連番)
- `name`: string
- `icon`: string
- `email`: string
- `password`: string

### Account
- `user_id`: int
- `account_number`: int(連番)
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
### ログイン
**POST /login**（認証不要）  
- 入力: `email`, `password`（JSON）
- 成功時: セッション発行
- レスポンス: `200 OK` `{ "ok": true }`
- エラー: `401 Unauthorized`（`INVALID_CREDENTIALS`）

**request例**
```json
{
  "email": "taro@example.com",
  "password": "passw0rd"
}
```

**response例**
```json
{ "ok": true }
```

### ログアウト
**POST /logout**（認証必須）  
- 入力: なし
- 成功時: セッション無効化
- レスポンス: `204 No Content`
- エラー: `401 Unauthorized`（`INVALID_CREDENTIALS`）



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
    "account_number": 1007,
    "deposit": 10000
  }
}
```
---

### 2. ユーザ一覧取得（送金相手）
**GET /users**  
- 送金相手候補（自分以外のユーザ）を返す

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

**request例**
```
{
  "to_user_id": 2,
  "amount": 5000,
  "message": "ランチ代ありがとう！"
}
```

**response例**
```
{
  "completed": true
}
```

---
