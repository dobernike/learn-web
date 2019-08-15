/**
 * Создать раскрывающееся меню
важность: 5

Создать меню, которое по нажатию открывается либо закрывается:

P.S. HTML/CSS исходного документа можно и нужно менять.
 */

 /** <!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
</head>
<body>

  ▶ ▼ Сладости (нажми меня)!
  <ul>
    <li>Пирожное</li>
    <li>Пончик</li>
    <li>Мёд</li>
  </ul>

</body>
</html>
  */

const text = document.body.firstChild.data;
text[0].hidden = true;

const ul = document.querySelector('ul');
ul.hidden = true;

text.addEventListener('click', () => !ul.hidden);