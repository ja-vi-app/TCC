# Dockerfile

# pull the official docker image
FROM python:3.9.4-slim AS build

# set work directory
WORKDIR /app

# set env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# copy source code
COPY main.py /app
COPY src /app/src

EXPOSE 8080

CMD python -m uvicorn main:app --reload --host 0.0.0.0 --port 8080