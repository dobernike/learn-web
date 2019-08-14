/**
 * Очистите элемент
важность: 5

Создайте функцию clear(elem), которая удаляет всё содержимое из elem.

<ol id="elem">
  <li>Привет</li>
  <li>Мир</li>
</ol>

<script>
  function clear(elem) { ваш код}

  clear(elem); // очищает список
  </script>
 */

function clear(elem) {
  // while (elem.firstChild) {
  //   elem.firstChild.remove();
  // }
  elem.innerHtml = '';
}

clear(elem); // очищает список
