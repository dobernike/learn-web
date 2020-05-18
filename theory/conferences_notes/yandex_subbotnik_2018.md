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

## mutation ...