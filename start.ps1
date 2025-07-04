Write-Host "🚀 Запуск Digi-Coders с Docker" -ForegroundColor Green

# Проверяем, установлен ли Docker
try {
    docker --version | Out-Null
} catch {
    Write-Host "❌ Docker не установлен. Пожалуйста, установите Docker Desktop." -ForegroundColor Red
    exit 1
}

# Проверяем, запущен ли Docker
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker не запущен. Пожалуйста, запустите Docker Desktop." -ForegroundColor Red
    exit 1
}

# Проверяем аргументы
if ($args[0] -eq "dev") {
    Write-Host "🔧 Запуск в режиме разработки..." -ForegroundColor Yellow
    docker-compose -f docker-compose.dev.yml up -d
} elseif ($args[0] -eq "prod") {
    Write-Host "🏭 Запуск в продакшн режиме..." -ForegroundColor Yellow
    docker-compose -f docker-compose.prod.yml up -d
} else {
    Write-Host "⚡ Запуск в стандартном режиме..." -ForegroundColor Yellow
    docker-compose up -d
}

Write-Host "✅ Приложение запущено!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Доступные сервисы:" -ForegroundColor Cyan
Write-Host "   - Фронтенд: http://localhost:3000" -ForegroundColor White
Write-Host "   - Бэкенд API: http://localhost:5000" -ForegroundColor White
Write-Host "   - MongoDB: localhost:27017" -ForegroundColor White
Write-Host ""
Write-Host "📋 Полезные команды:" -ForegroundColor Cyan
Write-Host "   - Просмотр логов: docker-compose logs" -ForegroundColor White
Write-Host "   - Остановка: docker-compose down" -ForegroundColor White
Write-Host "   - Пересборка: docker-compose up --build -d" -ForegroundColor White 