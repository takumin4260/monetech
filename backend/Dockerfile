FROM python:3.13.7-slim

ENV PYTHONUNBUFFERED=1
ENV UV_SYSTEM_PYTHON=true

WORKDIR /app

RUN pip install uv

COPY ./pyproject.toml /app/

RUN uv pip install --no-cache .

COPY . /app

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
