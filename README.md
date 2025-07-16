# Digi-Coders

Digi-Coders — это образовательная платформа для изучения программирования с помощью визуального конструктора (Blockly) и интерактивных курсов.

## Особенности

- Визуальное программирование с помощью Blockly
- Разделение ролей: студенты и тренеры
- Управление курсами и главами
- Система обратной связи и контактов
- Аутентификация пользователей и тренеров
- Docker-окружение для быстрого запуска

## Структура проекта

```
Digi-Coders-main/
  backend/      # Серверная часть (Node.js, Express, MongoDB)
  frontend/     # Клиентская часть (React, Blockly)
  docker-compose.yml  # Docker-оркестрация
```

## Быстрый старт

### 1. Клонирование репозитория

```bash
git clone https://github.com/yourusername/Digi-Coders.git
cd Digi-Coders-main
```

### 2. Запуск с помощью Docker

```bash
docker-compose up --build
```

- Frontend будет доступен на: http://localhost:3000
- Backend будет доступен на: http://localhost:5000

### 3. Запуск вручную

#### Backend

```bash
cd backend
npm install
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm start
```

## Переменные окружения

Скопируйте файл `env.example` в `.env` и укажите свои значения.

## Технологии

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React, Blockly
- **Docker** для контейнеризации

## Контакты

Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с нами через форму обратной связи на сайте или откройте issue в репозитории.
