FROM python:3.10-slim-buster

ENV PYTHONUNBUFFERED=1
ARG POETRY_VERSION=1.1.12
WORKDIR /app


RUN pip install "poetry==$POETRY_VERSION" && poetry config virtualenvs.create false

COPY poetry.lock pyproject.toml /app/

RUN ["poetry", "install", "--no-interaction", "--no-ansi"]


COPY . /app/



ENTRYPOINT ["sh", "/app/entrypoint.sh"]