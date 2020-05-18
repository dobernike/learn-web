# yandex subbotnik 2018 nov

## Бэкенд слишком важен, чтобы доверять его бэкендерам

[https://youtu.be/XmolVlufZXg]

### BFF (Backend For Frontend)

Проксирующее api на node.js

С клиента идем на фасад node.js, которая обращается к разным бэкендам

на ноде делаем нормализацию плохого ответа бэка

```js
function getItems (response) {
  if (isNull(response)) return []
  if (isObject(response)) return [response]
  return response
}

query: {
  feed_shoffer_id: 'feedShofferId',
  'pi-from': 'piFrom',
  'show-urls': ({showUrls = 'offercard'}) => showUrls,
}
```

#### Плюсы

- Фильтрация
- Агрегация
- Кеширование
- Инкапсуляция
- Микросервисы

#### Минусы

- Сложность
- Дублирование
- Маршрутизация

#### Нужно

- Никакой логики
- Только проксирование (исправление плохого ответа бэка)

### или GraphQL

### Пишем документацию до разработки (думаем над api)

swagger

faker.js (чтобы не ждать back) можно соеденить с swagger и он автоматом будет кидать или JSON Schema

## Мутационное тестирование

[https://youtu.be/yAk69bdhA5w]

### Принцип работы:

- Берем рабочий код
- Модифицируем его
- Прогоняем тесты на каждом "мутанте"
- Если тесты упали, значит мутант убит
- Если тесты зеленые, мутант выжил

MSI - Mutation Score Indicator

### Решение для js - Stryker

Это фреймворк для `мутационного тестирования`
Это не test runner как Karma
Это не test framework как Mocha

Имеет плагинную архитектуру
(stryker-jest-runner, reporter ...)

### Stryker lifecycle

чтение конфига -> загрузка плагинов -> запуск тестов -> генерация мутантов -> запуск тестов на мутантах -> вывод отчета

(stryker run)

### Опыт интеграции, проблемы

- Нельзя просто npm i && stryker run
- CoverageAnalysis иногда не работает
- Worker-ы иногда зависают

### Положительные стороны

- Поддержка Jest, Karma, Mocha, Jasmine
- Многопоточность
- Гибкость

### Выводы

- Мутационное тестирование - хорошее дополнение к инфраструктуре разработки большого проекта
- Stryker подходящий инструмент, хотя немного сыроват
- Хорошо использовать на старте проекта

## Бэкенд для фронтендеров, Андрей Мелихов

[https://youtu.be/63Rx2hyYIZw]

Фронт пишет умный proxy на node.js

- Быстрая
- 1 язык (контекст)
- SSR

### node.js

- Компактное ядро
- Небольшые модули
- Простота

node.js = v8 + LibUV

исходный код -> парсер -> интерпретатор (ignition) -> компилятор (Turbofan) -> машинный код

### LibUV приносит:

- Кроссплатформенные операции I/O,
- таймеры
- работа с файлами и сетью

### Где стоит применять Node.js

- Рендер HTML
- API
- Прокси

а бэк только для тяжелых вычислений

## Как мы строим платформу на Nest

[https://www.youtube.com/watch?v=Ys6XR24o4kU]

v8 - single thread (JS)
LibUV - multiple threads (C)

### Цели

- Изоляция инфраструктурной логики
- Снижение когнитивной нагрузки на разработчика
- Уменьшение боллерплейта, лёгкий старт

### Варианты

- Express + TS + Inversify
- Loopback 4
- Nest

### Nest это платформа

(похож на ангуляр)

- Построен поверх Express/Fastify, совместимость в middleware
- Предоставляет DI-контейнер
- Декларирует модульность логики
- Легко тестируется
- Написан на TypeScript

### код без DI

```ts
export class AuthenticationService {
  public userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  ...
}
...
const authenticationService = new AuthenticationService();
```

Минусы:

- Сложно тестировать - нужно помнить о всех скрытых внутренних зависимостях
- Сложно поддерживать - изменения необходимо вносить во все вызовы конструктора
- Сложно переиспользовать экземпляры классов - инстанцированные сущности живут внутри модулей

Простейший DI:

```ts
export class AuthenticationService {
  constructor(public userService: UserService) { }
  ...
}
...
const userService = new UserService();
const authenticationService = new AuthenticationService(userService);
```

DI на декораторах да с контейнером

```ts
@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}
}
```

```ts
@Injectable({scope:*})
```

- SINGLETON - по умолчанию, одна копия на приложение
- REQUEST - новый инстанс на каждый реквест
- TRANSIENT - инстанцируются при каждой инжекции

Используйте SINGLETON максимально!

Singleton - не всегда зло

Жизненный цикл Nest
-> Middlewares -> Guards -> Interceptors -> Pipes -> Controller -> Interceptors (<- Exception Filters) ->

### Module

это базовая сущность и синглтон (но не всегда)

Корневой модуль приложения

```ts
@Module({
  providers: [
    /*...*/
  ],
  controllers: [
    /*...*/
  ],
  imports: [
    /*...*/
  ],
  exports: [
    /*...*/
  ],
})
export class AppModule implements NestModule {}
```

Application -> Scanner -> Compiler -> Экземпляры классов

### Pipes

- Transformation - изменяют данные
- Validation - валидируют данные

### Middleware

- Functional (Express) middleware - всё как обычно
- Nest middleware - тяжёлые, но работает DI

### Что нужно было дописать

- Логгер
- Профилирование
- SSR и работа с микросервисом обвязки
- Обертки для существующего кода
- Авторизация

#### Логгер. Задачи

- Нужен асинхронный контекст
- Нельзя использовать Req (и тем более, передавать его явно)

##### cls-hooked (не для бизнесовых данных)

- Используют под капотом async_hooks
- Предоставляют key-value storage в контексте реквеста

#### Рендер

- Дать возможность рендерить React на сервере
- Подключить LayoutService \*

#### Авторизация

- Декларативное получение модели юзера
- Декларативное управление уровнем доступа (гарды)

#### Бутстраппинг и обновления

##### Yeoman

### Итого

- Область отвественности разработчика `ограничена` бизнес-логикой
- Чёткие сущности - снижение когнитивной нагрузки на разработчика
- Лёгкий механизм обновления инфраструктурной логики
- Единый ООП-язык, дружба с Java-бэкендерами
