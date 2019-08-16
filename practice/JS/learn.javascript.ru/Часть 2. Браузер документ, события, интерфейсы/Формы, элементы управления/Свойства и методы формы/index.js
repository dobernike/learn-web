/**
 * Добавьте пункт к выпадающему списку
важность: 5

Имеется <select>:

<select id="genres">
  <option value="rock">Рок</option>
  <option value="blues" selected>Блюз</option>
</select>

Используя JavaScript:

    Выведите значение и текст выбранного пункта.
    Добавьте пункт: <option value="classic">Классика</option>.
    Сделайте его выбранным.

 */

 
// Выведите значение и текст выбранного пункта.
const selectedOption = genres.options[genres.selectedIndex];
selectedOption.value;
// Добавьте пункт: <option value="classic">Классика</option>.
const option = new Option('Классика', 'classic');
genres.append(option);
// Сделайте его выбранным.
option.selected = true;
