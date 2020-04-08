# HTML

# Html elements

## html

[https://guide.freecodecamp.org/html/](https://guide.freecodecamp.org/html/)

A simple example of HTML Document

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
  </head>
  <body>
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
```

!DOCTYPE html: Defines this document to be HTML5

html: The root element of an HTML page

head: The element contains meta information about the document

title: The element specifies a title for the document

body: The element contains the visible page content

h1: The element defines a large heading

p: The element defines a paragraph

HTML Versions
Since the early days of the web, there have been many versions of HTML

```
Version     Year
HTML        1991
HTML 2.0    1995
HTML 3.2    1997
HTML 4.01   1999
XHTML       2000
HTML5       2014
```

---

## HTML Interview Questions

[https://www.javatpoint.com/html-interview-questions](https://www.javatpoint.com/html-interview-questions)

A list of top frequently asked HTML interview questions and HTML5 interview questions and answers are given below.

1. What is HTML?

HTML stands for Hyper Text Markup Language. It is a language of World Wide Web. It is a standard text formatting language which is used to create and display pages on the Web. It makes the text more interactive and dynamic. It can turn text into images, tables, links.

2. What are Tags?

HTML tags are composed of three things: an opening tag, content and ending tag. Some tags are unclosed tags.

HTML documents contain two things:

content, and
tags
When a web browser reads an HTML document, the browser reads it from top to bottom and left to right. HTML tags are used to create HTML documents and render their properties. Each HTML tags have different properties.

Syntax

```html
<tag> content </tag>
```

Content is placed between tags to display data on the web page.

3. Do all HTML tags have an end tag?

No. There are some HTML tags that don't need a closing tag. For example: <image> tag, <br> tag.

4. What is formatting in HTML?

The HTML formatting is a process of format the text for a better look and feel. It uses different tags to make text bold, italicized, underlined.

5. How many types of heading does an HTML contain?

The HTML contains six types of headings which are defined with the <h1> to <h6> tags. Each type of heading tag displays different text size from another. So, <h1> is the largest heading tag and <h6> is the smallest one. For example:

<h1>Heading no. 1</h1>    
<h2>Heading no. 2</h2>    
<h3>Heading no. 3</h3>    
<h4>Heading no. 4</h4>    
<h5>Heading no. 5</h5>    
<h6>Heading no. 6</h6>

6. How to create a hyperlink in HTML?

The HTML provides an anchor tag to create a hyperlink that links one page to another page. These tags can appear in any of the following ways:

Unvisited link - It is displayed, underlined and blue.
Visited link - It is displayed, underlined and purple.
Active link - It is displayed, underlined and red.

7. Which HTML tag is used to display the data in the tabular form?

The HTML table tag is used to display data in tabular form (row \* column). It also manages the layout of the page, e.g., header section, navigation bar, body content, footer section. Here is the list of tags used while displaying the data in the tabular form:

Tag Description

<table>	It defines a table.
<tr>	It defines a row in a table.
<th>	It defines a header cell in a table.
<td>	It defines a cell in a table.
<caption>	It defines the table caption.
<colgroup>	It specifies a group of one or more columns in a table for formatting.
<col>	It is used with <colgroup> element to specify column properties for each column.
<tbody>	It is used to group the body content in a table.
<thead>	It is used to group the header content in a table.
<tfooter>	It is used to group the footer content in a table.

8. What are some common lists that are used when designing a page?

There are many common lists which are used to design a page. You can choose any or a combination of the following list types:

Ordered list - The ordered list displays elements in numbered format. It is represented by <ol> tag.
Unordered list - The unordered list displays elements in bulleted format. It is represented by <ul> tag.
Definition list - The definition list displays elements in definition form like in dictionary. The <dl>, <dt> and <dd> tags are used to define description list.

9. What is the difference between HTML elements and tags?

HTML elements communicate to the browser to render text. When the elements are enclosed by brackets <>, they form HTML tags. Most of the time, tags come in a pair and surround content.

10. What is semantic HTML?

Semantic HTML is a coding style. It is the use of HTML markup to reinforce the semantics or meaning of the content. For example: In semantic HTML <b> </b> tag is not used for bold statement as well as <i> </i> tag is used for italic. Instead of these we use <strong></strong> and <em></em> tags.

11. What is an image map?

Image map facilitates you to link many different web pages using a single image. It is represented by <map> tag. You can define shapes in images that you want to make part of an image mapping.

12. How to insert a copyright symbol on a browser page?

You can insert a copyright symbol by using &copy; or &#169; in an HTML file.

13. How to create a nested webpage in HTML?

The HTML iframe tag is used to display a nested webpage. In other words, it represents a webpage within a webpage. The HTML <iframe> tag defines an inline frame. For example:

```html
<!DOCTYPE html>
<html>
  <body>
    <h2>HTML Iframes example</h2>
    <p>
      Use the height and width attributes to specify the size of the iframe:
    </p>
    <iframe src="https://www.javatpoint.com/" height="300" width="400"></iframe>
  </body>
</html>
```

14. How do you keep list elements straight in an HTML file?

You can keep the list elements straight by using indents.

15. Does a hyperlink only apply to text?

No, you can use hyperlinks on text and images both. The HTML anchor tag defines a hyperlink that links one page to another page. The "href" attribute is the most important attribute of the HTML anchor tag.

Syntax

```html
<a href="..........."> Link Text </a>
```

16. What is a style sheet?

A style sheet is used to build a consistent, transportable, and well-designed style template. You can add these templates on several different web pages. It describes the look and formatting of a document written in markup language.

17. Can you create a multi-colored text on a web page?

Yes. To create a multicolor text on a web page you can use <font color ="color"> </font> for the specific texts you want to color.

18. Is it possible to change the color of the bullet?

The color of the bullet is always the color of the first text of the list. So, if you want to change the color of the bullet, you must change the color of the text.

19. Explain the layout of HTML?

HTML layout specifies a way in which the web page is arranged.

https://static.javatpoint.com/htmlpages/images/html-layouts.png

Every website has a specific layout to display content in a specific manner.

Following are different HTML5 elements which are used to define the different parts of a webpage.

<header>: It is used to define a header for a document or a section.
<nav>: It is used to define a container for navigation links
<section>: It is used to define a section in a document
<article>: It is used to define an independent, self-contained article
<aside>: It is used to define content aside from the content (like a sidebar)
<footer>: It is used to define a footer for a document or a section

20. What is a marquee?

Marquee is used to put the scrolling text on a web page. It scrolls the image or text up, down, left or right automatically. You should put the text which you want to scroll within the <marquee>......</marquee> tag.

21. How many tags can be used to separate a section of texts?

Three tags are used to separate the texts.

<br> tag - Usually <br> tag is used to separate the line of text. It breaks the current line and conveys the flow to the next line

<p> tag - The <p> tag contains the text in the form of a new paragraph.
<blockquote> tag - It is used to define a large quoted section. If you have a large quotation, then put the entire text within <blockquote>.............</blockquote> tag.

22. How to make a picture of a background image of a web page?

To make a picture a background image on a web page, you should put the following tag code after the </head> tag.

<body background="image.gif">

Here, replace the "image.gif" with the name of your image file which you want to display on your web page.

23. What are empty elements?

HTML elements with no content are called empty elements. For example: <br>, <hr> etc.

24. What is the use of a span tag? Give one example.

The span tag is used for following things:

For adding color on text
For adding background on text
Highlight any color text
Example:

```html
<p>
  <span style="color:#ffffff;">
    In this page we use span.
  </span>
</p>
```

25. What is the use of an iframe tag?

An iframe is used to display a web page within a web page.

Syntax:

<iframe src="URL"></iframe>

Example:

<iframe src="demo_iframe.html" width="200px" height="200px"></iframe>

Target to a link:

<iframe src="http://www.javatpoint.com" name="iframe_a"></iframe>

26. What are the entities in HTML?

The HTML character entities are used as a replacement for reserved characters in HTML. You can also replace characters that are not present on your keyboard by entities. These characters are replaced because some characters are reserved in HTML.

27. Why is a URL encoded in HTML?

An URL is encoded to convert non-ASCII characters into a format that can be used over the Internet because a URL is sent over the Internet by using the ASCII character-set only. If a URL contains characters outside the ASCII set, the URL has to be converted. The non-ASCII characters are replaced with a "%" followed by hexadecimal digits.

28. Does a <!DOCTYPE html> tag is a HTML tag?

No, the <!DOCTYPE html> declaration is not an HTML tag. There are many type of HTML e.g. HTML 4.01 Strict, HTML 4.01 Transitional, HTML 4.01 Frameset, XHTML 1.0 Strict, XHTML 1.0 Transitional, XHTML 1.0 Frameset, XHTML 1.1 etc. So, <!DOCTYPE html> is used to instruct the web browser about the HTML page.

HTML5 Interview Questions

29. What is the canvas element in HTML5?

The <canvas> element is a container that is used to draw graphics on the web page using scripting language like JavaScript. It allows for dynamic and scriptable rendering of 2D shapes and bitmap images. There are several methods in canvas to draw paths, boxes, circles, text and add images. For Example:

<canvas id="myCanvas1" width="300" height="100" style="border:2px solid;">    
  Your browser does not support the HTML5 canvas tag.    
</canvas>

30. What is SVG?

HTML SVG is used to describe the two-dimensional vector and vector/raster graphics. SVG images and their behaviors are defined in XML text files. So as XML files, you can create and edit an SVG image with the text editor. It is mostly used for vector type diagrams like pie charts, 2-Dimensional graphs in an X, Y coordinate system.

<svg width="100" height="100">    
 <circle cx="50" cy="50" r="40" stroke="yellow" stroke-width="4" fill="red" />    
</svg>

31. What are the different new form element types in HTML 5?

Following is a list of 10 frequently used new elements in HTML 5:

- Color
- Date
- Datetime-local
- Email
- Time
- Url
- Range
- Telephone
- Number
- Search

32. Is there any need to change the web browsers to support HTML5?

No. Almost all browsers (updated versions) support HTML 5. For example Chrome, Firefox, Opera, Safari, IE.

33. Which type of video formats are supported by HTML5?

HTML 5 supports three types of video format:

mp4
WebM
Ogg

34. Is audio tag supported in HTML 5?

Yes. It is used to add sound or music files on the web page. There are three supported file formats for HTML 5 audio tag.

mp3
WAV
Ogg

Let's see the code to play mp3 file using HTML audio tag.

<audio controls>    
  <source src="koyal.mp3" type="audio/mpeg">    
Your browser does not support the html audio tag.    
</audio>

Instead of koyal.mp3, you can pass any mp3 file name.

35. What is the difference between progress and meter tag?

The progress tag is used to represent the progress of the task only while the meter tag is used to measure data within a given range.

36. What is the use of figure tag in HTML 5?

The figure tag is used to add a photo in the document on the web page. It is used to handle the group of diagrams, photos, code listing with some embedded content.

```html
<p>
  The Taj Mahal is widely recognized as "the jewel of Muslim art in India and
  one of the universally admired masterpieces of the world's heritage."
</p>
<figure>
  <img src="htmlpages/images/tajmahal.jpg" alt="Taj Mahal" />
</figure>
```

37. What is the use of figcaption tag in HTML 5?

The <figcaption> element is used to provide a caption to an image. It is an optional tag and can appear before or after the content within the <figure> tag. The <figcaption> element is used with <figure> element and it can be placed as the first or last child of the <figure> element.

```html
<figure>
  <img src="htmlpages/images/tajmahal.jpg" alt="Taj Mahal" />
  <figcaption>
    Fig.1.1 - A front view of the great Taj Mahal in Agra.
  </figcaption>
</figure>
```

38. What is button tag?

The button tag is used in HTML 5. It is used to create a clickable button within the HTML form on the web page. It is generally used to create a "submit" or "reset" button. Let's see the code to display the button.

<button name="button" type="button">Click Here</button>

39. What is the use of details and summary tag?

The details tag is used to specify some additional details on the web page. It can be viewed or hidden on demand. The summary tag is used with details tag.

40. What is datalist tag?

The HTML 5 datalist tag provides an autocomplete feature on the form element. It facilitates users to choose the predefined options to the users to select data.

```html
<label>
  Enter your favorite cricket player: Press any character<br />
  <input type="text" id="favCktPlayer" list="CktPlayers" />
  <datalist id="CktPlayers">
    <option value="Sachin Tendulkar"> </option>
    <option value="Brian Lara"> </option>
    <option value="Jacques Kallis"> </option>
    <option value="Ricky Ponting"> </option>
    <option value="Rahul Dravid"> </option>
    <option value="Shane Warne"> </option>
    <option value="Rohit Sharma"> </option>
    <option value="Donald Bradman"> </option>
    <option value="Saurav Ganguly "> </option>
    <option value="AB diVilliers"> </option>
    <option value="Mahendra Singh Dhoni"> </option>
    <option value="Adam Gilchrist"> </option>
  </datalist>
</label>
```

41. How are tags migrated from HTML4 to HTML5?

```
No.	  Typical HTML4	      Typical HTML5
1)	  <div id="header">	  <header>
2)	  <div id="menu">	    <nav>
3)	  <div id="content">	<section>
4)	  <div id="post">	    <article>
5)	  <div id="footer">	  <footer>
```

Header and Footer Example

HTML 4 Header and Footer:

```html
<div id="header">
  <h1>Monday Times</h1>
</div>
. . .
<div id="footer">
  <p>&copy; JavaTpoint. All rights reserved.</p>
</div>
```

HTML 5 Header and Footer:

```html
<header>
  <h1>Monday Times</h1>
</header>
. . .
<footer>
  <p>© JavaTpoint. All rights reserved.</p>
</footer>
```

Menu Example

HTML 4 Menu:

```html
<div id="menu">
  <ul>
    <li>News</li>
    <li>Sports</li>
    <li>Weather</li>
  </ul>
</div>
```

HTML 5 Menu:

```html
<nav>
  <ul>
    <li>News</li>
    <li>Sports</li>
    <li>Weather</li>
  </ul>
</nav>
```

42. If I do not put <!DOCTYPE html> will HTML 5 work?

No, the browser will not be able to identify that it is an HTML document and HTML 5 tags do not function properly..

43. What is the use of the required attribute in HTML5?

It forces a user to fill text on the text field or text area before submitting the form. It is used for form validation.

Example:

Name: <input type="text" name="name" required>

44. What are the new <input> types for form validation in HTML5?

The new input types for form validation are email, URL, number, tel, and date.

Example:

<input type="email">

---

## Top 50 HTML Interview Questions and Answers

[https://www.edureka.co/blog/interview-questions/top-50-html-interview-questions-and-answers/](https://www.edureka.co/blog/interview-questions/top-50-html-interview-questions-and-answers/)

---

## Top 60 HTML & HTML5 Interview Questions & Answers

[https://career.guru99.com/top-50-html-interview-questions/](https://career.guru99.com/top-50-html-interview-questions/)

---

# Html 5

## HTML5

[https://developer.mozilla.org/ru/docs/HTML/HTML5](https://developer.mozilla.org/ru/docs/HTML/HTML5)

### Семантика: позволяет точнее описывать, что из себя представляет ваш контент;

Секции и контуры в HTML5
Контурные и секционные элементы в HTML5: <section>, <article>, <nav>, <header>, <footer>, <aside> and <hgroup>.

Использование HTML5 audio и video
<audio> и <video> элементы вставляют и позволяют управлять мультимедиа контентом.

Формы в HTML5
Взгляд на улучшение форм в HTML5: API валидации, несколько новых атрибутов, новые значения для аттрибута type тега <input> и новый элемент <output>.

Новые семантические элементы
Кроме секций, медиа и форм, множество новых тегов, такие как <mark>, <figure>, <figcaption>, <data>, <time>, <output>, <progress> и <meter>, увеличено количество валидных HTML5 элементов.

Улучшение <iframe>
Использование атрубутов sandbox, seamless, and srcdoc, разработчики могут задать нужный уровень безопасности и осуществивить рендеринг тега <iframe>.

MathML
Позволяет вставлять математические формулы.

Введение в HTML5
Эта статья знакомит вас с тем, как указать на то, что вы используете HTML5 в вашем веб-дизайне или веб-приложении.

HTML5-совместимый парсер
Анализатор, который превращает байты HTML документа в DOM, был расширен и точно определяет поведение, чтобы даже в случае неверного HTML, исход был предсказуемым и одинаков во всех HTML5-совместимых браузерах.

### Связь: новые способы общения с сервером;

Web Sockets
Позволяет создать постоянное соединение между страницей и сервером и обмениваться данными через него.

Server-sent события
Позволяет серверу отправлять события клиенту, а не по классической парадигме, где сервер может передавать данные только в ответ на запрос клиента.

WebRTC
Эта технология, где RTC создает возможость общения в реальном времени, позволяет подключаться к другим людям и контролировать видеоконференции непосредственно в браузере, без необходимости плагинов и внешний приложений.

### Оффлайн и Хранилище: методы, позволяющие сохранять информацию локально на стороне клиента;

Оффлайн ресурсы: кеш приложения
Firefox полностью поддерживает спецификацию HTML5 по оффлайн ресурсам. Другие браузеры также имеют поддержку спецификации на должном уровне

Online and offline events
Firefox 3 поддерживает WHATWG online и offline события, которые позволяют приложениям и расширениям обнаружить есть ли активное подключение к Интернет, а также определить, когда соединение портится или улучшается.

WHATWG сессионное или постоянное хранилище (aka DOM Storage)
Постоянное или сессионое храилище позволяет веб-приложениям хранить структурированны данные на стороне клиента.

IndexedDB
Веб-стандарт для хранения значительных количеств структурированных данных в браузере и для быстрого их поиска, используя индексы.

Using files from web applications
Поддержка HTML5 File API была добавлена в Gecko, сделав возможным веб-приложениям иметь доступ к файлам, выбираемых пользователем. Это включает поддержку множества файлов, используя <input> с типом file, имеющих атрибут multiple. Ещё это FileReader.

### Мультимедиа:создание и взаимодействие с видео и звуком;

Использование HTML5 audio и video
<audio> и <video> элементы вставляют и позволяют управлять мультимедиа контентом.

WebRTC
Эта технология, где RTC создает возможость общения в реальном времени, позволяет подключаться к другим людям и контролировать видеоконференции непосредственно в браузере, без необходимости плагинов и внешний приложений.

Использование Camera API
Позволяет контролировать, манипулировать и хранить изображения с камеры устройства.

### 2D/3D Графика и эффекты: способы значительно разнообразить представление;

Canvas Tutorial
Узнайте о элементе <canvas> и узнайте, как рисовать графику и другие элементы в Firefox.

HTML5 text API для <canvas>
HTML5 text API сейчас поддерживается в <canvas>.

WebGL
WebGL приносит 3D в веб, соответстсвует OpenGL ES 2.0, может использоваться в HTML5 через <canvas>.

SVG
Основанный на XML формат векторных изображений, который может быть непосредственно вставлен в HTML.

### ПРОИЗВОДИТЕЛЬНОСТЬ И ИНТЕГРАЦИЯ

Web Workers
Позволяет делегировать выполнение JavaScript в фоновые потоки, это позволит предотвратить замедление интерактивных событий.

XMLHttpRequest Level 2
Позволяет извлечь асинхронно некоторые части страницы, что позволяет отобразить динамический контент, изменяющейся время от времени или от действий пользователя. Это технология, лежащая в основе AJAX.

JIT-компилирование движков JavaScript
Новое поколение движков JavaScript гораздо более мощных, приводящих к большей производительности.

History API
Позволяет управлять историей браузера. Это особенно полезно страниц, интерактивно загружающих новую информацию.

contentEditable атрибут: трансформируйте свой сайт в википедию!
HTML5 стандартизировал атрибут contentEditable. Узнайте больше об этой фиче.

Drag and drop
HTML5 drag and drop API позволяет перетаскивать элементы по сайту или на него. Также простейшее API для использования расширениями или иными приложениями.

Управление фокусом в HTML
Поддержка новый атрибутов HTML5 activeElement and hasFocus.

Обработчики протоколов для Web
Вы можете зарегистровать веб-приложения, как обработчики протоколов, используя метод navigator.registerProtocolHandler().

requestAnimationFrame
Контролирует анимации для обеспечения оптимальной производительности.

Fullscreen API
Позволяет использовать весь экран для веб-приложения, без отображения UI браузера.

Pointer Lock API
Позволяет блокировать курсор, так чтобы игры и подобные приложения не теряли фокус, когда указатель достигает предела окна.

Online and offline events
Для того, чтобы построить хорошую оффлайн-совместимые веб-приложения, вы должны знать, когда ваше приложение без сети. Также, вы должны знать, когда ваше приложение снова вернется в сеть.

### ДОСТУП К УСТРОЙСТВАМ

Использование Camera API
Позволяет контролировать, манипулировать и хранить изображения с камеры устройства.

Touch события
Обрабатывает события, создаваемые нажатиями пользователя по тач скрину.

Геолокация
Позволяет браузерам получать местоположение пользователя.

Определение ориентации устройства
Позволяет среагировать, когда устройство, на котором работает браузер, меняет ориентацию. Это может быть использовано в качестве устройства ввода (например, чтобы сделать игры, которые реагируют на положение устройства) или адаптировать компоновку страницы с ориентацией экрана (вертикальная или горизонтальная).

Pointer Lock API
Позволяет блокировать курсор, так чтобы игры и подобные приложения не теряли фокус, когда указатель достигает предела окна.

### СТИЛИЗАЦИЯ

CSS был расширен, чтобы дать возможность стилизировать элементы наиболее оптимальным способом. Его часто называют CSS3, хотя CSS больше не является монолитной спецификацией и различные модули, не все на уровне 3: некоторые на уровне 1, а некоторые на уровне 4, с промежуточными уровнями.

Новые способы стилизирования фона
Новая возможность задать тень элемента, используя box-shadow или установление множественных фонов.

Лучшие границы
Не только изображения можно использовать для стилизирования границы, используя border-image или его длинные формы записи, а скруглить уголки можно свойством border-radius.

Анимируйте свой стиль
Используйте CSS Переходы, чтобы анимировать изменение состояния элемента или CSS Анимации для анимации частей страницы без запуска событий, вы теперь можете контролировать мобильные элементы на вашей странице.

Улучшение типографии
Авторы могут лучше контролировать типографию. Например, они могут контролировать text-overflow и перенос слов, а также тень текста и его декорированиe. Могут загрузить и применить другой шрифт правилом @font-face.

Новые презентационные макеты
Для того, чтобы улучшить гибкость дизайна, добавили: CSS мульти-колоночный макет и CSS отзывчивый блочный макет.

---

# Doctypes

## Почему важен DOCTYPE и как его правильно использовать

[https://habr.com/ru/post/71364/](https://habr.com/ru/post/71364/)

DOCTYPE Описание
HTML 4.01

<!DOCTYPE HTML PUBLIC  "-//W3C//DTD HTML 4.01//EN" "www.w3.org/TR/html4/strict.dtd">	Строгий синтаксис HTML.
<!DOCTYPE HTML PUBLIC  "-//W3C//DTD HTML 4.01 Transitional//EN" "www.w3.org/TR/html4/loose.dtd">	Переходный синтаксис HTML.
<!DOCTYPE HTML PUBLIC  "-//W3C//DTD HTML 4.01 Frameset//EN" "www.w3.org/TR/html4/frameset.dtd">	В HTML-документе применяются фреймы.

XHTML 1.0

<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Strict//EN" "www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">	Строгий синтаксис XHTML.
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">	Переходный синтаксис XHTML.
<!DOCTYPE html PUBLIC  "-//W3C//DTD XHTML 1.0 Frameset//EN" "www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">	Документ написан на XHTML и содержит фреймы.

XHTML 1.1

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">	Разработчики XHTML 1.1 предполагают, что он постепенно вытеснит HTML. Никакого деления на виды это определение не имеет, синтаксис один и подчиняется четким правилам.

Устаревшие тэги в алфавитном порядке

<applet> Используйте тег<object>.

<basefont> используйте CSS.
<blockquote>используйте CSS. (? ошибка)
<center>используйте CSS.
<dir>используйте <ul>.
<em>используйте CSS. (? ошибка)
<font>используйте CSS.
<isindex>
<listing> используйте <pre> или CSS.
<menu>замените тегом<ul> или CSS.
<nextid>
<plaintext> используйте <pre> или <a href='view-source:http://somesite.com'>Source code</a>.
<s>используйте<del> или <ins>.
<strike> используйте <del> или<ins>.
<u>используйте CSS.
<xmp> используйте <pre> и CSS стиль.

Устаревшие HTML / XHTML аттрибуты тегов. Все они могут быть заменены CSS стилями.

align
alink
background
bgcolor
color
hspace
link
size
text
type
vlink
vspace

---

# HTML attributes

## HTML attribute reference

[https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)

```

Attribute Name	Elements	Description
accept	<form>, <input>	List of types the server accepts, typically a file type.
accept-charset	<form>	List of supported charsets.
accesskey	Global attribute	Keyboard shortcut to activate or add focus to the element.
action	<form>	The URI of a program that processes the information submitted via the form.
align	<applet>, <caption>, <col>, <colgroup>, <hr>, <iframe>, <img>, <table>, <tbody>, <td>, <tfoot> , <th>, <thead>, <tr>	Specifies the horizontal alignment of the element.
allow	<iframe>	Specifies a feature-policy for the iframe.
alt	<applet>, <area>, <img>, <input>	Alternative text in case an image can't be displayed.
async	<script>	Executes the script asynchronously.
autocapitalize	Global attribute	Sets whether input is automatically capitalized when entered by user
autocomplete	<form>, <input>, <select>, <textarea>	Indicates whether controls in this form can by default have their values automatically completed by the browser.
autofocus	<button>, <input>, <keygen>, <select>, <textarea>	The element should be automatically focused after the page loaded.
autoplay	<audio>, <video>	The audio or video should play as soon as possible.
background	<body>, <table>, <td>, <th>	Specifies the URL of an image file.
Note: Although browsers and email clients may still support this attribute, it is obsolete. Use CSS background-image instead.
bgcolor	<body>, <col>, <colgroup>, <marquee>, <table>, <tbody>, <tfoot>, <td>, <th>, <tr>
Background color of the element.

Note: This is a legacy attribute. Please use the CSS background-color property instead.

border	<img>, <object>, <table>
The border width.

Note: This is a legacy attribute. Please use the CSS border property instead.

buffered	<audio>, <video>	Contains the time range of already buffered media.
capture	<input>	From the HTML Media Capture
The definition of 'media capture' in that specification.spec, specifies a new file can be captured.
challenge	<keygen>	A challenge string that is submitted along with the public key.
charset	<meta>, <script>	Declares the character encoding of the page or script.
checked	<command>, <input>	Indicates whether the element should be checked on page load.
cite	<blockquote>, <del>, <ins>, <q>	Contains a URI which points to the source of the quote or change.
class	Global attribute	Often used with CSS to style elements with common properties.
code	<applet>	Specifies the URL of the applet's class file to be loaded and executed.
codebase	<applet>	This attribute gives the absolute or relative URL of the directory where applets' .class files referenced by the code attribute are stored.
color	<basefont>, <font>, <hr>
This attribute sets the text color using either a named color or a color specified in the hexadecimal #RRGGBB format.

Note: This is a legacy attribute. Please use the CSS color property instead.

cols	<textarea>	Defines the number of columns in a textarea.
colspan	<td>, <th>	The colspan attribute defines the number of columns a cell should span.
content	<meta>	A value associated with http-equiv or name depending on the context.
contenteditable	Global attribute	Indicates whether the element's content is editable.
contextmenu	Global attribute	Defines the ID of a <menu> element which will serve as the element's context menu.
controls	<audio>, <video>	Indicates whether the browser should show playback controls to the user.
coords	<area>	A set of values specifying the coordinates of the hot-spot region.
crossorigin	<audio>, <img>, <link>, <script>, <video>	How the element handles cross-origin requests
csp 	<iframe>	Specifies the Content Security Policy that an embedded document must agree to enforce upon itself.
data	<object>	Specifies the URL of the resource.
data-*	Global attribute	Lets you attach custom attributes to an HTML element.
datetime	<del>, <ins>, <time>	Indicates the date and time associated with the element.
decoding	<img>	Indicates the preferred method to decode the image.
default	<track>	Indicates that the track should be enabled unless the user's preferences indicate something different.
defer	<script>	Indicates that the script should be executed after the page has been parsed.
dir	Global attribute	Defines the text direction. Allowed values are ltr (Left-To-Right) or rtl (Right-To-Left)
dirname	<input>, <textarea>
disabled	<button>, <command>, <fieldset>, <input>, <keygen>, <optgroup>, <option>, <select>, <textarea>	Indicates whether the user can interact with the element.
download	<a>, <area>	Indicates that the hyperlink is to be used for downloading a resource.
draggable	Global attribute	Defines whether the element can be dragged.
dropzone	Global attribute	Indicates that the element accepts the dropping of content onto it.
enctype	<form>	Defines the content type of the form date when the method is POST.
enterkeyhint 	<textarea>, contenteditable	The enterkeyhint specifies what action label (or icon) to present for the enter key on virtual keyboards. The attribute can be used with form controls (such as the value of textarea elements), or in elements in an editing host (e.g., using contenteditable attribute).
for	<label>, <output>	Describes elements which belongs to this one.
form	<button>, <fieldset>, <input>, <keygen>, <label>, <meter>, <object>, <output>, <progress>, <select>, <textarea>	Indicates the form that is the owner of the element.
formaction	<input>, <button>	Indicates the action of the element, overriding the action defined in the <form>.
formenctype	<button>, <input>	If the button/input is a submit button (type="submit"), this attribute sets the encoding type to use during form submission. If this attribute is specified, it overrides the enctype attribute of the button's form owner.
formmethod	<button>, <input>	If the button/input is a submit button (type="submit"), this attribute sets the submission method to use during form submission (GET, POST, etc.). If this attribute is specified, it overrides the method attribute of the button's form owner.
formnovalidate	<button>, <input>	If the button/input is a submit button (type="submit"), this boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the novalidate attribute of the button's form owner.
formtarget	<button>, <input>	If the button/input is a submit button (type="submit"), this attribute specifies the browsing context (for example, tab, window, or inline frame) in which to display the response that is received after submitting the form. If this attribute is specified, it overrides the target attribute of the button's form owner.
headers	<td>, <th>	IDs of the <th> elements which applies to this element.
height	<canvas>, <embed>, <iframe>, <img>, <input>, <object>, <video>
Specifies the height of elements listed here. For all other elements, use the CSS height property.

Note: In some instances, such as <div>, this is a legacy attribute, in which case the CSS height property should be used instead.

hidden	Global attribute	Prevents rendering of given element, while keeping child elements, e.g. script elements, active.
high	<meter>	Indicates the lower bound of the upper range.
href	<a>, <area>, <base>, <link>	The URL of a linked resource.
hreflang	<a>, <area>, <link>	Specifies the language of the linked resource.
http-equiv	<meta>	Defines a pragma directive.
icon	<command>	Specifies a picture which represents the command.
id	Global attribute	Often used with CSS to style a specific element. The value of this attribute must be unique.
importance 	<iframe>, <img>, <link>, <script>	Indicates the relative fetch priority for the resource.
integrity	<link>, <script>
Specifies a Subresource Integrity value that allows browsers to verify what they fetch.

intrinsicsize 	<img>	This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute.
inputmode	<textarea>, contenteditable	Provides a hint as to the type of data that might be entered by the user while editing the element or its contents. The attribute can be used with form controls (such as the value of textarea elements), or in elements in an editing host (e.g., using contenteditable attribute).
ismap	<img>	Indicates that the image is part of a server-side image map.
itemprop	Global attribute
keytype	<keygen>	Specifies the type of key generated.
kind	<track>	Specifies the kind of text track.
label	<optgroup>, <option>, <track>	Specifies a user-readable title of the element.
lang	Global attribute	Defines the language used in the element.
language	<script>	Defines the script language used in the element.
loading 	<img>, <iframe>	Indicates if the element should be loaded lazily (loading="lazy") or loaded immediately (loading="eager").
WIP: WHATWG PR #3752
list	<input>	Identifies a list of pre-defined options to suggest to the user.
loop	<audio>, <bgsound>, <marquee>, <video>	Indicates whether the media should start playing from the start when it's finished.
low	<meter>	Indicates the upper bound of the lower range.
manifest	<html>	Specifies the URL of the document's cache manifest.
Note: This attribute is obsolete, use <link rel="manifest"> instead.
max	<input>, <meter>, <progress>	Indicates the maximum value allowed.
maxlength	<input>, <textarea>	Defines the maximum number of characters allowed in the element.
minlength	<input>, <textarea>	Defines the minimum number of characters allowed in the element.
media	<a>, <area>, <link>, <source>, <style>	Specifies a hint of the media for which the linked resource was designed.
method	<form>	Defines which HTTP method to use when submitting the form. Can be GET (default) or POST.
min	<input>, <meter>	Indicates the minimum value allowed.
multiple	<input>, <select>	Indicates whether multiple values can be entered in an input of the type email or file.
muted	<audio>, <video>	Indicates whether the audio will be initially silenced on page load.
name	<button>, <form>, <fieldset>, <iframe>, <input>, <keygen>, <object>, <output>, <select>, <textarea>, <map>, <meta>, <param>	Name of the element. For example used by the server to identify the fields in form submits.
novalidate	<form>	This attribute indicates that the form shouldn't be validated when submitted.
open	<details>	Indicates whether the details will be shown on page load.
optimum	<meter>	Indicates the optimal numeric value.
pattern	<input>	Defines a regular expression which the element's value will be validated against.
ping	<a>, <area>	The ping attribute specifies a space-separated list of URLs to be notified if a user follows the hyperlink.
placeholder	<input>, <textarea>	Provides a hint to the user of what can be entered in the field.
poster	<video>	A URL indicating a poster frame to show until the user plays or seeks.
preload	<audio>, <video>	Indicates whether the whole resource, parts of it or nothing should be preloaded.
radiogroup	<command>
readonly	<input>, <textarea>	Indicates whether the element can be edited.
referrerpolicy	<a>, <area>, <iframe>, <img>, <link>, <script>	Specifies which referrer is sent when fetching the resource.
rel	<a>, <area>, <link>	Specifies the relationship of the target object to the link object.
required	<input>, <select>, <textarea>	Indicates whether this element is required to fill out or not.
reversed	<ol>	Indicates whether the list should be displayed in a descending order instead of a ascending.
rows	<textarea>	Defines the number of rows in a text area.
rowspan	<td>, <th>	Defines the number of rows a table cell should span over.
sandbox	<iframe>	Stops a document loaded in an iframe from using certain features (such as submitting forms or opening new windows).
scope	<th>	Defines the cells that the header test (defined in the th element) relates to.
scoped	<style>
selected	<option>	Defines a value which will be selected on page load.
shape	<a>, <area>
size	<input>, <select>	Defines the width of the element (in pixels). If the element's type attribute is text or password then it's the number of characters.
sizes	<link>, <img>, <source>
slot	Global attribute	Assigns a slot in a shadow DOM shadow tree to an element.
span	<col>, <colgroup>
spellcheck	Global attribute	Indicates whether spell checking is allowed for the element.
src	<audio>, <embed>, <iframe>, <img>, <input>, <script>, <source>, <track>, <video>	The URL of the embeddable content.
srcdoc	<iframe>
srclang	<track>
srcset	<img>, <source>	One or more responsive image candidates.
start	<ol>	Defines the first number if other than 1.
step	<input>
style	Global attribute	Defines CSS styles which will override styles previously set.
summary	<table>
tabindex	Global attribute	Overrides the browser's default tab order and follows the one specified instead.
target	<a>, <area>, <base>, <form>
title	Global attribute	Text to be displayed in a tooltip when hovering over the element.
translate	Global attribute	Specify whether an element’s attribute values and the values of its Text node children are to be translated when the page is localized, or whether to leave them unchanged.
type	<button>, <input>, <command>, <embed>, <object>, <script>, <source>, <style>, <menu>	Defines the type of the element.
usemap	<img>, <input>, <object>
value	<button>, <data>, <input>, <li>, <meter>, <option>, <progress>, <param>	Defines a default value which will be displayed in the element on page load.
width	<canvas>, <embed>, <iframe>, <img>, <input>, <object>, <video>
For the elements listed here, this establishes the element's width.

Note: For all other instances, such as <div>, this is a legacy attribute, in which case the CSS width property should be used instead.

wrap	<textarea>	Indicates whether the text should be wrapped.
```

---

# ARIA / a11y

## WAI-ARIA basics

[https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)

What is WAI-ARIA?
WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) is a specification written by the W3C, defining a set of additional HTML attributes that can be applied to elements to provide additional semantics and improve accessibility wherever it is lacking. There are three main features defined in the spec:

Roles — These define what an element is or does. Many of these are so-called landmark roles, which largely duplicate the semantic value of HTML5 structural elements e.g. role="navigation" (<nav>) or role="complementary" (<aside>), but there are also others that describe different pages structures, such as role="banner", role="search", role="tabgroup", role="tab", etc., which are commonly found in UIs.

Properties — These define properties of elements, which can be used to give them extra meaning or semantics. As an example, aria-required="true" specifies that a form input needs to be filled in to be valid, whereas aria-labelledby="label" allows you to put an ID on an element, then reference it as being the label for anything else on the page, including multiple elements, which is not possible using <label for="input">. As an example, you could use aria-labelledby to specify that a key description contained in a <div> is the label for multiple table cells, or you could use it as an alternative to image alt text — specify existing information on the page as an image's alt text, rather than having to repeat it inside the alt attribute. You can see an example of this at Text alternatives.

States — Special properties that define the current conditions of elements, such as aria-disabled="true", which specifies to a screenreader that a form input is currently disabled. States differ from properties in that properties don't change throughout the lifecycle of an app, whereas states can change, generally programmatically via JavaScript.

### you should only use WAI-ARIA when you need to!

---

## You can't read this sentence — A11y automation

[https://www.youtube.com/watch?v=2UZXyisKs18&list=PL8sJahqnzh8K1ajJiFd1eAcCYJvViAdo6&index=16](https://www.youtube.com/watch?v=2UZXyisKs18&list=PL8sJahqnzh8K1ajJiFd1eAcCYJvViAdo6&index=16)

automatic color a11y
github.com/palmaswell/forward

---

## ARIA

[https://developer.mozilla.org/ru/docs/Web/Accessibility/ARIA](https://developer.mozilla.org/ru/docs/Web/Accessibility/ARIA)

Tested UA/AT Combinations:

Dragon 10 with Firefox 3 and IE 8 beta 2
JAWS 9 & 10 with Firefox 3
JAWS 9 & 10 with IE beta 2
NVDA 0.6p2 with Firefox 3
Orca with Firefox 3
Window-Eyes 7 with IE 8 beta 2 and Firefox 3
Voiceover (Leopard) with Safari 4.0.2
Zoom (Leopard) with Safari 4.0.2, Firefox 3.x and Opera 9.x
ZoomText 9.1 with Firefox 3 and IE 8 beta 2

---

## Доступность веб‑страницы

[https://nicothin.pro/page/dostupnost-veb-stranicy](https://nicothin.pro/page/dostupnost-veb-stranicy)

### Грамотная и логичная структура разметки

Пишите правильный и семантичный HTML: используйте HTML5‑теги, размещайте важный контент выше по коду. К примеру, главный контент статьи должен быть по коду выше сайдбара со второстепенным контентом или рекламой.

Используйте подходящие теги: кнопка должна быть кнопкой, ссылка – ссылкой, список – списком, заголовок – заголовком, таблица – таблицей и т. д. Не пишите теги ссылок без атрибута href .

Не пишите ссылки и кнопки без текстовых узлов. Если невозможно сделать кнопку с текстовым узлом, попробуйте использовать атрибут aria-label для пояснения функционала кнопки.

При создании любых нестандартных интерактивных элементов, опирайтесь на существующие интерактивные элементы. Пример: нестандартный вид флажка‑переключателя должен быть реализован через стандартный флажок, без Javascript.

Если никак не получается сделать некий интерактивный элемент тегом, имеющим интерактивность по умолчанию (кнопка, сделанная div вместо button ), используйте для таких элементов tabindex="0" (это позволит «включить» такой кривой элемент в поток переключения фокуса) и подходящую ARIA-роль (см. ниже).

### Используйте хорошо читаемый текст

Позаботьтесь, чтобы текст был набран достаточно контрастным цветом и достаточным размером шрифта.

### Пользуйтесь атрибутом lang

Достаточно указать его у тега html , но при желании, можно указать язык и для многих других тегов. Таблица кодов языков.

### Всегда заполняйте атрибут alt для изображений

Важно максимально коротко и понятно описать содержимое картинки. Архиважно, если картинка – единственное содержимое ссылки.

### Делайте состояние :focus заметным

Почти все технологии, облегчающие для инвалидов взаимодействие со страницей, ориентированы на клавиатуру, либо напрямую ее используют. Пользователи, нажимая Tab «перемещаются» по активным элементам страницы, перемещая фокус.

### Используйте ARIA. Хотя бы роли

WAI‑ARIA (Web Accessibility Initiative – Accessible Rich Internet Applications) – технологический стандарт W3C для предоставления возможности полноценного использования Интернета людьми с физическими ограничениями. Спецификация.

Спецификация довольно обширная, но использовать можно лишь основные элементы.

```html
<!-- Главный заголовок сайта или внутренний заголовок страницы -->
<header role="banner">...</header>

<!-- Навигация по сайту или по странице -->
<nav role="navigation">
  <ul>
    ...
  </ul>
</nav>

<!-- Основной контент -->
<main role="main">
  <!-- Важная срочная информация -->
  <div role="alert"></div>
  <!-- Большой раздел страницы -->
  <section role="region"></section>
  <!-- Самостоятельный элемент страницы -->
  <article role="article"></article>
  <!-- Очень странная «кнопка» -->
  <div role="button">button</div>
</main>

<!-- Второстепенный контент или информационный блок -->
<aside role="complementary">
  <!-- Поиск по сайту -->
  <form role="search">...</form>
</aside>

<!-- Какая то обобщающая информация -->
<footer role="contentinfo">...</footer>
```

### Не извращайтесь

Не позиционируйте над интерактивным элементом блок с нулевой непрозрачностью для перехвата на нем кликов.
Если у некого элемента есть отслеживание клика, должно быть и отслеживание нажатий клавиатуры.
Не используйте opacity: 0; для сокрытия элементов.

---

## Доступность

[https://yoksel.github.io/easy-markup/accessibility/](https://yoksel.github.io/easy-markup/accessibility/)

### Доступность — это просто

Обеспечить доступность на самом элементарном уровне можно с помощью семантической разметки, то есть используя теги по смыслу. Это важно по двум причинам:

- Если не загрузятся стили, пользователь получит не кашу из текста и картинок, а понятную страницу, которую без труда сможет прочитать.

- Скринридеры смогут различить и прочитать все элементы на странице. Встретив ссылку, они скажут, что это ссылка и на неё можно нажать, список зачитают как список, а не как набор разрозненных тегов, они прочитают описания для картинок и построят структуру страницы используя заголовки.

И всё это просто за счёт использования тегов по назначению.

Самые простые примеры:

### Ссылки и кнопки

Если нужно сделать кликабельный элемент, выбирайте ссылку или кнопку. Выбирайте ссылку, если клик уводит на другую страницу, если нет — используйте кнопку. Скринридеры понимают эти элементы как активные, и могут озвучить это для пользователя. Если вместо кнопки используется div или span, скринридер не поймёт, что на него можно нажать.

Также, по возможности, делайте кликабельную область большого размера, даже если элемент визуально небольшой. Это особенно важно для мобильных версий, где мы кликаем пальцем, но и на широких экранах будет удобнее, если по кнопке или ссылке можно попасть не прицеливаясь.

По теме:
Доклад Вадима Макеева «Жми сюда!»
Доклад Leonie Watson «Introduction to accessibility mechanics»

### Заголовки

Теги заголовков h1-h6 нужны не только для красоты, но и для выстраивания структуры страницы, с их помощью можно сформировать иерархическое дерево документа с разделами и подразделами.

Выбор уровня заголовка на основе иерархии документа решает сразу две задачи:

Как верстальщику, вам не придётся ломать голову над тегом для заголовка: у соседних элементов уровень заголовков одинаковый, если у родителя заголовок h2, то у дочерних элементов должны быть заголовки h3, и так далее.
Основываясь на заголовках скринридеры строят структуру страницы, по которой можно навигироваться, таким образом пользователи читалок могут сразу выбрать нужный раздел без необходимости читать весь текст — это как быстро найти нужную главу в оглавлении книги.
Иногда бывает, что на странице есть какой-то самостоятельный раздел, но по макету у него нет заголовка. Получается, что эта часть страницы не будет представлена в оглавлении, которым пользуются читалки. Проблему можно решить добавив заголовок, который затем будет скрыт с помощью CSS. Скрывать рекомендуется таким кодом (источник):

```css
.visuallyhidden:not(:focus):not(:active) {
  position: absolute;

  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;

  white-space: nowrap;

  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
```

Такого заголовка не будет на странице, но скринридеры прочитают его без труда. Также это решает задачу с тем, что по спецификации у section и article должны быть заголовки: если они не предусмотрены по макету, просто добавьте скрытые.

По теме:
Валидатор разметки, для отображения структуры заголовков включите галку «outline»
Генератор HTML-дерева — построит дерево документа и структуру заголовков

### Изображения

У всех img на странице должен быть указан атрибут alt: его могут прочитать скринридеры, его увидят пользователи с отключенными или незагрузившимися картинками.

Если в качестве контентного изображения используется инлайновый SVG, его содержимое можно сделать доступным для скринридеров, добавив role="img" aria-label="Описание картинки".

Если картинки используются как фон для текста, задайте таким блокам фоновый цвет, схожий с цветами фонового изображения. Если картинки не загрузятся (или отключены), текст окажется на констрастном фоне и его всё равно можно будет прочитать.

По теме:
Web Accessibility Tutorials: Images Concepts
Статья Ire Aderinokun «Alternative Text and Images», перевод
Статья «Логотип не отвечает или временно недоступен»

### Элементы формы

Для разметки формы обязательно используйте соответствующие элементы, например fieldset, legend, label, input и textarea.

Скринридеры понимают такие элементы. Они видят fieldset как группу инпутов, а legend — как название группы. Скринридер прочитает лейблы как названия для чекбоксов и полей, и пользователь сможет выбрать желаемые опции или ввести текст.

Без лейблов скринридер не сможет понять назначение инпутов, а без fieldset и legend — понять как группируются элементы формы и как они связаны между собой, и форма может оказаться полностью недоступной.

---

## Стандарт WAI-ARIA и использование ARIA-атрибутов, Ольга Болотова

[https://www.youtube.com/watch?v=zYrqF6xbdoE](https://www.youtube.com/watch?v=zYrqF6xbdoE)

Виды ARI-атрибутов

- Роли
- Свойства
- Состояния

### Атрибуты ролей

отвечают на вопросы:

Что это за элемент? Какое у него предназначение?

<nav>Главное меню</nav>
тоже самое что и
<div role="navigation">Главное меню</div>

<header>Хедер</header>
тоже самое что и
<div role="bunner">Хедер</div>

ПЛОХО!

<nav role="navigation">Главное меню</nav>

Не надо так!

Был параграфом:

<p>Text</p>

Стал заголовком первого уровня:

<p role="heading" aria-level="1">Text</p>

ВАЖНО!
По возможности используйте родную семантику
Переопределять семантику тега нежелательно
У элемента может быть только одна роль

### Атрибуты свойств

```
Префикс aria-*
```

Плохо
<button type="button">X</button>
Плохо
<button type="button">Закрыть модальное окно</button>
Хорошо
<button type="button" aria-label="Закрыть модальное окно">X</button>

### Атрибуты состояний

```
Префикс aria-*
```

<div hidden>Контент</div>
Тоже самое
<div aria-hidden="true">Контент</div>
Нельзя!
<div hidden aria-hidden="true">Контент</div>

### Остальное

role="tree" нет аналога в html

### Выводы

- Если вы можете использовать родную семантику HTML или встроенный атрибут без использования ARIA-атрибутов, чтобы сделать элемент доступным, то сделайте это.
- Не меняйте родную семантику, если только в этом нет сильной необходимости.
- Добавление ARIA-роли переопределяет нативные семантическую роль тега
- ARIA предоствляет возможности, которых еще нет в родном HTML
- У элемента может быть только одна роль

---

## a11y casts

[https://www.youtube.com/playlist?list=PL7Bjl0Cb4SboBHNihVBRd-AdctfXcmClc](https://www.youtube.com/playlist?list=PL7Bjl0Cb4SboBHNihVBRd-AdctfXcmClc)

[https://www.youtube.com/watch?v=HtTyRajRuyY&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g](https://www.youtube.com/watch?v=HtTyRajRuyY&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

https://www.w3.org/TR/wai-aria-practices-1.1/

inert polyfill | on github (for a11y side nav show-hide);

chrome://flags -> developer tools experiments Enable

chrome devtools -> more -> settings -> experiments -> check on Accesibility Inspection
next you need reload devtools -> open Elements page -> in a bottom go to Accessibility page

voiceover for mac or NVDA for windows (nvaccess.org)

webAIM (webaim.org)

chrome extensions -> aXe and/or Accessibility Developer Tools

axe-core for tests (jest or others)

aria-label for button without text

role="chekbox" and aria-checked="false or true" for custom checkbox on div

### Add semantics

<div class ="checkbox checked">
  Receive promotional offers
</div>

to

<div role="checkbox" aria-checked="true">
  Receive promotional offers
</div>

### Modify semantics

// aria 1.1

<button class="toggle" checked>
  Enable
</button>

to

<button role="switch" aria-checked="true" class="toggle">
  Enable
</button>

### Express more UI patterns

<ul role="tree"> 
  <li role="treeitem" aria-expanded="true">
    Accessibility course
  </li>
  <ul role="group">
    <li role="treeitem" aria-expanded="false">
      Introduction
    </li>
     <li role="treeitem" aria-expanded="false">
      Focus
    </li>
    ...

### Extra labels and descriptions

<button class="glyph">
  <div class="filter-glyph">
  </div>
</button>

to

<button class="glyph" aria-label="Filter">
  <div class="menu-glyph">
  </div>
</button>

### Relationships

<button aria-expanded="false" aria-controls="advanced-settings">
  <h2>Andvanced settings</h2>
</button>
<div id="advanced-settings">
  <label><input type="checkbox"> Offer to ...
  </label>
  <label><input type="checkbox"> Send usage ...
  </label>
</div>

### Live updates

<div role="alert">
  Could not connect!
</div>

### aXe library

axe-core (github)

1. extension chrome - aXe

2. for seleniun - axe-webdriverjs (github)

3. axe-cli (github)

---

## Доступность интерфейсов. Лекция Яндекса

[https://habr.com/ru/company/yandex/blog/424879/](https://habr.com/ru/company/yandex/blog/424879/)

Указывайте <title>
Указывайте яык страницы
симантика
валидность
