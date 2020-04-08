# CSS Advance

# CSS preprocesors

## Post & Pre Processing CSS

[https://habr.com/ru/post/434098/](https://habr.com/ru/post/434098/)

### Препроцессоры

Какие же есть препроцессоры?

Существует несколько представителей, например: Sass(.sass, .scss), Less(.less) и Stylys(.stylus).
Также среди препроцессоров можно отдельно выделить PostCSS(а точнее его парсер SugarSS и плагин PreCSS). Забегая далеко вперед, скажу что да, PostCSS — не только постпроцессор.

#### Возможности

Переменные

```css
//style.scss

$color: #fff;
span {
  color: $color;
  background: $color;
}

//style.css

span {
  color: #fff;
  background: #fff;
}
```

Вложенность

```css
//style.scss
.chat-area {
  width: 40%;
  &__button {
    // & - указатель на текущий селектор(в данном случае & = .chat-area)
    display: inline-block;
    height: 36px;
    width: 10px;
  }

  a {
    color: red;
  }
}

//style.css
.chat-area {
  width: 40%;
}
.chat-area__button {
  display: inline-block;
  height: 36px;
  width: 10px;
}
.chat-area a {
  color: red;
}
```

Миксины

```css
//style.scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
  -ms-border-radius: $radius;
  border-radius: $radius;
}
.box {
  @include border-radius(10px);
}

//style.css
.box {
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  border-radius: 10px;
}
```

Дополнительные функции

```css
//style.scss
$color: #202020;
h1,
h2 {
  color: lighten($color, 40%);
}

//style.css
h1,
h2 {
  color: #868686;
}
```

### Постпроцессоры

В контексте Css постпроцессор по сути тоже самое, что и препроцессор, но на вход постпроцессору дается не код написанный на языке препроцессора, а тоже css. То есть постпроцессор — это программа на вход которой дается css, а на выходе получается css. Пока не сильно понятно зачем это надо.

Объясню на конкретном примере работы PostCSS — единственного представителя постпроцессоров в контексте css.

PostCSS из коробки на самом деле не делает с CSS ничего. Он просто возвращает файл, который был дан ему на вход. Изменения начинаются, когда к PostCSS подключаются плагины.

Весь цикл работы PostCSS можно описать так:

Исходный файл дается на вход PostCSS и парсится
Плагин 1 что-то делает
...
Плагин n что-то делает
Полученный результат преобразовывается в строку и записывается в выходной файл

Рассмотрим же основные плагины, которые есть в экосистеме PostCSS

#### Плагины

Autoprefixer

Этот плагин настолько популярен, что многие считают, что они используют этот плагин, но не используют PostCSS. Они не правы.

```css
//in.css
div {
  display: flex;
}

//out.css
div {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
}
```

Autoprefixer добавляет браузерные префиксы к вашим правилам. Ничем не заменимый и один из самых важных плагинов, с которого и началась история PostCSS. Можно даже сказать, что имеет смысл поставить PostCss только ради этого плагина.

Preset Env

```css
//in.css
@custom-media --med (width <= 50rem);

@media (--med) {
  a:hover {
    color: color-mod(black alpha(54%));
  }
}

//out.css
@media (max-width: 50rem) {
  a:hover {
    color: rgba(0, 0, 0, 0.54);
  }
}
```

PostCSS Preset Env добавляет возможности, которые только обсуждаются в черновиках разработчиков css. В данном примере была реализована директива @custom-media, а так же функция color-mod. Начни использовать css будущего уже сегодня!

CSS Modules

Все эти BEM не для вас, но проблема с конфликтами имен классов все еще стоит? Тогда PostCSS предлагает другое решение.

```css
//in.css
.name {
  color: gray;
}

//out.css
.Logo__name__SVK0g {
  color: gray;
}
```

import './style.css'; // раньше
import styles from './style.css'; // сейчас

Short

```css
//in.css
.icon {
  size: 48px;
}

.canvas {
  color: #abccfc #212231;
}

//out.css
.icon {
  width: 48px;
  height: 48px;
}

.canvas {
  color: #abccfc;
  background-color: #212231;
}
```

PostCSS Short добавляет кучу сокращенных записей для различных правил. Код становится короче, а следовательно в нем меньше места для ошибок. Плюс повышается читаемость.

Auto Reset

```css
//in.css
div {
  margin: 10px;
}

a {
  color: blue;
}

//out.css
div,
a {
  all: initial;
}

div {
  margin: 10px;
}

a {
  color: blue;
}
```

PostCSS Auto Reset позволяет нам не создавать отдельный файл со сбросом всех стилей. Плагин создает для всех селекторов один большой селектор, куда помещает правила, сбрасывающее все стили. По умолчанию создается лишь правило all со значением initial. Это полезно в комбинации с плагином postcss-initial, который в свою очередь превращает это правило в портянку правил на 4 экрана. Впрочем все можно настроить и сделать сброс например таким:

```css
//out.css
div,
a {
  margin: 0;
  padding: 0;
}
div {
  margin: 10px;
}
a {
  color: blue;
}
```

SugarSS

```css
//in.sss
.parent
  color: white

.parent > .child
  color: black

//out.css
.parent {
  color: white;
}

.parent > .child {
  color: black;
}
```

SugarSS — парсер(не плагин!), который базируется на отступах, а не на фигурных скобках, как стандартный. Имеет отдельное расширение ".sss". Код написанный с помощью SugarSS по стилю схож со старым синтаксисом Sass, но без его примочек вроде переменных, миксинов, наследования и тд.

PreCSS

```css
//in.sss
$color: black

.parent
 .child
   color: $color

//Результат работы SugarSS
$color: black;

.parent {
 .child {
   color: $color
 }
}

//out.css
.parent .child {
   color: black
}
```

PreCSS как раз и добавляет те самые возможности препроцессоров о которых написано в первой половине статьи.

Stylelint

О Stylelint уже написано довольно много. Он попал в этот обзор, так как использует PostCSS, как парсер строк CSS файлов. Предположим у нас есть такой файл.

### Выводы

Препроцессоры добавляют очень много новой функциональности, которой нет в CSS. Однажды попробовав, вы с трудом вернетесь к обычному CSS.

PostCSS гораздо ближе к изначальному CSS, чем препроцессоры, но тем не менее при определенных подключенных плагинах может обладать той же функциональностью(и даже похожим синтаксисом). Новички верстальщики могут верстать даже не задумываясь, что верстают не на чистом CSS. Некоторые плагины(например Autoprefixer) не имеют аналогов в препроцессорном мире.

Никто не мешает использовать препроцессоры и PostCSS в связке. Вариант довольно неплох для проектов, которые уже используют препроцессоры и имеет место на жизнь.

Для новых же проектов я бы посоветовал использовать только PostCSS. Верстальщики привыкли к синтаксису препроцессора? Поставьте плагин PreCSS и парсер SugarSS. Нужна кроссбраузерность? Поставьте плагин Autoprefixer. Больше не нужна кроссбраузерность(например ваш проект обернули в электрон и он стал десктопным)? Просто удалите Autoprefixer! С PostCSS вы сможете, как с помощью конструктора, собрать именно то, что нужно вашему проекту.

---

# CSS Responsive design

## Основы отзывчивого веб-дизайна

[https://developers.google.com/web/fundamentals/design-and-ux/responsive/?hl=ru](https://developers.google.com/web/fundamentals/design-and-ux/responsive/?hl=ru)

Чтобы контролировать масштабирование окна просмотра в браузере, используйте метатег viewport.
Добавьте width=device-width, чтобы адаптировать ширину окна просмотра к экрану устройства.
Вставьте initial-scale=1, чтобы обеспечить соотношение 1:1 между пикселями CSS и независимыми пикселями устройства.
Чтобы страница была доступна, проверьте, не отключено ли пользовательское масштабирование.

<meta name="viewport" content="width=device-width, initial-scale=1.0">

Настроив initial-scale, вы также можете установить следующие атрибуты для области просмотра:

minimum-scale
maximum-scale
user-scalable
После их настройки устанавливается ограничение на изменение масштаба области просмотра, если из-за этого могут стать недоступны специальные возможности.

Не используйте крупные элементы с фиксированной шириной.
Для корректного отображения контента не ограничивайте его определенной шириной области просмотра.
Используйте медиазапросы CSS, чтобы указать разные стили для больших и маленьких экранов.

Медиазапросы также позволяют выбрать стиль на основе характеристик устройства.
Добавьте min-width вместо min-device-width для корректного отображения сайта на большинстве устройств.
Чтобы не нарушать структуру макета, используйте элементы относительных размеров.

Например, вы можете поместить в медиазапрос print все стили, необходимые для печати:

<link rel="stylesheet" href="print.css" media="print">

Избегайте правила @import!
Избегайте правила @import, которое позволяет копировать стили из других CSS-файлов. Оно увеличивает число соединений с сервером, поскольку файл, на который вы ссылаетесь, тоже нужно скачать и проанализировать.

```css
@media print {
/_ print style sheets go here _/
}

@import url(print.css) print;
```

```css
@media (query) {
  /* CSS Rules used when query matches */
}
```

Атрибут Результат
min-width Правило применяется к браузеру, ширина которого больше значения, указанного в запросе.
max-width Правило применяется к браузеру, ширина которого меньше значения, указанного в запросе.
min-height Правило применяется к браузеру, высота которого больше значения, указанного в запросе.
max-height Правило применяется к браузеру, высота которого меньше значения, указанного в запросе.
orientation=portrait Правило применяется к браузеру, высота которого не меньше его ширины.
orientation=landscape Правило применяется к браузеру, ширина которого больше высоты.

```html
<link rel="stylesheet" media="(max-width: 640px)" href="max-640px.css" />
<link rel="stylesheet" media="(min-width: 640px)" href="min-640px.css" />
<link rel="stylesheet" media="(orientation: portrait)" href="portrait.css" />
<link rel="stylesheet" media="(orientation: landscape)" href="landscape.css" />
<style>
  @media (min-width: 500px) and (max-width: 600px) {
    h1 {
      color: fuchsia;
    }

    .desc:after {
      content: " In fact, it's between 500px and 600px wide.";
    }
  }
</style>
```

При ширине браузера от 0 пикс. до 640 пикс. применяется max-640px.css.
При ширине браузера от 500 пикс. до 600 пикс. применяются стили из @media.
При ширине браузера от 640 пикс. и выше применяется min-640px.css.
Если в браузере ширина больше высоты, применяется landscape.css.
Если в браузере высота больше ширины, применяется portrait.css.

Not recommended — fixed width

```css
div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}
```

Recommended — responsive width

```css
div.fullWidth {
  width: 100%;
}
```

Создавайте контрольные точки на основе контента, а не для отдельных устройств, продуктов или брендов.
Сначала разработайте дизайн для самого маленького мобильного устройства, а затем переходите к версиям для больших экранов.
Ограничьте длину строк 70-80 символами.

```html
<link rel="stylesheet" href="weather.css" />
<link rel="stylesheet" media="(max-width:600px)" href="weather-2-small.css" />
<link rel="stylesheet" media="(min-width:601px)" href="weather-2-large.css" />
```

Выбор второстепенных контрольных точек (если необходимо)

```css
@media (min-width: 360px) {
  body {
    font-size: 1em;
  }
}

@media (min-width: 500px) {
  .seven-day-fc .temp-low,
  .seven-day-fc .temp-high {
    display: inline-block;
    width: 45%;
  }

  .seven-day-fc .seven-day-temp {
    margin-left: 5%;
  }

  .seven-day-fc .icon {
    width: 64px;
    height: 64px;
  }
}
```

```css
@media (min-width: 700px) {
  .weather-forecast {
    width: 700px;
  }
}
```

Оптимизация текста для чтения

```css
@media (min-width: 575px) {
  article {
    width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
}
```

Никогда не скрывайте контент полностью

---

## Introduction To Responsive Web Design -

[https://www.youtube.com/watch?v=srvUrASNj0s](https://www.youtube.com/watch?v=srvUrASNj0s)

⭐️ Course content ⭐️
⌨️ (00:00:00) Intro
⌨️ (00:02:59) 1. Starting to think responsively
⌨️ (00:06:01) 2. CSS Units

- absolute
  pixels (px)
  pt, cm, mm, in, etc

- relative

  to font-size
  (em and rem)

  to the viewport
  (vw, vh, vmin, vmax)

- percentage
  relative to their parent

⌨️ (00:09:16) 3. CSS Units - Percentage

<div style="width: 200px">
// 50% of their parent = 100px
    <div style="width: 50%">
        // 50% of their parent = 50px
        <div style="width: 50%"></div>
    </div>
</div>

<div>
// 50% of their parent
    <div style="width: 50%"></div>
</div>

⌨️ (00:15:14) 4. Controlling the width of images

```css
img {
  width: 100%;
}
```

⌨️ (00:20:05) 5. min-width and max-width

```css
.container {
  max-width: 620px;
  width: 90%;
  margin: 0 auto;
}
```

⌨️ (00:22:54) 6. CSS Units - The em unit

em are relative to their parent`s font-size

<section>
    <ul>
        <li>asf</li>
        <li>dsg</li>
        <li>hgfh</li>
        <li>lkjl</li>
    </ul>
</section>

```css
body {
  font-size: 25px;
}

section {
  font-size: 20px;
}

ul {
  /* 1.5em = 150% */
  font-size: 1.5em; // 20px * 150%;
}
```

⌨️ (00:28:25) 7. The problem with ems

when we use them for the font-size - a cascading effect

⌨️ (00:30:58) 8. The Solution: Rems

rem - Root Em
The root of an HTML page is always the html element

<section>
    <ul>
        <li>asf</li>
        <li>dsg</li>
        <li>hgfh</li>
        <li>lkjl</li>
    </ul>
</section>

```css
html {
  font-size: 16px; // default
}

body {
  font-size: 1rem;
}

section {
  font-size: 2rem;
}

ul {
  font-size: 1.5rem; // 16 * 150%;
}
```

⌨️ (00:35:46) 9. Picking which unit to use

pixels used to cause a lot of promblems, as they were a fixed unit

Now, it follows the reference pixel

So I`m going to stick with those.

My general rule of thumb:

- Font-size = rem
- Padding and margin = em
- Widths = em or percentage

⌨️ (00:39:18) 10. ems and rems - an example

```html
<h1>Some</h1>

<a class="button btn-big" ... />
<a class="button btn-small" ... />
```

```css
h1 {
  font-size: 3rem;
  margin-bottom: 2em;
}

.button {
  /* ... */
  padding: 0.5em 1.25em;
}

.btn-big {
  font-size: 1.5rem;
}

.btn-small {
  font-size: 0.75rem;
}
```

⌨️ (00:47:10) 11. Flexbox refresher and setting up some HTML

Elements normally have a `display: block` or a `display: inline` as a default from the browser.

- Block elements
  div, header,footer, main, etc.
  h1 -> h6
  p

- Inline elements
  a
  strong
  em
  span

we can change display to flex `display: flex`

```html
<div class="container">
  <h1>Fancy <span>span</span> header</h1>
  <img src="" alt="" />

  <div class="columns">
    <div class="col col-1">
      <h2>some h2</h2>
      <p>some p</p>
    </div>
    <div class="col col-2">
      <h2>some h2</h2>
      <p>some p</p>
      <p>some p</p>
    </div>
    <div class="col col-1 col-bg">
      <p>some p</p>
    </div>
  </div>

  <div class="columns">
    <div class="col col-3">
      <h2>some h2</h2>
      <p>some p</p>
    </div>
    <div class="col col-1 col-bg">
      <p>some p</p>
    </div>
  </div>
</div>
```

⌨️ (00:55:02) 12. Basic Styles and setting up the columns

```css
body {
  font-size: 1.125rem;
  color: #707070;
  margin: 0;
}

/* Typography */

h1 {
  font-size: 3rem;
  color: #212614;
  text-align: center;
}

h1 span {
  color: #b7832f;
}

h2 {
  font-size: 1.5rem;
}

/* Layout */

img {
  max-width: 100%;
}

p {
  margin-top: 0;
}

.container {
  width: 95%;
  max-width: 980px;
  margin: 0 auto;
}

.columns {
  display: flex;
  margin: 1em 0;
}
```

⌨️ (01:02:09) 13. Adding the background color

```css
.col-bg {
  background: #212624;
  color: #fff;
  padding: 1em;
}
```

⌨️ (01:06:21) 14. Setting the column widths

```css
.col-1 {
  width: 25%;
}

.col-2 {
  width: 50%;
}

.col-3 {
  width: 75%;
}
```

⌨️ (01:10:00) 15. Spacing out the columns

```css
.columns {
  display: flex;
  justify-content: space-between;
  /* justify-content: space-around; */
  /* justify-content: space-evenly; */
  margin: 1em 0;
}

.col-1 {
  /* width: 25%; */
  width: 20%;
}

.col-2 {
  /* width: 50%; */
  width: 45%;
}

.col-3 {
  /* width: 75%; */
  width: 70%;
}
```

⌨️ (01:14:27) 16. Controlling the vertical position of flex items

align-items

```css
.columns {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* align-items: flex-end;
  align-items: center;
  align-items: baseline; */
  margin: 1em 0;
}

.col-1 {
  width: 20%;
}

.col-2 {
  width: 45%;
}

.col-3 {
  width: 70%;
}
```

⌨️ (01:19:42) 17. Media Query basics

Media queries let us add new styles that target only specific conditions

@media () { ... }

@media media-type and (media-features) { ... }

- Media type
  Screen | @media screen {...}
  Print | @media print {...}
  Speech | @media speech {...}

- Media condition
  Widths | @media (min-width: 600px) { ... }
  Orientation | @media (landscape) { ... }
  Specific features | @media (hover) { ... }

Both media types and conditions are optional
For example, we can target only screens
@media screen { ... }
or
@media (min-width: 600px) { ... }
or combine using `and`
@media screen and (min-width: 960px) { ... }
@media screen and (orientation: portrait) { ... }

```css
body {
  background: pink;
}

// min width of 400 to 649px
@media (min-width: 400px) and (max-width: 649px) {
  body {
    background: purple;
  }
}

// min width of 650 and bigger
@media (min-width: 650px) and (orientation: landscape) {
  body {
    background: orange;
  }
}

/* // min width of 650 and landscape
@media (min-width: 650px) and (orientation: landscape) {
  body {
    background: orange;
  }
} */
```

⌨️ (01:29:50) 18. Making out layout responsive with flex-direction

```css
.columns {
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
}

@media (max-width: 600px) {
  .columns {
    flex-direction: column;
  }
}

.col-1 {
  width: 20%;
}

.col-2 {
  width: 45%;
}

.col-3 {
  width: 70%;
}

@media (max-width: 600px) {
  /* .columns {
    flex-direction: column;
  } */

  .col-1,
  .col-2,
  .col-3 {
    width: 100%;
  }
}
```

⌨️ (01:36:45) 19. flex-direction explained

We are switch main axis

display: flex;
flex-direction: column; // row

justify-content `will now work vertically`

aling-items `will now work horizontally`

⌨️ (01:39:54) 20. Creating a navigation

```html
<header>
  <div class="container container-flex">
    <div class="site-title">
      <h1>Living the social life</h1>
      <p class="subtitle">A blog exploring animation in life</p>
    </div>
    <nav>
      <ul>
        <li><a href="#" class="current-page">Home</a></li>
        <li><a href="#">About me</a></li>
        <li><a href="#">Recent-posts</a></li>
      </ul>
    </nav>
  </div>
</header>
```

⌨️ (01:44:40) 21. Using flexbox to start styling our navigation

```css
header {
  /* text-align: center; */
}

nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

nav li {
  margin-left: 1em;
  /* margin: 0 1em; */
}

nav a {
}

nav a:hover {
}
```

⌨️ (01:52:19) 22. Making out navigation look good

```css
body {
  margin: 0;
  font-family: "Ubuntu", sans-serif;
}

/* Typography */

h1 {
  font-family: "Lora", sans-serif;
  font-weight: 400;
  color: #143774;
  font-size: 2rem;
  margin: 0;
}

.subtitle {
  font-weight: 700;
  color: #1792d2;
  font-size: 0.75rem;
  margin: 0;
}

/* Layout */

header {
  background: pink;
  padding: 2em 0;
}

/* navigation */

nav a {
  text-decoration: none;
  color: #707070;
  font-weight: 700;
}

nav a:hover,
nav a:focus {
  color: #1792d2;
}
```

⌨️ (01:59:38) 23. Adding the underline

```css
nav a {
  /* ... */

  padding: 0.25em 0;
}

.current-page {
  border-bottom: 1px solid #707070;
}

.current-page:hover {
  color: #707070;
}
```

⌨️ (02:03:40) 24. A more complicated navigation

```css
.container {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
}

.container-flex {
  display: flex;
  justify-content: space-between;
}
```

⌨️ (02:10:25) 25. Making the navigation responsive

```css
@media (max-width: 675px) {
  .container-flex {
    flex-direction: column;
  }

  header {
    text-align: center;
  }
}

@media (max-width: 675px) {
  nav ul {
    flex-direction: column;
  }

  nav li {
    margin: 0.5em 0;
  }
}
```

⌨️ (02:17:20) 26. Taking a look at the rest of the project
⌨️ (02:21:34) 27. Setting up the structure

```html
<html>
  <head> </head>
  <body>
    <header>
      <div class="container container-flex">
        <div class="site-title">
          <h1>Living the social life</h1>
          <p class="subtitle">A blog exploring animation in life</p>
        </div>
        <nav>
          <ul>
            <li><a href="#" class="current-page">Home</a></li>
            <li><a href="#">About me</a></li>
            <li><a href="#">Recent-posts</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <div class="container container-flex">
      <main role="main"></main>
      <aside class="sidebar"></aside>
    </div>

    <footer>
      <p><strong>Living the Simple Life</strong></p>
      <p>Copyright 2020</p>
    </footer>
  </body>
</html>
```

⌨️ (02:29:59) 28. Featured article structure

```html
<!-- main -->
<article class="article-featured">
  <h2 class="article-title"></h2>
  <img src="" alt="" class="article-image" />
  <p class="article-info"></p>
  <p class="article-body"></p>
  <a href="#" class="article-read-more"></a>
</article>
<article class="article-recent"></article>
<article class="article-recent"></article>
<article class="article-recent"></article>
<!-- /main -->
```

⌨️ (02:35:07) 29. The home page - HTML for the recent articles

```html
<!-- main -->
<!-- <article class="article-featured">...</article>  -->
<article class="article-recent">
  <div class="article-recent-main">
    <h2 class="article-title"></h2>
    <p class="article-body"></p>
    <a href="#" class="article-read-more"></a>
  </div>
  <div class="article-recent-secondary">
    <img src="" alt="" class="article-image" />
    <p class="article-info"></p>
  </div>
</article>

<article class="article-recent">
  <div class="article-recent-main">
    <h2 class="article-title"></h2>
    <p class="article-body"></p>
    <a href="#" class="article-read-more"></a>
  </div>
  <div class="article-recent-secondary">
    <img src="" alt="" class="article-image" />
    <p class="article-info"></p>
  </div>
</article>

<article class="article-recent">
  <div class="article-recent-main">
    <h2 class="article-title"></h2>
    <p class="article-body"></p>
    <a href="#" class="article-read-more"></a>
  </div>
  <div class="article-recent-secondary">
    <img src="" alt="" class="article-image" />
    <p class="article-info"></p>
  </div>
</article>
<!-- /main -->
```

⌨️ (02:37:39) 30. Home Page - HTML for the aside

```html
<!-- body -->
<aside class="sidebar">
  <div class="sidebar-widget">
    <h2 class="widget-title"></h2>
    <img src="#" alt="" class="widget-image" />
    <p class="widget-body"></p>
  </div>

  <div class="sidebar-widget">
    <h2 class="widget-title"></h2>
    <div class="widget-recent-post">
      <h3 class="widget-recent-post-title"></h3>
      <img src="#" alt="" class="widget-image" />
    </div>
    <div class="widget-recent-post">
      <h3 class="widget-recent-post-title"></h3>
      <img src="#" alt="" class="widget-image" />
    </div>
    <div class="widget-recent-post">
      <h3 class="widget-recent-post-title"></h3>
      <img src="#" alt="" class="widget-image" />
    </div>
  </div>
</aside>
<!-- /body -->
```

⌨️ (02:43:45) 31. Starting the CSS for our page

```css
body {
  /* ... */

  font-size: 1.125rem;
  font-weight: 300;
}

/* Typography */

h1,
h2,
h3 {
  font-family: "Lora", sans-serif;
  font-weight: 400;
  color: #143774;
}

h1 {
  font-size: 2rem;
  margin: 0;
}

a {
  color: #1792d2;
}

a:hover,
a:focus {
  color: #143774;
}

strong {
  font-weight: 700;
}

.subtitle {
  font-weight: 700;
  color: #1792d2;
  font-size: 0.75rem;
  margin: 0;
}

.article-title {
  font-size: 1.5rem;
}

.article-read-more,
.article-info {
  font-size: 0.875rem;
}

.article-read-more {
  color: #1792d2;
  text-decoration: none;
  font-weight: 700;
}

.article-read-more:hover,
.article-read-more:focus {
  color: #143774;
  text-decoration: none;
}
```

⌨️ (02:59:15) 32. Starting the layout - looking at the big picture

```css
img {
  max-width: 100%;
  display: block;
}

main {
  width: 75%;
}

aside {
  width: 25%;
}
```

⌨️ (03:07:48) 33. Starting to think mobile first

```css
@media (min-width: 675px) {
  .container-flex {
    flex-direction: row;
  }

  main {
    width: 75%;
  }

  aside: {
    width: 20%;
  }
}
```

⌨️ (03:10:37) 34. Styling the featured article

```css
.article-info {
  margin: 2em 0;
}

/* articles */

.article-featured {
  border-bottom: #707070 1px solid;
  padding-bottom: 2em;
  margin-bottom: 2em;
}
```

⌨️ (03:17:03) 35. Changing the visual order with flex box

```css
h1,
h2,
h3 {
  /* ... */

  margin-top: 0;
}

.article-recent {
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
}

.article-recent-main {
  order: 2;
}

.article-recent-secondary {
  order: 1;
}
```

⌨️ (03:22:19) 36. Playing with the title’s position, and the downsides of negative margins

```css
/* @media (min-width: 500px) {
  .article-recent-main {
    margin-top: -2.5em;
  }

  .article-info {
      text-align: right;
  }
} */
```

⌨️ (03:27:05) 37. Changing the visual order with flex box

```css
.article-image {
  width: 100%;
  min-height: 250px;
  object-fit: cover;
  /* object-position: left; */
}
```

⌨️ (03:31:00) 38. Styling recent articles for large screens

```css
header {
  /* ... */
  margin-top: 0;
}

@media (min-width: 675px) {
  .article-recent {
    flex-direction: row;
    justify-content: space-between;
  }

  .article-recent-main {
    width: 68%;
  }

  .article-recent-secondary {
    width: 30%;
  }

  .article-featured {
    display: flex;
    flex-direction: column;
  }

  .article-image {
    order: -2;
  }

  .article-info {
    order: -1;
  }
}
```

⌨️ (03:38:50) 39. Setting up the widgets and talking breakpoints

```css
@media (min-width: 675px) {
  main {
    width: 70%;
  }

  aside {
    width: 25%;
    min-width: 200px;
    margin-left: 1em;
  }
}

/* widgets */
.sidebar-widget {
  border: 20px solid #efefef;
  margin-bottom: 2em;
  padding: 1em;
}
```

⌨️ (03:45:41) 40. Using a new pseudo-class to wrap-up the homepage

```css
.widget-title,
.widget-recent-post-title {
  font-size: 1rem;
}

.widget-title {
  font-family: "Ubuntu", sans-serif;
  font-weight: 700;
}

.widget-recent-post {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #707070;
  margin-bottom: 1em;
}

.widget-recent-post:last-child {
  border: 0;
  margin: 0;
}

.widget-image {
  order: -1;
}

footer {
  background: #143774;
  color: white;
  text-align: center;
  padding: 3em 0;
}
```

⌨️ (03:53:12) 41. Creating the recent posts page

```html
<a href="index.html" ... /> <a href="page-index.html" ... />
```

⌨️ (03:56:39) 42. Setting up the About Me page

make page

⌨️ (04:00:54) 43. Fixing up some loose ends

```css
image-full {
  min-height: 300px;
  width: 100%;
  object-fit: cover;
  margin-bottom: 2em;
}

h3 {
  color: #1792d2;
}

.widget-recent-post-title {
  color: black;
}
```

⌨️ (04:05:27) 44. Important Note. The viewport meta tag

<meta name="viewport" content="width=device-width, initial-scale=1">
in head

⌨️ (04:09:10) 45. Module wrap up

flexbox!
justify-content & align-items
flex-direction (switch main axis)
media queries

⌨️ (04:12:24) Outro

---

## Понимание вьюпорта WebView в iOS 11

[https://css-live.ru/articles/ponimanie-vyuporta-webview-v-ios-11.html](https://css-live.ru/articles/ponimanie-vyuporta-webview-v-ios-11.html)

### Фиксы iOS 11

Свойство мета-тега viewport, которое нам нужно, — это viewport-fit. Оно имеет три возможных значения:

contain: вьюпорт должен полностью вмещать веб-контент. Тогда фиксированные элементы будут содержаться внутри безопасной зоны на iOS 11.

cover: веб-контент должен полностью покрывать вьюпорт. Тогда фиксированные элементы будут зафиксированы во вьюпорте. Даже в тех случаях, когда это означает, что они будут перекрыты. Это восстанавливает поведение, которое было при iOS 10.

auto: значение по умолчанию, в этом случае поведение веб-контента такое же, как при contain.

Таким образом, чтобы вернуть панель навигации к самому верху экрана, за статус-бар, как это было на iOS 10, следует добавить в мета-тег viewport свойство viewport-fit=cover.

### iPhone X

На iPhone X уже появляется проблема, даже при том же значении cover у свойства viewport-fit

Они ввели новое понятие, похожее на CSS-переменные, изначально названное CSS-константами.

принято предложение, но с условием: для доступа к этим константам нужно будет использовать функцию с названием env() вместо constant().

Примечание: iOS 11 использует синтаксис с constant(), но последующие версии операционной системы будут поддерживать только env()!

Четыре константы для управления раскладкой безопасных зон — это:

env(safe-area-inset-top): значение отступа безопасной зоны (в CSS-пикселах), считая от верхнего края вьюпорта.

env(safe-area-inset-bottom): значение отступа безопасной зоны (в CSS-пикселах), считая от нижнего края вьюпорта.

env(safe-area-inset-left): значение отступа безопасной зоны (в CSS-пикселах), считая от левого края вьюпорта.

env(safe-area-inset-right): значение отступа безопасной зоны (в CSS-пикселах), считая от правого края вьюпорта.

Пример с CSS-константами
Скажем, есть фиксированная верхняя панель навигации, и CSS для iOS 10 сейчас выглядит так:

```css
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;

  padding-top: 20px; /* Высота статус-бара */
}
```

Чтобы она автоматически подстраивалась под iPhone X и другие устройства на iOS 11, надо добавить свойство viewport-fit=cover в мета-тег viewport и изменить CSS с обращением к константе:

```css
header {
  /* ... */

  /* Высота статус-бара в iOS 10 */
  padding-top: 20px;

  /* Высота статус-бара в iOS 11.0 */
  padding-top: constant(safe-area-inset-top);

  /* Высота статус-бара в iOS 11+ */
  padding-top: env(safe-area-inset-top);
}
```

Важно, чтобы для старых устройств, не понимающих синтаксис constant() или env(), осталось страховочное значение. Можно также использовать константы в CSS-функции calc().

Также не стоит забывать делать то же самое для нижней панели навигации.

---

## Красивое выравнивание блоков по резиновой сетке. По-новому

[https://css-live.ru/css/responsive-grid-css-grid-layout-auto-fill.html](https://css-live.ru/css/responsive-grid-css-grid-layout-auto-fill.html)

```css
.grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    100px
  ); /* или repeat(auto-fit, 100px); */
  justify-content: center; /* или space-between, или space-evenly, можно и space-around */
}

/* grid-template-columns: repeat(auto-fit, var(—item-width)); */
```

Мы нашли стандартное решение старой, но по-прежнему актуальной задачи. На мой взгляд, можно смело улучшать им существующую верстку, обернув в @supports (как советует Эрик Мейер), или внедрять как основное в новые проекты, оставив старый хак в качестве фолбэка.

---

## Руководство по размеру текста для отзывчивого дизайна

[https://css-live.ru/articles/rukovodstvo-po-razmeru-teksta-dlya-otzyvchivogo-dizajna.html](https://css-live.ru/articles/rukovodstvo-po-razmeru-teksta-dlya-otzyvchivogo-dizajna.html)

```
Градация	Размер шрифта
 0	      1.0em
+1	      1.2em
+2	      1.44em
+3	      1.728em
+4	      2.074em
+5	      2.488em

Шкала с малой терцией (1.2) при базовом размере 1em
```

Пускаем шкалу в дело
Когда мы выяснили, какая шкала лучше подходит для нашего проекта, пора применить ее на деле. В CSS это можно сделать такими способами:

Скопировать и вручную расставить числа в значения всех нужных свойств.

Задействовать препроцессоры вроде Sass, в которых есть встроенные математические функции.

Воспользоваться стандартной функцией calc() в самом CSS.

Примеры далее используют последний вариант, а за поддержку calc() и var() в браузерах там отвечает PostCSS

Если шкала соотношений будет использоваться для чего-то посложнее, стоит обратить внимание на эти плагины для PostCSS или Sass:

postcss-modular-scale

modularscale-sass

Они позволяют получать значения масштаба в более аккуратном синтаксисе, чем у calc(), а также могут работать с несколькими значениями base и ratio одновременно.

Настройка переменных
Прежде всего надо определиться со значениями переменных ratio и base, от которых многое зависит в логике шкалы:

```css
:root {
  --ratio: 1.2;
  --base: 1;
  --base-em: calc(var(--base) * 1em);
  --base-px: calc(var(--base) * 16px);
}
```

Затем нужно задать тот набор градаций, которым вы, скорее всего, будете пользоваться:

```css
:root {
  --ms0: 1;
  --ms1: var(--ratio); /* 1.2   */
  --ms2: calc(var(--ratio) * var(--ms1)); /* 1.44  */
  --ms3: calc(var(--ratio) * var(--ms2)); /* 1.728 */
  --ms4: calc(var(--ratio) * var(--ms3)); /* 2.074 */
  --ms5: calc(var(--ratio) * var(--ms4)); /* 2.488 */
  --ms6: calc(var(--ratio) * var(--ms5)); /* 2.986 */
  --ms7: calc(var(--ratio) * var(--ms6)); /* 3.583 */
}
```

Взяв этот ряд коэффициентов, можно умножать их на значение базовой величины, получая фактические значения шкалы:

```css
font-size: calc(var(--base-em) * var(--ms1)); /* 1.2em  */
font-size: calc(var(--base-em) * var(--ms2)); /* 1.44em */
```

Установка размеров по умолчанию
Браузерный размер по умолчанию для шрифта в сочетании с коэффициентом 1.44 для line-height кажется подходящим вариантом для основного текста:

```css
body {
  font-size: calc(var(--base-em) * var(--ms0));
  line-height: calc(var(--base) * var(--ms2));
}
```

Все шесть разных размеров для заголовков вам вряд ли понадобятся (есть же и другие способы визуально разграничить их). Но если вы всё-таки хотите задать каждому из них свой размер, можно взять серию градаций шкалы:

```css
h6 {
  font-size: calc(var(--base-em) / var(--ms1));
}
h5 {
  font-size: calc(var(--base-em) * var(--ms0));
}
h4 {
  font-size: calc(var(--base-em) * var(--ms1));
}
h3 {
  font-size: calc(var(--base-em) * var(--ms2));
}
h2 {
  font-size: calc(var(--base-em) * var(--ms3));
}
h1 {
  font-size: calc(var(--base-em) * var(--ms4));
}
```

```
Один из чаще всего упускаемых из виду моментов во фронтенд-разработке — line-height многострочных заголовков. Они часто ну слишком уж огромные.
```

В случае многострочных заголовков значение на одну ступень шкалы ниже может оказаться более удобным для чтения:

```css
h3,
h2 {
  line-height: calc(var(--base) * var(--ms1));
}
h1 {
  line-height: calc(var(--base) * var(--ms0));
}
```

Добавочные возможности шкалы, когда нужно усилить визуальное различие размеров

```css
@media (min-width: 480px) {
  html {
    font-size: calc(var(--base-px) * var(--ms1));
  }
}
```

Вам может понадобиться увеличить не только сам текст, но и разницу в размерах между заголовками разного уровня. Это можно сделать, переопределив размер для крупнейших заголовков на более высокие градации шкалы:

```css
@media (min-width: 768px) {
  h3 {
    font-size: calc(var(--base-em) * var(--ms3));
  }
  h2 {
    font-size: calc(var(--base-em) * var(--ms4));
  }
  h1 {
    font-size: calc(var(--base-em) * var(--ms5));
  }
}

@media (min-width: 1024px) {
  h2 {
    font-size: calc(var(--base-em) * var(--ms5));
  }
  h1 {
    font-size: calc(var(--base-em) * var(--ms6));
  }
}

@media (min-width: 1360px) {
  h1 {
    font-size: calc(var(--base-em) * var(--ms7));
  }
}
```

Другие применения шкалы

```css
.u-textBigger {
  font-size: calc(var(--base-em) * var(--ms1));
}

.u-textSmaller {
  font-size: calc(var(--base-em) / var(--ms1));
}
```

```html
<div class="u-textBigger">
  <h2>Now I'm as big as an H1</h2>
  <h3>Now I'm as big as an H2</h3>
  <p class="u-textSmaller">I haven't changed at all.</p>
</div>

<div class="u-textSmaller">
  <div class="u-textSmaller">
    <div class="u-textBigger">
      <span class="u-textBigger">Same as it ever was.</span>
    </div>
  </div>
</div>
```

- Краткая выжимка
  Определяйте пропорции текстовых элементов по шкале соотношений

  Делайте шкалу универсальной, пригодной для разных размеров экрана

  Если нужно дополнительно подчеркнуть разницу между текстовыми элементами, используйте значения более высоких ступеней шкалы

  Используйте шкалу не только для отдельных элементов

- Дополнительные материалы
  Более осмысленная типографика Тима Брауна

  Современный подход к пропорциям в веб-типографике Джейсона Пэментала

  Точный контроль над отзывчивой типографикой Майка Ритмюллера

  Отзывчивая типографика со шкалой соотношений Макса Ластера

  Калькулятор шкалы соотношений

  Калькулятор пропорций типографики на базе золотого сечения

  Еще два калькулятора размеров для типографики — Gridlover и Type Scale

- Примечания
  Использование одной базовой величины и одного соотношения — не единственный способ получить шкалу, подходящую для ограничений маленького экрана. Можно создать составную шкалу, используя несколько базовых значений и соотношений вместо единственного. Вот пример со вторым базовым значением для уменьшения расстояния между градациями. Подробнее см. на modularscale.com.

  Для преобразования вывода calc() и var() можно использовать плагин postcss-cssnext

---

# Selectors, impact on page rendering

## CSS и производительность сети

[https://css-live.ru/articles/css-i-proizvoditelnost-seti.html](https://css-live.ru/articles/css-i-proizvoditelnost-seti.html)

CSS критически важен для отображения страницы — браузер не начнет рендеринг, пока не найдет, загрузит и распарсит весь CSS — поэтому крайне важно как можно скорее получить его на устройстве пользователя. Любая задержка на критическом пути скажется на нашей начальной отрисовке, заставив пользователя видеть пустой экран.

Собственно, вот почему CSS так важен для производительности:

- Браузер не может отобразить страницу до построения дерева отрисовки;

- дерево отрисовки получается из DOM и CSSOM вместе взятых;

- DOM — это HTML плюс любой блокирующий JavaScript, который на него влияет;

- CSSOM — все CSS-правила, применённые к DOM;
  с помощью атрибутов async и defer можно легко сделать JavaScript неблокирующим;

- сделать CSS асинхронным намного сложнее;

- поэтому важно помнить, что `скорость загрузки страницы определяется самой медленной таблицей стилей.`

Учитывая это, нам нужно максимально быстро построить DOM и CSSOM. DOM по большей части строится относительно быстро: первый же ответ сервера на запрос браузером HTML-страницы – это и есть DOM. Однако, поскольку CSS почти всегда отдельный ресурс от HTML, на построение CSSOM обычно уходит гораздо больше времени.

### Используйте минимально необходимый CSS

Если есть такая возможность, один из эффективнейших способов снизить время до первой отрисовки – воспользоваться паттерном «минимально необходимый CSS»: определить все стили, необходимые для начальной отрисовки (обычно это стили для всего, что попадает на первый экран), вставить их прямо в теги <style> в <head> документа, а остальные стили подгружать асинхронно, отдельно от критического пути.

### Разделяйте свои медиавыражения по типам

Итак, если критический CSS нам не по силам – как скорее всего и окажется – есть вариант попроще, разделить основной CSS-файл на отдельные медиавыражения в нем. Практический результат в том, что браузер будет…

- загружать любой CSS, нужный для текущего контекста (тип устройства, размер экрана, разрешение, ориентация, и т.д) с крайне высоким приоритетом, блокирующим критический путь, и;

- загружать любой CSS, ненужный для текущего контекста с очень низким приоритетом, никак не затрагивая критический путь.

По сути, любой CSS, ненужный для отображения текущего представления, фактически загружается браузером отложенно.

<link rel="stylesheet" href="all.css" />

Если положить весь CSS в один файл, то вот как сеть поступит с ним:

https://css-live.ru/Primer/css-and-network/screenshot-css-media-all.png

Заметьте, что у единственного CSS-файла наивысший приоритет.

Если можно разделить один файл, полностью блокирующий всю отрисовку, на отдельные медиавыражения из него:

<link rel="stylesheet" href="all.css" media="all" />
<link rel="stylesheet" href="small.css" media="(min-width: 20em)" />
<link rel="stylesheet" href="medium.css" media="(min-width: 64em)" />
<link rel="stylesheet" href="large.css" media="(min-width: 90em)" />
<link rel="stylesheet" href="extra-large.css" media="(min-width: 120em)" />
<link rel="stylesheet" href="print.css" media="print" />

То мы увидим, что сеть ведет себя с файлами по-разному

https://css-live.ru/Primer/css-and-network/screenshot-css-media-split.png

CSS-файлам, которые не требуются для отображения текущего контекста, назначается наименьший приоритет.

Браузер по-прежнему загрузит все CSS-файлы, но будет блокировать отрисовку только при тех, которые нужны, чтобы полностью отобразить страницу при текущих условиях.

### Избегайте @import в CSS-файлах

Следующее, чем мы можем помочь начальной отрисовке, гораздо, гораздо проще. Не используйте @import в своих CSS-файлах.

@import по своей природе медленный. Это крайне плохо для производительности начальной отрисовки. Это потому, что мы создаем больше запросов к серверу во время критической начальной загрузки.

- Скачиваем HTML;

- HTML запрашивает CSS;
  (К этому моменту хорошо бы уже начать строить дерево отображения, но;)

- CSS запрашивает ещё CSS;

- строим дерево отображения.

Если взять следующий HTML:

<link rel="stylesheet" href="all.css" media="all" />
… и содержимое all.css:

@import url(imported.css);
… каскадная диаграмма в итоге будет такой:

https://css-live.ru/Primer/css-and-network/screenshot-import-before.png

Явное отсутствие распараллеливания во время критической начальной загрузки

Если просто превратить это в плоскую структуру из двух <link rel="stylesheet" /> и нуля директив @import:

<link rel="stylesheet" href="all.css" />
<link rel="stylesheet" href="imported.css" />
… то мы получим гораздо разумную каскадную диаграмму:

https://css-live.ru/Primer/css-and-network/screenshot-import-after.png
Критический CSS начинает загружаться параллельно.

Примечание. Хочу кратко обсудить одно нетипичное исключение. Если вам вдруг выпадет такой случай, что к CSS-файлу с @import нет доступа (то есть удалить его оттуда нельзя), можно без вреда оставить его там же в CSS, но также дополнить разметку соответствующим <link rel="stylesheet" /> в вашем HTML. Это значит, что браузер будет инициировать загрузку импортируемого CSS из HTML, пропустив @import: двойной загрузки не будет.

### Остерегайтесь @import в HTML

Это странный раздел. Очень странный. Я провалился в настолько глубокую кроличью нору, исследуя эту тему… В Blink и WebKit всё поломано, потому что в них баг; в Firefox и IE/Edge только кажется, что поломано. Я завел баги про это в их багтрекерах.

во всех основных браузерах реализован вспомогательный, облегченный парсер, называемый обычно «Сканер предварительной загрузки» (Preload Scanner). Основной парсер в браузере отвечает за создание DOM, CSSOM, запуск JavaScript и так далее, и он постоянно приостанавливается по мере того, как он блокируется разными частями документа. Сканер предварительной загрузки может спокойно забегать вперед основного, сканируя остальной HTML в поисках ссылок на другие подресурсы (такие как CSS-файлы, JS и изображения). После их обнаружения сканер предварительной загрузки начинает загружать их, готовый к тому, чтобы основной парсер потом мог подхватить их уже готовыми для использования. Внедрение сканера предварительной загрузки улучшило производительность веб-страниц примерно на 19%, причём разработчикам даже не пришлось и пальцем пошевелить. Это отличная новость для пользователей!

Единственное, за чем нам, разработчикам, нужно следить — чтобы нечаянно не скрыть чего-нибудь от сканера предварительной загрузки, как иногда бывает.

В данном разделе рассматриваются баги в сканере предварительной загрузки в WebKit и Blink, а также его неэффективность в Firefox’s и IE/Edge.

#### Firefox и IE/Edge: поместите @import перед JS и CSS в HTML

В Firefox и IE/Edge сканер предварительной загрузки, похоже, не подхватывает какие-либо директивы @import, определённые после <script src=""> или <link rel="stylesheet" />

Поэтому этот HTML:

<script src="app.js"></script>

<style>
  @import url(app.css);
</style>

… даст вот такую каскадную диаграмму:

https://css-live.ru/Primer/css-and-network/screenshot-ff-import-blocked-by-js.png

Потеря распараллеливания в Firefox из-за неработающего сканера предварительной загрузки (примечание: точно такая же каскадная диаграмма получается в IE/Edge).

Здесь хорошо видно, что таблица стилей из @import не начинает загружаться до завершения JavaScript-файла.

Эта проблема – не что-то уникальное для JavaScript. С таким HTML всё так же:

<link rel="stylesheet" href="style.css" />

<style>
  @import url(app.css);
</style>

Быстрое решение этой проблемы — поменять местами блоки <script> или <link rel="stylesheet" /> и <style>. Однако, из-за этого, что-то наверняка может сломаться, поскольку мы меняем порядок зависимостей (читай, каскад).

Правильное решение этой проблемы — вообще обходиться без @import и использовать второй link rel="stylesheet"

<link rel="stylesheet" href="style.css" />
<link rel="stylesheet" href="app.css" />

Гораздо лучше:

https://css-live.ru/Primer/css-and-network/screenshot-ff-import-unblocked-by-css.png
Два <link rel="stylesheet" /> восстанавливают параллельность. (примечание: точно такая же каскадная диаграмма получается в IE/Edge).

#### Blink и WebKit: оборачивайте адреса ссылок в @import внутри HTML в кавычки

В WebKit и Blink та же картина, что в Firefox и IE/Edge, получается только если у ссылок в @import нет кавычек. Это значит, что в сканере предварительной загрузки в WebKit и Blink есть баг.

Если просто добавить кавычки, проблема решится, и не нужно будет ничего переупорядочивать. И всё же, как и ранее, мой совет здесь — вообще обойтись без @import, а вместо него поставить второй <link rel="stylesheet" />.

До:

<link rel="stylesheet" href="style.css" />

<style>
  @import url(app.css);
</style>

… даёт:
https://css-live.ru/Primer/css-and-network/screenshot-chrome-import-blocked-by-css.png
Без кавычек в ссылках в @import сканер предварительной загрузки в Chrome у нас поломается (примечание: точно такая же каскадная диаграмма получается в Opera и Safari.)

После:

<link rel="stylesheet" href="style.css" />

<style>
  @import url("app.css");
</style>

https://css-live.ru/Primer/css-and-network/screenshot-chrome-import-unblocked-by-css.png
Если добавить кавычки в ссылки в @import, то это починит сканер предварительной загрузки в Chrome (примечание: точно такая же каскадная диаграмма получается в Opera и Safari.)

### Не размещайте <link rel="stylesheet" /> перед асинхронными сниппетами

речь пойдет о том, как CSS может нечаянно задержать загрузку последующих ресурсов, прежде всего JavaScript, асинхронно подгружаемого кодом наподобие такого:

<script>
  var script = document.createElement('script');
  script.src = "analytics.js";
  document.getElementsByTagName('head')[0].appendChild(script);
</script>

Во всех браузерах есть замечательное поведение, преднамеренное и ожидаемое, но я не припомню ни одного разработчика, который с ним знаком. Это вдвойне удивительно, учитывая, как сильно оно может влиять на производительность.

```
Браузер не выполнит <script>, если он в это время еще работает с каким-то CSS-кодом
```

<link rel="stylesheet" href="slow-loading-stylesheet.css" />
<script>
console.log("пока грузится оочеень-мееедлееенный-файл.css");
</script>

Это специально. Так задумано. Ни один синхронный элемент <script> в вашем HTML не выполнится, пока грузится какой-либо CSS. Это простая защитная стратегия для особого случая, когда <script> может запросить что-то о стилях страницы: если скрипт запрашивает цвет страницы до того, как загружен и разобран CSS, то ответ JavaScript может оказаться неверным и неактуальным. Чтобы избежать этого, браузер не выполняет <script>, пока CSSOM не будет готова.

Как результат — любые задержки во время загрузки CSS косвенно скажутся на вещах вроде асинхронных сниппетов. Лучше всего это видно на примере.

Если поместить <link rel="stylesheet" /> перед нашим асинхронным сниппетом, тот не сработает, пока CSS-файл не загрузится и не распарсится. Следовательно, ваш CSS всё тормозит.

<link rel="stylesheet" href="app.css" />

<script>
  var script = document.createElement('script');
  script.src = "analytics.js";
  document.getElementsByTagName('head')[0].appendChild(script);
</script>

При таком порядке очевидно, что JavaScript-файл не начинает грузиться, пока создаётся CSSOM. Любое распараллеливание полностью потеряно.

https://css-live.ru/Primer/css-and-network/screenshot-async-js-blocked-by-css.png
Из-за таблицы стилей перед асинхронным сниппетом теряется возможность распараллеливания.

Интересно, что сканер предварительной загрузки хотел бы уже подхватить ссылку на analytics.js заранее, но мы непроизвольно скрыли её: "analytics.js" — строка, и не становится атрибутом src, который можно разобрать на токены, пока элемент не появится в DOM

Сторонние сервисы довольно часто предоставляют такие асинхронные сниппеты для более безопасной загрузки своих скриптов. Также разработчики часто с подозрением относятся к таким сторонним ресурсам, размещая свои асинхронные сниппеты позже на странице. Пусть намерения здесь и благие — «Я не хочу размещать сторонние теги <script> раньше моих собственных ресурсов!» — от этого часто бывает лишь вред. На самом деле, Google Analytics даже говорит нам, что делать, и они правы:

```
Скопируйте и вставьте этот код первым элементом в <HEAD> на каждой странице, которую нужно отслеживать.
```

```
Если блоки <script>…</script> не зависят от CSS, размещайте их выше ваших таблиц стилей.
```

Вот что получается, если следовать этому паттерну:

<script>
  var script = document.createElement('script');
  script.src = "analytics.js";
  document.getElementsByTagName('head')[0].appendChild(script);
</script>

<link rel="stylesheet" href="app.css" />

https://css-live.ru/Primer/css-and-network/screenshot-async-js-blocked-by-css-fixed.png
Если поменять местами таблицу стилей и асинхронный сниппет, то распараллеливание восстановится.

Теперь можно видеть, что мы полностью восстановили распараллеливание и страница загружается почти вдвое быстрее.

### Размещайте любой JavaScript без обращения к CSSOM перед CSS; размещайте любой JavaScript с обращением к CSSOM после CSS

как лучше загружать CSS и JavaScript в целом?

Если

- синхронный JS, определённый после CSS, блокируется, пока строится CSSOM;

- синхронный JS блокирует построение DOM…

то при условии, что они не зависят друг от друга — что быстрее/предпочтительнее?

- Cкрипт после стилей;

- стили после скрипта?

И вот ответ:

```
Если между файлами нет зависимости, то вам лучше размещать свои блокирующие скрипты выше блокирующих стилей
```

нет смысла откладывать выполнение JavaScript ради CSS, от которого этот JavaScript не зависит.

(Сканер предварительной загрузки гарантирует, что, хотя построение DOM блокируется скриптами, CSS по-прежнему загружается в параллельном потоке.)

Если какой-то ваш JavaScript зависит от CSS, а какой-то нет, тогда самый оптимальный порядок для загрузки синхронных JavaScript и CSS — разделить этот JavaScript на две части и загружать их по разные стороны вашего CSS:

<!-- Этот JavaScript выполнится сразу же после загрузки. -->
<script src="Мне-надо-блокировать-dom-но-НЕ-НАДО-обращаться-к-cssom.js"></script>

<link rel="stylesheet" href="app.css" />

<!-- Этот JavaScript выполнится сразу же после построения CSSOM. -->
<script src="Мне-надо-блокировать-dom-но-НАДО-обращаться-к-cssom.js"></script>

С таким паттерном загрузки у нас и загрузка, и выполнение происходят в самом оптимальном порядке. Можно заметить маленькие розовые метки, представляющие выполнение JavaScript. Запись (1) — HTML, в котором запланировано выполнение какого-то JavaScript при загрузке и/или выполнении других файлов; запись (2) выполняется в момент загрузки; запись (3) — CSS, поэтому он вообще не выполняет JavaScript; запись (4) не выполняется, пока CSS не будет завершён.
https://css-live.ru/Primer/css-and-network/waterfall-js-execution.png
Как CSS может повлиять на то, в какой момент выполнится JavaScript.

крайне важно протестировать этот паттерн в вашем конкретном случае: результаты могут отличаться в зависимости от того, сильно ли различаются по весу и ресурсоёмкости тот JavaScript, что грузится до CSS, и сам CSS. Тестируйте, тестируйте и еще раз тестируйте.

### Размещайте <link rel="stylesheet" /> в <body>

Эта последняя стратегия довольно нова, дает огромный плюс для прогрессивного рендеринга и ощущение быстроты для пользователя. И она также весьма удобна для компонентов.

В HTTP/1.1 все наши стили обычно собраны в один большой главный файл. Назовём его app.css:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <header class="site-header">
      <nav class="site-nav">...</nav>
    </header>

    <main class="content">
      <section class="content-primary">
        <h1>...</h1>

        <div class="date-picker">...</div>
      </section>

      <aside class="content-secondary">
        <div class="ads">...</div>
      </aside>
    </main>

    <footer class="site-footer"></footer>
  </body>
</html>
```

Здесь есть три основных недостатка:

- `Любая отдельно взятая страница применяет лишь небольшую часть стилей из app.css`: мы почти наверняка загружаем больше CSS, чем надо.

- `Нам навязана неэффективная стратегия кеширования`: при изменении, допустим, цвета фона выбранного текущего дня в выпадающем календарике, который есть только на одной странице, потребовалось бы обновить кеш для всего app.css.

- `Весь app.css блокирует отображение`: даже, если текущей странице требуется только 17% app.css, нам по-прежнему нужно ждать загрузки остальных 83%, прежде чем мы начнем что-либо рендерить.

С HTTP/2 можно начать решать пункты 1 и 2

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="core.css" />
    <link rel="stylesheet" href="site-header.css" />
    <link rel="stylesheet" href="site-nav.css" />
    <link rel="stylesheet" href="content.css" />
    <link rel="stylesheet" href="content-primary.css" />
    <link rel="stylesheet" href="date-picker.css" />
    <link rel="stylesheet" href="content-secondary.css" />
    <link rel="stylesheet" href="ads.css" />
    <link rel="stylesheet" href="site-footer.css" />
  </head>
  <body>
    <header class="site-header">
      <nav class="site-nav">...</nav>
    </header>

    <main class="content">
      <section class="content-primary">
        <h1>...</h1>

        <div class="date-picker">...</div>
      </section>

      <aside class="content-secondary">
        <div class="ads">...</div>
      </aside>
    </main>

    <footer class="site-footer"></footer>
  </body>
</html>
```

Теперь избыточность можно побороть, поскольку для страницы можно загружать только нужный CSS, а не всё подряд. Это уменьшает размер файла, блокирующего CSS-код при начальной загрузке.

Мы также можем принять более продуманную стратегию кеширования, обновляя кеш только для нужных файлов, и не трогать остальные.

Что мы не решили, так это то, что всё это по-прежнему блокирует отображение — скорость загрузки у нас по-прежнему ограничивается самой медленной таблицей стилей. Это значит, что, если по какой-либо причине загрузка файла page-footer.css будет долгой, браузер не сможет даже начать отрисовку .page-header.

Однако, из-за недавних изменений в Chrome (версия 69, кажется) и поведения, которое уже есть в Firefox и IE/Edge, <link rel="stylesheet" /> будут блокировать отображение только последующего контента, а не всей страницы. Это значит, что теперь можно выстраивать наши страницы так:

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="core.css" />
  </head>
  <body>
    <link rel="stylesheet" href="site-header.css" />
    <header class="site-header">
      <link rel="stylesheet" href="site-nav.css" />
      <nav class="site-nav">...</nav>
    </header>

    <link rel="stylesheet" href="content.css" />
    <main class="content">
      <link rel="stylesheet" href="content-primary.css" />
      <section class="content-primary">
        <h1>...</h1>

        <link rel="stylesheet" href="date-picker.css" />
        <div class="date-picker">...</div>
      </section>

      <link rel="stylesheet" href="content-secondary.css" />
      <aside class="content-secondary">
        <link rel="stylesheet" href="ads.css" />
        <div class="ads">...</div>
      </aside>
    </main>

    <link rel="stylesheet" href="site-footer.css" />
    <footer class="site-footer"></footer>
  </body>
</html>
```

Практический результат таков, что теперь можно добавлять стили на страницу по капле, как только они становятся доступны.

В браузерах, в которых это не поддерживается, мы ничего не теряем в производительности: мы возвращаемся к старому поведению, когда у нас всё грузится со скоростью самого медленного CSS-файла.

Чтобы подробнее узнать об этом методе подключения CSS, рекомендую прочитать статью Джейка на эту тему.
[https://css-live.ru/articles/budushhee-zagruzki-css.html]

### Заключение

- Загружайте любой CSS «лениво» (отложенно):

  - Это может быть минимально необходимый CSS;
  - или разделяйте ваш CSS на медиавыражения.

- Избегайте @import:

  - В HTML;
  - но особенно в CSS;
  - и не забывайте о странностях со сканером предварительной загрузки.

- Будьте внимательны с синхронным порядком CSS и JavaScript:

  - JavaScript, определённый после CSS, не сработает до завершения загрузки CSSOM;
  - поэтому, если ваш JavaScript не зависит от вашего CSS:
    - загрузите его перед вашим CSS;
  - но если он зависит от вашего CSS:
    - загрузите его после CSS.

- Загружайте CSS, как только он нужен DOM:
  - Это разблокирует начальный рендер и позволит рендерить страницу прогрессивно.

---

## CSS selector performance

[https://ecss.io/appendix1.html](https://ecss.io/appendix1.html)

Some takeaways from these tests:

sweating over the selectors used in modern browsers is futile; most selection methods are now so fast it's really not worth spending much time over. Furthermore, there is disparity across browsers of what the slowest selectors are anyway. Look here last to speed up your CSS.

excessive unused styles are likely to cost more, performance wise, than any selectors you chose so look to tidy up there second. 3000 lines that are unused or surplus on a page are not even that uncommon. While it's common to bunch all the styles up into a great big single styles.css, if different areas of your site/web application can have different (additional) style sheets added (dependency graph style), that may be the better option.

if your CSS has been added to by a number of different authors over time, look to tools like UnCSS to automate the removal of styles; doing that process by hand is no fun!

the battle for high performing CSS will not be won in the selectors used, it will be won with the judicious use of property and values.

getting something painted to screen fast is obviously important but so is how a page feels when the user interacts with it. Look for expensive property and value pairs first (Chrome continuous repaint mode is your friend here), they are likely to provide the biggest gains.

---

## Optimizing CSS: ID Selectors and Other Myths

[https://www.sitepoint.com/optimizing-css-id-selectors-and-other-myths/](https://www.sitepoint.com/optimizing-css-id-selectors-and-other-myths/)

### The Basics of CSS Parsing

```
rank	type	                        example
1.	  ID	                          #classID
2.	  Class	                        .class
3.	  Tag	                          div
4.	  General and adjacent sibling	div ~ a, div + a
5.	  Child and descendant	        div > a, div a
6.	  Universal	                    *
7.	  Attribute	                    [type="text"]
8.	  Pseudo-classes and elements   a:first-of-type, a:hover
```

Therefore, the shorter the selector, the better. If possible, make sure that the key selector is a class or an ID to keep it fast and specific.

### Measuring the Performance

```
Selector	                            Query Time (ms)
div	                                  4.8740
.box	                                3.625
.box > .title	                        4.4587
.box .title	                          4.5161
.box ~ .box	                          4.7082
.box + .box	                          4.6611
.box:last-of-type	                    3.944
.box:nth-of-type(2n - 1)	            16.8491
.box:not(:last-of-type)	              5.8947
.box:not(:empty):last-of-type .title	8.0202
.box:nth-last-child(n+6) ~ div	      20.8710
```

https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2017/11/1510297945frame-full-1024x156.jpg

---

## Performance Impact of CSS Selectors (ознакомиться для исторического контекста)

[https://www.stevesouders.com/blog/2009/03/10/performance-impact-of-css-selectors/](https://www.stevesouders.com/blog/2009/03/10/performance-impact-of-css-selectors/)

`The sad truth about CSS3 selectors is that they really shouldn’t be used at all if you care about page performance. Decorating your markup with classes and ids and matching purely on those while avoiding all uses of sibling, descendant and child selectors will actually make a page perform significantly better in all browsers.`

```
Web Site	  # CSS Rules #DOM Elements
AOL	        2289	      1628
eBay	      305	        588
Facebook  	2882	      1966
Google	    92	        552
Live Search	376	        449
MSN	        1038	      886
MySpace	    932	        444
Wikipedia	  795	        1333
Yahoo!	    800	        564
YouTube	    821	        817
average	    1033	      923
```

---

# CSS 3 (Custom fonts, animations, box-shadow, etc)

## Неизведанные глубины CSS: метрики шрифта, line-height и vertical-align

[https://css-live.ru/css/metriki-shrifta-line-height-vertical-align.html](https://css-live.ru/css/metriki-shrifta-line-height-vertical-align.html)

Line-height и vertical-align — простые CSS-свойства. Настолько простые, что большинство из нас уверены, что понимают, как они работают и как ими пользоваться. Но это не так. На деле они сложны, может быть, сложнее всех, потому что `у них ведущая роль в создании одной из самых малоизвестных особенностей CSS: строчного (инлайнового) контекста форматирования`.

Например, line-height можно задать в виде длины или безразмерного значения ​1, но по умолчанию у него значение normal — «нормально». Прекрасно, но что значит «нормально»? Часто пишут, что это (по крайней мере, должно быть) 1, или где-то 1.2, даже CSS-спецификация не дает точного ответа. Мы знаем, что безразмерное line-height считается относительно font-size, но загвоздка в том, что font-size: 100px ведет себя по-разному для разных гарнитур, так будет ли line-height всегда одинаковым или разным? Действительно ли оно от 1 до 1.2? А vertical-align, как line-height влияет на него?

### Поговорим сначала о font-size

```html
<p>
  <span class="a">Ba</span>
  <span class="b">Ba</span>
  <span class="c">Ba</span>
</p>
```

```css
p {
  font-size: 100px;
}
.a {
  font-family: Helvetica;
}
.b {
  font-family: Gruppo;
}
.c {
  font-family: Catamaran;
}
```

`Одинаковый font-size с разными гарнитурами дает элементы разной высоты:`

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/font-size.png

Даже если мы в курсе этой особенности, почему font-size: 100px не делает элементы высотой 100px? Я измерил эти значения: Helvetica — 115px, Gruppo — 97px и Catamaran — 164px.

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/font-size-line-height.png

Хотя на первый взгляд это странно, это вполне ожидаемо. `Причина в самом шрифте`. Вот как это работает:

- шрифт задает свои единицы измерения em-квадрата (или UPM, units per em — единиц на кегль), некий контейнер, в котором будут рисоваться все символы. В этом контейнере всё измеряется в относительных единицах и обычно он принимается за 1000 единиц. Но бывает и 1024, и 2048, и сколько угодно.

- на базе этих относительных единиц задаются метрики шрифта: высота верхних выносных элементов (ascender), нижних выносных (descender), заглавных букв (capital height), строчных букв (x-height) и т.п. Заметьте, что некоторые значения могут выступать за рамки em-квадрата.

- в браузере эти относительные единицы масштабируются до заданного font-size.

Возьмем шрифт Catamaran и откроем его в FontForge, чтобы увидеть метрики:

- em-квадрат принят за 1000 единиц

- высота верхних выносных — 1100, а нижних — 540. Судя по нескольким тестам, браузеры используют значения HHead Ascent/Descent на Mac OS и Win Ascent/Descent на Windows (и эти значения могут различаться!). Также видно, что высота заглавных букв (Capital Height) равна 680, а высота строчных (X height) — 485.

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/font-forge-metrics.png

Это значит, что шрифт Catamaran использует 1100 + 540 единиц из em-квадрата в 1000 единиц, что при font-size: 100px дает высоту 164px. `Эта вычисленная высота определяет область содержимого элемента`, так я и буду называть ее всю статью. Можете представлять область содержимого как ту область, к которой применяется свойство background ​2.

Также легко предсказать, что высота заглавных букв будет 68px (680 единиц), а строчных (x-высота) — 49px (485 единиц). Как результат, 1ex = 49px, а 1em = 100px, а не 164px (к счастью, em отсчитывается от font-size, а не от вычисленной высоты)

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/upm-px-equivalent.png

`Высота контейнера строки определяется высотами его потомков`

Каждый HTML-элемент на самом деле представляет собой «стопку» контейнеров строки. Если вы знаете высоту каждого контейнера строки, вы знаете и высоту элемента.

<p>
    Good design will be better.
    <span class="a">Ba</span>
    <span class="b">Ba</span>
    <span class="c">Ba</span>
    We get to make a consequence.
</p>

html сгенерирует 3 контейнера строки:

- в первом и последнем — только по одному анонимному элементу строки (текст)

- во втором — два анонимных элемента строки и 3 <span>-а

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-boxes.png
Элемент <p> (черная рамка) состоит из контейнеров строк (белые рамки), состоящих из строчных элементов (сплошные рамки) и анонимных элементов строки (пунктирные рамки)

Хорошо видно, что второй контейнер строки выше остальных, из-за вычисленной области содержимого его потомков, а точнее — того, что со шрифтом Catamaran.

`Самое сложное в создании контейнера строки то, что мы не можем ни толком это увидеть, ни управлять этим из CSS.`

### line-height: до подводных камней и дальше

Область содержимого и контейнер строки. Высота контейнера строки рассчитывается по высоте его потомков, но это не «высота области содержимого потомков». И в этом большая разница.

`у элемента строки есть две разных высоты: высота области содержимого и высота виртуальной области`

- высота области содержимого определяется метриками шрифта

- `высота виртуальной области — это line-height`, и именно эта высота `используется при расчете высоты контейнера строки`

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height.png
У элементов строки есть две разные высоты

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height-yes-no.png
В CSS line-height — не расстояние между базовыми линиями

Вычисленная разность высот между виртуальной областью и областью содержимого называется «leading», или интерлиньяж.
Половина интерлиньяжа добавляется сверху от области содержимого, вторая половина снизу от нее. `Таким образом, область содержимого всегда будет посередине виртуальной области.`

В зависимости от вычисленного значения, line-height (виртуальная область) может быть равна, выше или ниже области содержимого. Если виртуальная область ниже, то интерлиньяж отрицательный и контейнер строки визуально оказывается ниже собственных потомков.

Есть и другие виды элементов строки:

- замещаемые элементы строки (<img>, <input>, <svg> и т.п.)

- элементы типа inline-block и прочих inline-\*

- строчные элементы, участвующие в особых контекстах форматирования (например, во флекс-контейнере все флекс-элементы «блокифицируются»)

Для этих особых строчных элементов высота рассчитывается по их свойствам height, margin and border. Если у height значение auto, то используется line-height, и высота области содержимого строго равна line-height.

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height-inline-block.png
У замещаемых строчных элементов, элементов типа inline-block/inline-\* и «блокифицированных» строчных элементов высота области содержимого равна их высоте, или line-height.

`line-height: normal будет равна высоте области содержимого, т.е. 1640 единиц или 1.64.`

`Становится очевидно, что указывать line-height: 1 — плохой подход.`

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height-1.png
Из-за line-height: 1 контейнер строки может стать ниже, чем область содержимого

Вообще вычисленная line-height у 1117 шрифтов (Google Web Fonts) колеблется от 0.618 до 3.378.

Немного подробностей о расчете контейнера строки:

- для строчных элементов padding и border увеличивают область фона, но не область содержимого (и не высоту контейнера строки). Так что не всегда область содержимого — то, что видно на экране. А margin-top и margin-bottom ни на что не влияют.

- для замещаемых строчных элементов, элементов типа inline-block и «блокифицированных» строчных элементов: padding, margin и border увеличивают height, а значит, и высоту области содержимого и контейнера строки.

### vertical-align: одно свойство, чтоб править всеми

`vertical-align может играть ведущую роль в строчном контексте форматирования.`

По умолчанию у него значение baseline. Поскольку пропорция между верхней и нижней часть редко бывает 50/50, это иногда приводит к неожиданным результатам, например, с соседними элементами.

Начнем с такого кода:

<p>
    <span>Ba</span>
    <span>Ba</span>
</p>

```css
p {
  font-family: Catamaran;
  font-size: 100px;
  line-height: 200px;
}
```

Тег <p> с двумя соседними <span>-ами, наследующими font-family, font-size и фиксированный line-height. Базовые линии совпадают и высота контейнера строки равна их line-height.

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/vertical-align-baseline.png
Тот же шрифт, та же базовая линия, на вид всё в порядке

Что, если у второго элемента будет меньший font-size?

```css
span:last-child {
  font-size: 50px;
}
```

`из-за выравнивания по базовой линии (по умолчанию) контейнер строки может стать выше (!)`

http://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/vertical-align-baseline-nok.png
Меньший дочерний элемент может привести к большей высоте контейнера строки

...

Выводы

- понять строчный (инлайновый) контекст форматирования нелегко

- у всех строчных элементов 2 высоты
  - область содержимого (основанная на метриках шрифта)
  - виртуальная область (line-height)
  - ни ту, ни другую высоту нельзя однозначно визуализировать (если вы разрабатываете браузерный отладчик и готовы взяться за это — было бы великолепно!)
- line-height: normal основывается на метриках шрифта
- при line-height: n виртуальная область может стать меньше, чем область содержимого
- на vertical-align нельзя особо полагаться
- высота контейнера строки рассчитывается на основе свойств line-height и vertical-align его потомков
- нельзя просто взять и получить/установить метрики шрифта из CSS
- есть в планах спецификация на эту тему, чтобы помочь с вертикальным выравниванием: модуль строчной сетки (Line Grid)

---

## визуал по работе с flexbox

[https://css-live.ru/articles/vizualnoe-rukovodstvo-po-svojstvam-flexbox-iz-css3.html](https://css-live.ru/articles/vizualnoe-rukovodstvo-po-svojstvam-flexbox-iz-css3.html)

---

## Большая статья про гриды (CSS Grid Layout)

[https://css-live.ru/css/bolshaya-statya-pro-gridy-css-grid-layout.html](https://css-live.ru/css/bolshaya-statya-pro-gridy-css-grid-layout.html)

---

## Руководство по Web Animations API — часть 1: создание базовой анимации

[https://css-live.ru/articles/rukovodstvo-po-web-animations-api-chast-1-sozdanie-bazovoj-animacii.html](https://css-live.ru/articles/rukovodstvo-po-web-animations-api-chast-1-sozdanie-bazovoj-animacii.html)

### Создание ключевых кадров анимации

Если вы работали с CSS-переходами и/или анимациями, то это будет вам знакомо.

```js
var player = document.getElementById("toAnimate").animate(
  [
    { transform: "scale(1)", opacity: 1, offset: 0 },
    { transform: "scale(.5)", opacity: 0.5, offset: 0.3 },
    { transform: "scale(.667)", opacity: 0.667, offset: 0.7875 },
    { transform: "scale(.6)", opacity: 0.6, offset: 1 },
  ],
  {
    duration: 700, //миллисекунды
    easing: "ease-in-out", //'linear', кривая Безье, и т.д.
    delay: 10, //миллисекунды
    iterations: Infinity, //или число
    direction: "alternate", //'normal', 'reverse', и т.д.
    fill: "forwards", //'backwards', 'both', 'none', 'auto'
  }
);
```

Сравните с такой же анимацией на CSS:

```css
@keyframes emphasis {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  30% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  78.75% {
    transform: scale(0.667);
    opacity: 0.667;
  }
  100% {
    transform: scale(0.6);
    opacity: 0.6;
  }
}
#toAnimate {
  animation: emphasis 700ms ease-in-out 10ms infinite alternate forwards;
}
```

---

## Руководство по Web Animations API — Часть 2: Объект AnimationPlayer и управление временной шкалой

[https://css-live.ru/articles/rukovodstvo-po-web-animations-api-chast-2-animationplayer-i-upravlenie-vremennoj-shkaloj.html](https://css-live.ru/articles/rukovodstvo-po-web-animations-api-chast-2-animationplayer-i-upravlenie-vremennoj-shkaloj.html)

### Состояния проигрывания AnimationPlayer и управление им

```js
var player = element.animate(/* ... */);
console.log(player.playState); //"running"

player.pause(); //"paused"
player.play(); //"running"
player.cancel(); //"idle"... перейти к исходному состоянию
player.finish(); //"finished"... перейти к конечному состоянию
```

### Скорость воспроизведения

```js
var player = element.animate(/* ... */);
console.log(player.playbackRate); //1

player.playbackRate = 2; ////двойная скорость. Для замедления скорости можно также применять десятичные дроби.
```

### Шкала времени

currentTime возвращает текущее положение анимации в миллисекундах. Максимальное значение вычисляется по формуле «задержка + (продолжительность \* число итераций)», поэтому при бесконечных итерациях не бывает максимального значения.

```js
var player = element.animate([{ opacity: 1 }, { opacity: 0 }], {
  duration: 1000,
  delay: 500,
  iterations: 3,
});

player.onfinish = function () {
  console.log(player.currentTime); // 3500
};
```

### Ещё одна опция: reverse()

Можно также обратить анимацию с помощью reverse(), который будет очень похож на play() (в частности, у него будет тот же самый playState), за исключением того, что с ним анимация проходит шкалу времени в обратном направлении. После завершения анимации currentTime будет равен 0.

---

# Optimization

## CSSO

[https://2016.holyjs-piter.ru//talks/dvornov.html](https://2016.holyjs-piter.ru//talks/dvornov.html)

ccso самый быстрый на момент 2016 года
(сравнение с clean-css и css-nano)

### Минификатор (работа)

css -> минификатор -> сжатый css

минификатор = парсер -> AST -> Компрессор -> AST -> Транслятор

Основные шаги
Токенизация
Построение дерева (лексер)

Делаем код быстрее

- charAt() -> charCodeAt()
- Избегайте лишних операций со строками
- Контролируйте выход за пределы
- Уменьшайте количесвто сравнений

call быстрее чем apply ? (скорее всего из-за оптимизации);

---

## CSS performance optimization

[https://developer.mozilla.org/en-US/docs/Learn/Performance/CSS_performance](https://developer.mozilla.org/en-US/docs/Learn/Performance/CSS_performance)

CSS is render blocking

### Optimizing for render blocking

```html
<link rel="stylesheet" href="styles.css" />
<!-- blocking -->
<link rel="stylesheet" href="print.css" media="print" />
<!-- not blocking -->
<link
  rel="stylesheet"
  href="mobile.css"
  media="screen and (max-width: 480px)"
/>
<!-- not blocking on large screens -->
```

### Animating on the GPU

To improve performance, the node being animated can be moved off the main thread and onto the GPU

Properties that will lead to compositing include 3D transforms (`transform:` `translateZ()`, `rotate3d()`, etc.), animating transform and `opacity`, `position: fixed`, `will-change`, and `filter`. Some elements, including <video>, <canvas> and <iframe>, are also on their own layer.

### will-change property

The CSS will-change property tells browsers which properties of an element are expected to change enabling browsers to set up optimizations before the element is actually changed, improving performance by doing potentially expensive work before it is required.

```css
will-change: opacity, transform;
```

### The font-display property

his improves performance by making the text visible instead of having a blank screen, with a trade-off being a flash of unstyled text.

```css
@font-face {
  font-family: someFont;
  src: url(/path/to/fonts/someFont.woff) format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: fallback;
}
```

### The contain property

The contain CSS property allows an author to indicate that an element and its contents are, as much as possible, independent of the rest of the document tree. This allows the browser to recalculate layout, style, paint, size, or any combination of them for a limited area of the DOM and not the entire page.

```css
contain: none | strict | content | [ size || layout || style || paint ];
```

---

## Optimizing HTML/CSS performance and cleaner code

[https://medium.com/@divyanshu013/optimizing-html-css-performance-and-cleaner-code-606a403d0c14](https://medium.com/@divyanshu013/optimizing-html-css-performance-and-cleaner-code-606a403d0c14)

### HTML

- Keep styles separate from HTML, better to use CSS for styling instead of increasing the complexity of HTML

- Also keep the CSS and JS files separate from HTML instead of embedding within the HTML. It’s better to minify and add them during the build process (think Webpack)

- Put JS <script></script> at the end of the page to increase page load speed. This allows the browser to render the page before executing the JS

- There is really no need to add type="text/javascript" or charset="UTF-8" attributes to your <script></script>

- It might be a good idea to use some validation tool to run your HTML through such as some good HTML linter

- HTML comments <!-- --> is not really necessary. A markup language such as HTML should itself clearly define the markup of the page. Adding comments will just increase page size. Comments in your CSS and JS are helpful because they can explain the logic or the intent in one line for reference

- Use gzip for compressing your HTML code. This means that the browser has to uncompress it before rendering however, this is insignificant when compared to downloading a larger sized file. Using gzip on a node server is pretty simple by using a specific module such as compression [https://github.com/expressjs/compression]

- It might look like doing away with <!doctype html> can save a line of code. However, removing the doctype will trigger quirks mode and cause the browser to render in backward compatibility mode instead. Some features might not work as expected

- Images may comprise a majority of page size if used and it’s very essential to use them in optimal quality. Alternatively if high quality images are required then lazy loading with your JS is a good idea

### CSS

- Minifying CSS would help a lot in decreasing the size of your stylesheet and generally your build tool should be doing this for production builds

- Put your CSS at the top of your HTML page, such as the <head></head> so that your webpage gets loaded better

- Use a tool such as autoprefixer to generate vendor specific CSS. Instead of running this tool everytime you make a change to your CSS, it’s a better idea to include autoprefixer in your build process to generate a production ready stylesheet

- Bundling your stylesheets instead of having many stylesheets can be better for performance especially for single page apps (SPAs)

- Use a content delivery network (CDN) for caching and faster loading

- This [https://css-tricks.com/efficiently-rendering-css/] article on CSS-Tricks is great for checking which selectors are more expensive for the browsers. Some key take-aways are:

### P.S.

- Browsers read CSS selectors from right to left

- IDs (#something) are the most efficient and universal is the least (\*)

- Descendant selectors are very expensive for performance. Use classes or IDs instead

---

# Browsers compabilites

## A Guide To CSS Support In Browsers

[https://www.smashingmagazine.com/2019/02/css-browser-support/](https://www.smashingmagazine.com/2019/02/css-browser-support/)

Test For No Support

```css
@supports not (display: grid) {
  .item {
    /* CSS from browsers which do not support grid layout */
  }
}
```

Test For Multiple Things

```css
@supports (display: grid) and (shape-outside: circle()) {
  .item {
    /* CSS from browsers which support grid and CSS shapes */
  }
}
```

If you need support of one property or another, use or.

```css
@supports (display: grid) or (display: flex) {
  .item {
    /* CSS from browsers which support grid or flexbox */
  }
}
```

Picking A Property And Value To Test For

```css
.grid > .item {
  width: 23%;
  margin: 0 1%;
}

@supports (display: grid) {
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 1%;
  }

  .grid > .item {
    width: auto;
    margin: 0;
  }
}
```

Partial Support Of CSS Properties

```css
@supports (column-gap: 20px) {
  .flex {
    margin: 0; /* almost everything supports column-gap so this will always remove the margins, even if we do not have gap support in flexbox. */
  }
}
```

Testing For Selector Support

```css
@supports selector(: has) {
  .item {
    /* CSS for support of :has */
  }
}
```

---

## Dealing with Cross Browser Compatibility

[https://www.youtube.com/watch?v=9tEixRJ3GeI](https://www.youtube.com/watch?v=9tEixRJ3GeI)

use normalize for fix - browsers render same different

check:
caniuse
mdn

use postcss-preset-env to use next css now

---

## autoprefixer

[https://github.com/postcss/autoprefixer](https://github.com/postcss/autoprefixer)

PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use. It is recommended by Google and used in Twitter and Alibaba.

Write your CSS rules without vendor prefixes (in fact, forget about them entirely):

```css
::placeholder {
  color: gray;
}

.image {
  background-image: url(image@1x.png);
}
@media (min-resolution: 2dppx) {
  .image {
    background-image: url(image@2x.png);
  }
}
```

Autoprefixer will use the data based on current browser popularity and property support to apply prefixes for you. You can try the interactive demo of Autoprefixer.

```css
::-webkit-input-placeholder {
  color: gray;
}
::-moz-placeholder {
  color: gray;
}
:-ms-input-placeholder {
  color: gray;
}
::-ms-input-placeholder {
  color: gray;
}
::placeholder {
  color: gray;
}

.image {
  background-image: url(image@1x.png);
}
@media (-webkit-min-device-pixel-ratio: 2),
  (-o-min-device-pixel-ratio: 2/1),
  (min-resolution: 2dppx) {
  .image {
    background-image: url(image@2x.png);
  }
}
```

---

## CSS Remedy

[https://css-tricks.com/css-remedy/](https://css-tricks.com/css-remedy/)

reset -> normalize -> css-remedy
[https://github.com/jensimmons/cssremedy]

Sets CSS properties or values to what they would be if the CSSWG were creating the CSS today, from scratch, and didn’t have to worry about backwards compatibility.

---

# Common knowledge

## Модульный CSS

[https://www.youtube.com/watch?v=vYmSYsj-s5w&list=PL8sJahqnzh8IDythQu3ZJPqnvuSXQF8MV&index=13](https://www.youtube.com/watch?v=vYmSYsj-s5w&list=PL8sJahqnzh8IDythQu3ZJPqnvuSXQF8MV&index=13)

Button.js

```js
const Button = ({ children, disabled, primary }) => {
  let classNames = "btn";
  if (disabled) classNames += " btn--disabled";
  if (primary) classNames += ' btn--primary";

  return (
    <button type="button" disabled={disabled} className={classNames}>
      <span className="label">
        {children}
      </span>
    </button>
  )
};
```

<Button>Default</Button>
<Button disabled>Disabled</Button>
<Button primary>Primary</Button>

Split code & co-locate
Button.js + Button.css

BEM

```js
import './Button.css'
const Button = ({ children, disabled, primary }) => {
  let classNames = "Button";
  if (disabled) classNames += " Button--disabled";
  if (primary) classNames += ' Button--primary";

  return (
    <button type="button" disabled={disabled} className={classNames}>
      <span className='Button__label'>
        {children}
      </span>
    </button>
  )
};
```

CSS-MODULES

```js
import styles from './Button.css'

const Button = ({ children, disabled, primary }) => {
  let classNames = {styles.root};
  if (disabled) classNames = {styles.disabled};
  if (primary) classNames = {styles.primary};

  return (
    <button type="button" disabled={disabled} className={classNames}>
      <span className={styles.label}>
        {children}
      </span>
    </button>
  )
};
```

BEM for free
@value
composes
:global

work on server too

postcss like babel for css
autoprefixer

---

## Common CSS Flexbox Layout Patterns with Example Code

[https://tobiasahlin.com/blog/common-flexbox-patterns/](https://tobiasahlin.com/blog/common-flexbox-patterns/)

Every example assumes that your HTML contains an element with a class of container which then contains several children that all have a class of item (the number of children varies per example):

```html
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
  ...
</div>
```

### Stretch all, fixed spacing

```css
.container {
  display: flex;
}

.item {
  flex-grow: 1;
  height: 100px;
}

.item + .item {
  margin-left: 2%;
}
```

We use a + selector to only add gaps between pairs of items (essentially just skipping the left margin for the first item in the list).

### Stretch middle, fixed spacing

```css
.container {
  display: flex;
}

.item {
  height: 100px;
  width: 100px; /* A fixed width as the default */
}

.item-center {
  flex-grow: 1; /* Set the middle element to grow and stretch */
}

.item + .item {
  margin-left: 2%;
}
```

### Alternating grid

- Set flex-wrap: wrap on the container (or all items would be rendered on a single row)

- Set justify-content: space-between on the container, to only create space between the elements (and not between the edge of the parent element and items)

- Set every item’s width to 49% (or something similar that is equal to or less than 50%)

- Set every third item’s width to 100% so that it fills that entire row. We can target every third item in the list with the nth-child() selector.

```css
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: 48%;
  height: 100px;
  margin-bottom: 2%;
}

.item:nth-child(3n) {
  width: 100%;
}
```

### 3x3 grid

```css
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  flex: 0 32%;
  height: 100px;
  margin-bottom: 2%; /* (100-32*3)/2 */
}
```

### 3x3 grid, constrained proportions (1:1)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: 32%;
  padding-bottom: 32%; /* Same as width, sets height */
  margin-bottom: 2%; /* (100-32*3)/2 */
  position: relative;
}
```

### 3x3 grid, constrained proportions (16:9)

```css
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.item {
  width: 32%;
  padding-bottom: 18%; /* 32:18, i.e. 16:9 */
  margin-bottom: 2%; /* (100-32*3)/2 */
}
```

### Graph: vertical bars

```css
.container {
  display: flex;
  height: 300px;
  justify-content: space-between;
  align-items: flex-end;
}

.item {
  width: 14%;
}
.item-1 {
  height: 40%;
}
.item-2 {
  height: 50%;
}
.item-3 {
  height: 60%;
}
.item-4 {
  height: 20%;
}
.item-5 {
  height: 30%;
}
```

### Graph: horizontal bars

```css
.container {
  display: flex;
  height: 300px;
  justify-content: space-between;
  flex-direction: column;
}

.item {
  height: 14%;
}
.item-1 {
  width: 40%;
}
.item-2 {
  width: 50%;
}
.item-3 {
  width: 60%;
}
.item-4 {
  width: 20%;
}
.item-5 {
  width: 30%;
}
```

### Vertical stack (centered)

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item {
  height: 40px;
  margin-bottom: 10px;
}
```

### Masonry (or mosaic)

```css
/* Re-order items into rows */
.item:nth-child(3n + 1) {
  order: 1;
}
.item:nth-child(3n + 2) {
  order: 2;
}
.item:nth-child(3n) {
  order: 3;
}

/* Force new columns */
.container::before,
.container::after {
  content: "";
  flex-basis: 100%;
  width: 0;
  order: 2;
}
```

```css
.container {
  display: flex;
  flex-flow: column wrap;
  align-content: space-between;
  height: 580px;
}

.item {
  width: 32%;
  margin-bottom: 2%; /* (100-32*3)/2 */
}

/* Re-order items into rows */
.item:nth-child(3n + 1) {
  order: 1;
}
.item:nth-child(3n + 2) {
  order: 2;
}
.item:nth-child(3n) {
  order: 3;
}

/* Force new columns */
.container::before,
.container::after {
  content: "";
  flex-basis: 100%;
  width: 0;
  order: 2;
}
```

---

## Patterns for Practical CSS Custom Properties Use

[https://css-tricks.com/patterns-for-practical-css-custom-properties-use/](https://css-tricks.com/patterns-for-practical-css-custom-properties-use/)

- Variables. The basics, such as setting, a brand color to use wherever needed.

- Default Values. For example, a default border-radius that can be overridden later.

- Cascading Values. Using clues based on specificity, such as user preferences.

- Scoped Rulesets. Intentional variations on individual elements, like links and buttons.

- Mixins. Rulesets intended to bring their values to a new context.

- Inline Properties. Values passed in from inline styles in our HTML.

### Pattern 1: Variables

```css
html {
  --brand-color: hsl(230, 80%, 60%);
}

.logo {
  fill: pink; /* fallback */
  fill: var(--brand-color);
}
```

### Pattern 2: Default values

```css
.button {
  /* --roundness: 2px; */
  border-radius: var(--roundness, 10px);
}
```

### Pattern 3: Cascading values

User-based themes

```css
.message {
  background-color: var(--student-background, #fff);
  color: var(--student-color, #000);
  font-family: var(--student-font, "Times New Roman", serif);
  margin-bottom: 10px;
  padding: 10px;
}

[data-student-theme="rachel"] {
  --student-background: rgb(43, 25, 61);
  --student-color: rgb(252, 249, 249);
  --student-font: Arial, sans-serif;
}

[data-student-theme="jen"] {
  --student-background: #d55349;
  --student-color: #000;
  --student-font: Avenir, Helvetica, sans-serif;
}

[data-student-theme="tyler"] {
  --student-background: blue;
  --student-color: yellow;
  --student-font: "Comic Sans MS", "Comic Sans", cursive;
}
```

```html
<section>
  <div data-student-theme="chris">
    <p class="message">
      Chris: I've spoken at events and given workshops all over the world at
      conferences.
    </p>
  </div>
  <div data-student-theme="rachel">
    <p class="message">
      Rachel: I prefer email over other forms of communication.
    </p>
  </div>
  <div data-student-theme="jen">
    <p class="message">
      Jen: This is why I immediately set up my new team with Slack for real-time
      chat.
    </p>
  </div>
  <div data-student-theme="tyler">
    <p class="message">
      Tyler: I miss AIM and MySpace, but this message board is okay.
    </p>
  </div>
</section>
```

```css
.readable-theme [data-student-theme] {
  --student-background: hsl(50, 50%, 90%);
  --student-color: hsl(200, 50%, 10%);
  --student-font: Verdana, Geneva, sans-serif;
}
```

```html
<section class="readable-theme">
  ...
</section>
```

### Pattern 4: Scoped rulesets

```css
a {
  --link: hsl(230, 60%, 50%);
  --link-visited: hsl(290, 60%, 50%);
  --link-hover: hsl(230, 80%, 60%);
  --link-active: hsl(350, 60%, 50%);
}

a:link {
  color: var(--link);
}

a:visited {
  color: var(--link-visited);
}

a:hover {
  color: var(--link-hover);
}

a:active {
  color: var(--link-active);
}
```

```html
<a href="#">Link Example</a>
```

Example: Grayscale link

```css
.grayscale {
  --link: LightSlateGrey;
  --link-visited: Silver;
  --link-hover: DimGray;
  --link-active: LightSteelBlue;
}
```

```html
<a href="#" class="grayscale">Link Example</a>
```

Example: Custom links

```css
.custom-link {
  --hue: 30;
  --link: hsl(var(--hue), 60%, 50%);
  --link-visited: hsl(calc(var(--hue) + 60), 60%, 50%);
  --link-hover: hsl(var(--hue), 80%, 60%);
  --link-active: hsl(calc(var(--hue) + 120), 60%, 50%);
}

.danger {
  --hue: 350;
}
```

```html
<a href="#" class="custom-link">Link Example</a>
<a href="#" class="custom-link danger">Link Example</a>
```

### Pattern 5: Mixins

Example: Baseline grid foundation

```css
.baseline,
.baseline * {
  --rhythm: 2rem;
  --line-height: var(--sub-rhythm, var(--rhythm));
  --line-height-ratio: 1.4;
  --font-size: calc(var(--line-height) / var(--line-height-ratio));
}

.baseline {
  font-size: var(--font-size);
  line-height: var(--line-height);
}
```

```css
.baseline h2,
.baseline p,
.baseline ul {
  padding: 0 var(--rhythm);
  margin: 0 0 var(--rhythm);
}

.baseline p {
  --line-height-ratio: 1.2;
}

.baseline h2 {
  --sub-rhythm: calc(3 * var(--rhythm));
  --line-height-ratio: 1;
}

.baseline p,
.baseline h2 {
  font-size: var(--font-size);
  line-height: var(--line-height);
}

.baseline ul {
  margin-left: var(--rhythm);
}
```

```html
<section class="baseline">
  <h2>A Tiny Webpage</h2>
  <p>This is the tiniest webpage. It has three noteworthy features:</p>
  <ul>
    <li>Tiny</li>
    <li>Exemplary</li>
    <li>Identifies as Hufflepuff</li>
  </ul>
</section>
```

### Pattern 6: Inline properties

```css
.grid {
  --columns: auto-fit;

  display: grid;
  gap: 10px;
  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
}
```

```html
<div class="grid">
  <img src="https://www.fillmurray.com/900/600" alt="Bill Murray" />
  <img src="https://www.placecage.com/900/600" alt="Nic Cage" />
  <img src="https://www.placecage.com/g/900/600" alt="Nic Cage gray" />
  <img src="https://www.fillmurray.com/g/900/600" alt="Bill Murray gray" />
  <img src="https://www.placecage.com/c/900/600" alt="Nic Cage crazy" />
  <img src="https://www.placecage.com/gif/900/600" alt="Nic Cage gif" />
</div>
```

```html
<div class="grid" style="--columns: 3;">
  ...
</div>
```

---

## «Запашки» CSS-кода

[https://css-live.ru/articles/zapashki-css-koda.html](https://css-live.ru/articles/zapashki-css-koda.html)

### «Запашок» кода №1: одно то, что вы пишете CSS, уже говорит об этом

В большой команде, вероятно, уже есть коллекция инструментов и систем для создания всяких кнопок или стилей, чтобы двигать элементы туда-сюда по макету, поэтому уже сам факт, что вы собираетесь писать CSS — возможно, плохая идея. Если вы собрались писать свой CSS для конкретного граничного случая, остановитесь! Скорее всего вам следует делать что-из этого:

- Изучите работу текущей системы и её ограничения, и придерживайтесь их.

- Переосмыслите базовую инфаструктуру CSS

https://css-live.ru/wp-content/uploads/2017/11/fix-500x327.jpg

### «Запашок» кода №2: имена файлов

Скажем, для вашего приложения понадобилась страница поддержки. Первым делом вы, вероятно, создадите CSS-файл «support.scss» и начнёте писать код вроде этого:

```css
.support {
  background-color: #efefef;
  max-width: 600px;
  border: 2px solid #bbb;
}
```

Итак, проблема тут скорее не в стилях, а в первую очередь в самой идее «страницы поддержки». При написании CSS нужно мыслить гораздо шире: в шаблонах или компонентах, а не в конкретном контенте, который пользователь увидит на странице. Таким образом можно заново переиспользовать что-то вроде «card» на каждой странице, включая и этот экземпляр для страницы поддержки.

```css
.card {
  background-color: #efefef;
  max-width: 600px;
  border: 2px solid #bbb;
}
```

Уже немного лучше! (Моим следующим вопросом мог быть «Что такое карточка, что может быть внутри неё, когда не стоит использовать карточку, и так далее, и тому подобное») — такие вопросы, вероятно, возникают из-за проблем в дизайне, и помогут вам сосредоточиться на них.

### «Запашок» кода №3: стилизация HTML-элементов

По опыту скажу, что, стилизация HTML-элементов (вроде <section> или <p>) — это почти всегда какой-нибудь хак. Есть только один случай, где стилизация HTML-элементов уместна:

```css
section {
  display: block;
}
figure {
  margin-bottom: 20px;
}
```

И это в так называемом глобальном «сбросе стилей» приложения. Иначе код становится хрупким и сложным в поддержке, поскольку нам абсолютно не ясно, являются ли эти стили хаком для конкретной цели или это стили по умолчанию для этого элемента.

### «Запашок» кода №4: вложенность кода

Вложенность кода Sass, в случае, когда дочерние компоненты находятся в родительском элементе — практически всегда код с «запашком» и верный признак того, что этот дизайн требует рефакторинга. Вот пример:

```css
.card {
  display: flex;

  .header {
    font-size: 21px;
  }
}
```

Здесь мы говорим, что класс .header можно использовать только внутри .card? Или это переопределение ещё одного блока CSS в еще каком-то месте нашего кода? Сам факт возникновения такого вопроса указывает на главную проблему здесь: теперь насчёт этого кода есть сомнения. Для понимания работы этого кода приходится знать и другие его части. И если возник вопрос, откуда взялся и как работает этот код, то вероятно он слишком сложный или поддерживать его в будущем станет невозможно.

Это ведёт к пятому пункту кода с «запашком»…

### «Запашок» кода №5: переопределение CSS

В идеальном мире мы сначала задаём дефолтные стили для всех элементов в CSS-файле сброса, а затем используем отдельные CSS-файлы для каждой кнопки, поля формы и компонента в нашем приложении. Код не должен переопределяться каскадом более одного раза. Во-первых, так общий код становится более предсказуемым, а во-вторых, это делает код компонента (к примеру, button.scss) крайне читабельным. Теперь, чтобы пофиксить что-либо, нужно открыть единственный файл и все изменения применятся ко всему приложению одним махом. В случае с CSS, предсказуемость — это всё.

В той же CSS-утопии мы бы ещё наверняка приняли меры, чтобы некоторые классы в принципе нельзя было переопределить, с помощью чего-то вроде CSS-модулей. Так мы застраховались бы даже от случайных ошибок.

### «Запашок» кода №6: CSS-файлы с 50 и более строками кода

Чем больше вы пишете CSS, тем сложнее и хрупче становится код. Поэтому, как только я вижу около 50 строк CSS, я стараюсь переосмыслить то, что разрабатываю, задав себе пару вопросов. Начало и конец которых: «Это один компонент или его можно разбить на отдельные части, работающие независимо друг от друга?»

Это сложный и трудоёмкий процесс, требующий бесконечной практики, но только так можно добиться надежного кода и научиться писать действительно хороший CSS.

---

## Математика CSS-шлюзов

[https://css-live.ru/articles/matematika-css-shlyuzov.html](https://css-live.ru/articles/matematika-css-shlyuzov.html)

CSS-шлюз — приём в отзывчивом дизайне, позволяющий сделать плавный переход между двумя значениями, в зависимости от текущего размера окна браузера, вместо резкого «перескока» с одного значения на другое.

```css
h1 {
  font-size: 4vw; /* Бац! Готово. */
}
```

У этого было два недостатка:

- Текст становится совсем мелким на маленьких экранах (12.8 пикселей при 320px) и очень крупным на больших (64px при 1600px);

- Он не реагирует на пользовательские настройки для размера шрифта.

Техники CSS-шлюзов призваны исправить первый пункт. Отличные техники CSS-шлюзов стараются исправить и второй: учет пользовательских предпочтений.

«Пусть у нас font-size будет 20px при 320px и меньше, 40px при 960px и выше, а в промежутке его значение меняется от 20px до 40px».

```css
h1 {
  font-size: 1.25rem;
}

@media (min-width: 320px) {
  h1 {
    font-size: /* магическое значение от 1.25rem  до 2.5rem */ ;
  }
}

@media (min-width: 960px) {
  h1 {
    font-size: 2.5rem;
  }
}
```

```css
h1 {
  font-size: calc(1.25rem + значение_относительно_окна);
}
```

`Они работают только для числовых значений, могут использовать calc() и принимают значения в пикселях.`

Несколько примеров того, что работать не будет:

- CSS-шлюз для свойства opacity, потому что opacity: calc(.5+1px) — это ошибка;

- CSS-шлюз для большинства функций transform (напр., rotate: нельзя повернуть что-либо на столько-то пикселей)

### CSS-шлюзы с контрольными точками в пикселях

Полное приращение font-size равно 20px (40 — 20).
Полное приращение ширины окна равно 640px (960 — 320).
Если ширину окна увеличить всего на 1px, на какую величину увеличится font-size? На 20 / 640 = 0.03125px.

```css
h1 {
  font-size: 20px;
}

@media (min-width: 320px) {
  h1 {
    font-size: calc(3.125vw + 10px);
  }
}

@media (min-width: 960px) {
  h1 {
    font-size: 40px;
  }
}
```

### Учитываем пользовательские предпочтения

Практически в любом браузере пользователь может выбрать более мелкий или более крупный текст по умолчанию. Типичное значение по умолчанию — 16px, но пользователи могут поменять его на что угодно (как правило, на более крупный шрифт).

```css
h1 {
  font-size: 1.25rem;
}

@media (min-width: 320px) {
  h1 {
    font-size: calc(1.25rem + 3.125vw - 10px);
  }
}

@media (min-width: 960px) {
  h1 {
    font-size: calc(1.25rem + 20px);
  }
}
```

### Делаем шлюз для line-height

Допустим, у наших абзацев font-size по умолчанию, т.е., скорее всего, 16px. Опорные точки у нас такие:

16 _ 1.4 = 22.4 пикселя в нижней контрольной точке (320px)
16 _ 1.8 = 28.8 пикселя в верхней контрольной точке (960px)

```css
p {
  line-height: 140%;
}
.big {
  font-size: 166%;
}

@media (min-width: 320px) {
  p {
    line-height: calc(140% + 1vw - 3.2px);
  }
  .big {
    line-height: calc(140% + (1vw - 3.2px) * 1.66);
  }
}
@media (min-width: 960px) {
  p {
    line-height: calc(140% + 6.4px);
  }
  .big {
    line-height: calc(140% + 6.4px * 1.66);
  }
}
```

### Объединяем шлюзы для font-size и line-height

```
Элемент и свойство	Значение при 320px	Значение при 960px
H1 font-size	24px	40px
H1 line-height	133.33%	120%
P font-size	15px	18px
P line-height	150%	166.67%
```

Теперь давайте выберем две контрольные точки. Я снова возьму 320px и 960px, ура. Начнем с того, что запишем шлюзы для font-size:

```css
h1 {
  font-size: 1.5rem;
}
/* .9375rem = 15px при настройках по умолачнию */
p {
  font-size: 0.9375rem;
}

@media (min-width: 320px) {
  h1 {
    font-size: calc(1.5rem + 2.5vw - 8px);
  }
  /* .46875vw - 1.5px дает значение от 0 to 3px */
  p {
    font-size: calc(0.9375rem + 0.46875vw - 1.5px);
  }
}
@media (min-width: 960px) {
  h1 {
    font-size: calc(1.5rem + 16px);
  }
  p {
    font-size: calc(0.9375rem + 3px);
  }
}
```

### Автоматизируем расчеты

Первое, что приходит на ум — перенести все расчеты в CSS. Вот вариант формулы, которую мы использовали в примере для font-size, в котором все значения выписаны в явном виде:

```css
@media (min-width: 320px) and (max-width: 959px) {
  h1 {
    font-size: calc(
      /* y1 */ 1.5rem /* + m × x */ + ((40 - 24) / (960 - 320)) * 100vw /* - m × x1 */ -
        ((40 - 24) / (960 - 320)) * 320px
    );
  }
}
```

Это как-то длинновато, можно сократить до такого:

```css
@media (min-width: 320px) and (max-width: 959px) {
  h1 {
    font-size: calc(1.5rem + 16 * (100vw - 320px) / (960 - 320));
  }
}
```

Это подходит и для сочетания font-size и line-height, но может быть не так интуитивно, особенно с убывающей функцией.

```css
@media (min-width: 320px) and (max-width: 959px) {
  h1 {
    font-size: calc(1.5rem + 16 * (100vw - 320px) / (960 - 320));
    /* для функции с отрицательным наклоном нужно поменять местами контрольные точки */
    line-height: calc(120% + 3.2 * (100vw - 960px) / (320 - 960));
  }
}
```

### em

```css
@media (min-width: 20em) and (max-width: 60em) {
  h1 {
    /* Внимание: это ещё не работает! */
    font-size: calc(
      1.25rem /* базовое значение */ + 20px
        /* разница между максимальным значением и базовым */ * (100vw - 20rem)
        /* x - x1 */ / (60rem - 20rem) /* x2 - x1 */
    );
  }
}
```

```css
h1 {
  line-height: calc(120% + 0.2 * 1rem);
}
@media (min-width: 20em) {
  h1 {
    line-height: calc(120% + 0.2 * (100vw - 60rem) / (20 - 60));
  }
}
@media (min-width: 60em) {
  h1 {
    line-height: 120%;
  }
}
```
