#!/bin/bash

echo "🚀 Запуск Digi-Coders с Docker"

# Проверяем, установлен ли Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Пожалуйста, установите Docker Desktop."
    exit 1
fi

# Проверяем, запущен ли Docker
if ! docker info &> /dev/null; then
    echo "❌ Docker не запущен. Пожалуйста, запустите Docker Desktop."
    exit 1
fi

# Проверяем аргументы
if [ "$1" = "dev" ]; then
    echo "🔧 Запуск в режиме разработки..."
    docker-compose -f docker-compose.dev.yml up -d
elif [ "$1" = "prod" ]; then
    echo "🏭 Запуск в продакшн режиме..."
    docker-compose -f docker-compose.prod.yml up -d
else
    echo "⚡ Запуск в стандартном режиме..."
    docker-compose up -d
fi

echo "✅ Приложение запущено!"
echo ""
echo "📱 Доступные сервисы:"
echo "   - Фронтенд: http://localhost:3000"
echo "   - Бэкенд API: http://localhost:5000"
echo "   - MongoDB: localhost:27017"
echo ""
echo "📋 Полезные команды:"
echo "   - Просмотр логов: docker-compose logs"
echo "   - Остановка: docker-compose down"
echo "   - Пересборка: docker-compose up --build -d" 