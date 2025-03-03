# Weather App

[![CI](https://github.com/$USERNAME/$REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/$USERNAME/$REPO/actions/workflows/ci.yml)
[![Deploy](https://github.com/$USERNAME/$REPO/actions/workflows/deploy.yml/badge.svg)](https://github.com/$USERNAME/$REPO/actions/workflows/deploy.yml)

Приложение для просмотра погоды с использованием геолокации.

## Технологии

- Astro
- Svelte 5
- TypeScript
- TailwindCSS
- Bun

## Разработка

```bash
# Установка зависимостей
bun install

# Запуск в режиме разработки
bun run dev

# Сборка
bun run build
```

## Переменные окружения

Создайте файл `.env` и добавьте:

```env
PUBLIC_API_URL=your_weather_api_url
PUBLIC_API_ADDRES_URL=your_address_api_url
```
