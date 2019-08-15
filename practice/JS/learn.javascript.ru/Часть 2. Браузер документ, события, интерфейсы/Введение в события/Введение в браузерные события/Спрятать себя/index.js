/**
 * Спрятать себя
важность: 5

Создайте кнопку, которая будет скрывать себя по нажатию.
 */

button.onclick = function() {
  this.hidden = true;
}
// или
button.addEventListener('click', () => {
  this.hidden = true;
})
