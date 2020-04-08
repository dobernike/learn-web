# I <3 frontend 2020

Created: Feb 29, 2020 11:51 AM
Created By: Paul Nolastname
Last Edited Time: Mar 01, 2020 11:31 AM

Программа 

[Я ❤ Фронтенд 2020](https://yandex.ru/promo/yandex4developers/yalovefrontend2020/)

[https://www.youtube.com/watch?v=eLlULhNNthI](https://www.youtube.com/watch?v=eLlULhNNthI)

[https://www.youtube.com/watch?v=eLlULhNNthI](https://www.youtube.com/watch?v=eLlULhNNthI)

---

06:30 Глазные интерфейсы (Иван Бакаидов LINKa)

подводные камни в создании «глазных интерфейсов». Стоит посмотреть, для общего развития.

---

23:20 Роутер как у сына маминой подруги (Павел Малышев Mustlab)

Виды роутеров и почему state-routing более гибок чем другие

Routings:

page.js

component-routes (react-router)

file-based (many html for routes)

Состояние

DB - сервер

LocalStorage - клиент

UI state - клиент

cockie - клиент-сервер

URL

Части

/path?query#fragment

State-based (глобавльный стейт) навигация это side-effect

state → history.push

готовые решения

redux-router

mobx-router

effector-router

@storeon/router

---

ПЕРЕРЫВ

---

1:33:00 HTML: The Good Parts (<3 Вадим Макеев <3 HTML Academy)

Объясняет, как обычно, про верстку и не любовь к div`ам. Как и все его доклады, обязательны к просмотру всем!

Не стоит просто делать <div id="app"/>

Нужно делать нормальную разметку для поисковиков и быстродействия. 

(27к твитов на html глузится быстрее на 200ms чем 1 твит на react)

Согласие между w3c и whatwg теперь официальное!

HTML Living Standard теперь стандарт! (multipage version use)

HTML 5.2 последняя и HTML 5.3 теперь не будет никогда!

вкладывание quizes:

p > ul         NO!

ul > p         NO!

a > video   YES if no <video controls>

a > h1        MB

section > a > h1    YES!

p > a > h1    NO!

<!DOCTYPE html> must have!

<html lang="ru"> must have!

<p lang="en">english</p> must have!

css :lang

title не рендерит теги, например <i> экранировать не нужно

Почитать preload и resource hints

preload

dns-prefetch

preconnect

prefetch

prerender

<main>

<p>уникальный</p>

</main>

<aside>

<p>фильтры, дополнительное</p>

</aside>

header (навигация, логотип и т.д.)+ footer(соцсети, контакты и т.д.) always!

section - секция содержимого (с заголовком h2 например)

article - единица информации (внутри section с заголовком h3 например)

h1-h6 по вложености

тег h1 должен быть 1 на странице!

Подзаголовки лучше делать так:

<h1>Заголовок</h1>

<p>Подзаголовок</p>

Подпись картинок или всего другого:

<figure>

<figcaption/>

</figure>

input type

tel

url

email

number

multiply (value="24, 242')

лучше input type="text" inputmode="..." pattern=".*">

tel

url

email

numeric

decimal

search

ol 

reverted

start="5"

<menu> альтернатива <ul> для команд (контекстное например)

table

caption

colgroup

col

dl, dt, dd - можно разделять div`ами

details, summary

<details open>

<summary> some </summary>

</details>

script

<script defer src></script> type="text/javascript не нужен больше!

defer

async

type="nomodule"

inregrity="sha384-..."

template

qs('row').content

slot

name="item"

SVG, MathML, ARID, Веб-компоненты

Инструменты (можно сделать проворку валидности html через JAVA)

Markup Validation Service

Docker

Node-w3c-validator

Github Actions

HTMLMinifier

---

2:27:00 Картинки как коробки. Что же там внутри? (Полина Гуртовая Evil Martians)

Оптимизация картинок

 <picture>

<source src="*.webp" type="image/webp" />

<img src="*.png" alt="img />

</picture>

Не всегда хороший вариант. webp 8кб, а png 6кб

resize тоже не всегда хорошо

vips resize ...

orig 10kb (big) → resize to small (25kb)

Нужно понимать, что внутри картинок.

png:

const reader = new FileReader()

Читаем png

Потом режим чанки

Далее расказывается о внутриностях png и как можно оптимизировать их (выкидывать alfa если не нужно, interlaced off)

jpeg сжатие с потерями даже при 100% quality

jpeg 2000 лучше местами чем webp, но работает только в safary :C

video codecs 2000 → 2020

before ... mpeg

H.264 платный

VP8 бесплатный (кейфрейм → WebP)

H.265 (кейфрейм → HEIF only apple)

AV1 (кейфрейм → AVIF наше будущее)

AV1 (поддерживается в FF и Chrome)

PNG иногда win WebP и SVG

PNG vs WebP (lossless)  win

JPEG иногда лучше чем WebP, но не всегда + WebP без дефектов

AV1 на 30% сжимает лучше чем WebP и не качество намного лучше :WoW

Инструменты оптимизации:

Дизайнер

на лету [imgproxy.net](http://imgproxy.net) (open source от evil martians)

Ручные

vips

djpeg

ffmpeg

cjpeg

convert

cwebp

optipng

squoosh.app

Слайды: github.com/HellSquirrel/image-internals-talk

---

 ПЕРЕРЫВ

---

4:05:00 Как сделать редактор майндмэпов (Тим Чаптыков Вконтакте)

TABULA (Название приложения редактора майндмепов)

www.tabula.online

Рассказывает про сочетания клавиш, которые нужно юзать в редакторе на keydown и keyup (плохо работает с command)

javascript madness: keyboard events (справочник событий клавиш)

browser keyboard shortcuts (сравнительная таблица сочетаний клавиш в разных браузерах)

Mousetrap (Библиотека для обработки сочетания клавиш)

keyboard + mouse

Битовая маска, которая хранится в стейте

Ввод текста вне поля инпута

Проверяет на длину символа (1)

Буфер обмена

 Clipboard API (старый)

The definitive guide to copying and pasting in JavaScript (Как реализовать буфер обмена в JavaScript. Статья 2014 года)

Clipboard API (Новый) асинхронный, но требует подтверждения

Undo-Redo

State snapshots (без совместного редактирования)

Value snapshots (без совместного редактирования)

Redux undo/redo (HOC reducer to undo-redo)

Actions Log

Event sourcing

Time traveling  (без совместного редактирования)

Exclude action

Write-only actions log (Выбран в TABULA)

Доклады для просмотра

Клиенту и серверу нужно поговорить (Никита Прокопов)

Редактор текста на CRDT в продакшене (Антон Чапоргин)

CRDT and other ideas for client server communication (Андрей Ситник)

Formatted Text

DraftJS (Фреймворк для создания текстовых редактора на React)

json0-ot-diff (совместное редактирование)

Building a real-time collaborative text editor for the web (Статья о создании текстового редактора с поддержкой совместного редактирования на DraftJS и ShareDB)

Стек

Бэкенд

PostgreSQL

Node

Sequelize

Фронтенд

React

Logux

Draft

Инфраструктура

Heroku

Github

DNSimple

Amazon S3

---

4:41:00 ApolloClient 3 — прощаемся с Redux, REST API и Relay (Павел Черторогов ps.kz)

Redux - это тупой EventEmitter (c) Andrew Clark со-автор редакса

dispatch(action) {

state = reducer(state, action);

subscribers.forEach(s ⇒ s());

}

Вместо redux можно юзать:

Mobx

Overmind

Apollo

Проблемы Redux

Boilerplate

Грамотное построение Стора

маппинг серверных данных в Стор

Как делать иначе?

Не строить Стор руками

Не писать никакого маппера данных с сервера в Стор

Иметь автогенерируемые дефинишены для статического анализа ответов с сервера

Решение - ApolloClient (или relay) и GraphQL

Линтинг, автодополнение при вводе, статическая типизация

Кеширование серверных данных и взаимодействие с серверным Стор

ApolliClient про

сеть и связь с сервером

кэш/стор серверных данных

фреймоврк коннекторы (React и пр.)

статический анализ (graphql-code-generator)

Аполло только для кеша серверных данный, а Редакс для клиентского стейта!

ApolloClient 3 (еще бэта)

EntityCache - нормализованный стор

ApolloClient или Relay с фрагментами, "волосатый" GraphQL (HolyJS Piter 2019)

Задачи

Хранить данные компактно

Вложенные объекты хранить на верхней уровне

GC появился

Ручная чистка кеша

---

ПЕРЕРЫВ

---

5:48:00 BFCache, или Туда и обратно (Виктор Хомяков Яндекс)

Важность скорости загрузки страницы

Меньше ожидание → Конверсия, NPS → Деньги

Меньше трафик - Деньги

Проблема

Шанс вернуться назад - почти 20%

Тратим время и трафик

Загружаем и парсим HTML

Пересоздаём DOM

Загружаем, парсим и выполняем скрипты

Решение

Сохраняем состояние страницы (JS+DOM)

Если пользователь вернулся - показываем страницу очень быстро

Безопасность

Geolocation

Device Motion

доступ к камере

доступ к микрофону

и т.п.

API и поддержка браузеров

bfcache

Firefox

Safari

IE11

UCBrowser 11-12/Android

В разработке в Chromium

Прямой доступ к bfcache - нет

Типы навигации (perfomance.getEntriesByType("navigation")[0])

"navigate"

"reload"

"back_forward"

"prerender"

pageshow pagehide event.persisted

Особенности

DevTools могут отключать bfcache

в pagehide не работает alert() (console.log тоже); Firefox и Safari молча игнорируют, а Chrome пишет в консоль ошибку "Blocked alert('...') during pagehide."

обработчики из внешнего скрипта могут не вызываться в Safari

pagehide persisted: true не даёт гарантии, что страница когда-либо будет снова показана из кеша

Особенности реализации

Firefox

Когда страница не кэшируется

незавершенный XHR (кроме favicon)

Пользователь остановил долго выполняющийся скрипт

Незавершенные транзакции IndexedDB (баг)

Разрешён mixed content (HTTPS+HTTP)

Размер bfcache можно ставить в браузере

Safari

Когда страница не кэшируется

незавершенный XHR (кроме favicon)

Обработчики pageshow pagehide

обработчики (выше) работают только в inline script

обработчик из внешнего скрипта <script src=...></script> не вызывается при срабатывании bfcache

Обработчики beforeunload unload

Не мешают bfcache

beforeunload вызываются перед pagehide

unload не вызывается при попадании в bfcache

Страницы открыта через window.open

window.opener не мешает bfcache

Chromium (пока под флагом)

Когда страница не кэшируется

Есть страницы с того же origin с синхронным доступом window.open() или window.opener

Не наступил DOMContentLoaded

Много новых Web* API

Service Worker (WIP, планируется прятать страницу в bfcache от Service Worker)

Разрешена геолокация (WIP)

Если протухли cookie - страница удаляется из bfcache

IE11

Когда страница не кэшируется

HTTP/HTTPS???

Есть обработчики beforeunload

Не завершились события load и pageshow

ActiveX

Открыты DevTools

Проблема с event.persisted

срабатывает bfcache, несмотря на event.persisted == false

Ссылка на слайды - https://bit.ly/38UhB4z

---

6:28:30 Итак, вы ментор. Что дальше? (Мария Нагорных АБК)

Где быть внешним ментором

HTMK Academy

Яндекс.Практикум

LoftSchool

Skillfactory

Джун-ментор

когда: в момент перехода с джуна на мидла

сколько: одноразовая акция

Мидл-ментор

когда: в момент перехода с мидла на сеньора

сколько: в зависимости от ваших карьерных желаний

Сеньор-ментор

когда: как часть карьерного роста

сколько: одноразовая акция

когда: желание делиться опытом

сколько: постоянно

Инструменты

вики (база знаний), best practices

код-ревью

разговор (за чаем, кофе и прочее)

конференции, митапы, beer/wine js, мастер-классы (воркшопы)

парное программирование (vs code live share, floobits)

Ментор

отличное владение проффессиональными навыками (hard skills)

системное представление о предметной области

Личностные качества 

ответсвенность

целеустремлённость

отзывчивость

терпеливость

тактичность

владение приёмами коммуникации

самоорганизованность

способность увлечь

влиятельность

Умения

слушать

доходчиво объяснять

использовать обратную связь

устанавливать доверительные отношения

задавать вопросы

организовывать деятельность

контролировать

мотивировать

анализировать

Процесс

перейти от родительской иерархии: учитель-ученик на партнёрский уровень иерархии: коллеги

степени:

Гуру и его последователь

Мастер и подмастерье

Творческий тандем

Отрицательные моменты

Навязывание своего мнения обучаемому

Недооценка уровня дискомфортности условий обучения

Перегрузка подопечного рекомендациями и замечаниями

Опасно заблуждаться, думая, что если с одним обучаемым был эффективен один прием, то он будет эффективен и с другим

В лучшем случае, наставник не дает обратной связи обучаемому, в худшем - критикует его

Выводы

Наставничество - это определенный этап развития вас как члена общества

Наставничество - это опенсорс знаний 

Деньги дисциплинируют