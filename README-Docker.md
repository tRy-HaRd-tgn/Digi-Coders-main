# Запуск Digi-Coders с Docker

Это руководство поможет вам запустить приложение Digi-Coders с помощью Docker.

## Предварительные требования

- Docker Desktop установлен и запущен
- Docker Compose установлен

## Быстрый запуск

1. **Клонируйте репозиторий** (если еще не сделали):

   ```bash
   git clone <your-repo-url>
   cd Digi-Coders-main
   ```

2. **Запустите все сервисы**:

   ```bash
   docker-compose up -d
   ```

3. **Откройте приложение**:
   - Фронтенд: http://localhost:3000
   - Бэкенд API: http://localhost:5000
   - MongoDB: localhost:27017

## Структура сервисов

- **mongodb**: База данных MongoDB
- **backend**: Node.js API сервер
- **frontend**: React приложение

## Полезные команды

### Просмотр логов

```bash
# Все сервисы
docker-compose logs

# Конкретный сервис
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mongodb
```

### Остановка сервисов

```bash
docker-compose down
```

### Пересборка и запуск

```bash
docker-compose up --build -d
```

### Остановка и удаление всех данных

```bash
docker-compose down -v
```

## Переменные окружения

### Backend (.env файл)

```
DB_URL=mongodb://admin:password123@mongodb:27017/digi-coders?authSource=admin
PORT=5000
NODE_ENV=production
```

### Frontend

```
REACT_APP_API_URL=http://localhost:5000
```

## Устранение неполадок

1. **Порт уже занят**: Измените порты в `docker-compose.yml`
2. **Проблемы с подключением к БД**: Убедитесь, что MongoDB запущен
3. **Ошибки сборки**: Проверьте логи с помощью `docker-compose logs`

## Разработка

Для разработки с hot-reload:

```bash
# Запуск в режиме разработки
docker-compose -f docker-compose.dev.yml up -d
```

## Продакшн

Для продакшн окружения:

```bash
# Сборка оптимизированных образов
docker-compose -f docker-compose.prod.yml up -d
```
