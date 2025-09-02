## 実行方法
docker-compose up --build

## 開発環境構築(ローカル)
uvのインストール

macOS and Linux
`curl -LsSf https://astral.sh/uv/install.sh | sh`

Windows
`powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`

`uv venv`

`uv sync`

各種コマンド実行
`uv run ○○`

フォーマットコマンド
`uv run ruff format`