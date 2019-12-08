/**
 * Поиск элементов
важность: 4

Вот документ с таблицей и формой.

Как найти?…

    Таблицу с id="age-table".
    Все элементы label внутри этой таблицы (их три).
    Первый td в этой таблице (со словом «Age»).
    Форму form с именем name="search".
    Первый input в этой форме.
    Последний input в этой форме.

Откройте страницу table.html в отдельном окне и используйте для этого браузерные инструменты разработчика.
 */

// Таблицу с id="age-table".
const table = document.querySelector('#age-table');
// Все элементы label внутри этой таблицы (их три).
const labels = table.querySelectorAll('label');
// Первый td в этой таблице (со словом «Age»).
const firstTd = table.querySelector('td');
// Форму form с именем name="search".
const form = document.querySelector('form[name="search"]');
// Первый input в этой форме.
const firstInput = form.querySelector('input');
// Последний input в этой форме.
const inputs = form.querySelectorAll('input');
const lastInput = inputs[inputs.length - 1];

var buffer = new SharedArrayBuffer(16);
new UintArray(beffer);
