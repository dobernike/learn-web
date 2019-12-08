/**Галерея изображений
важность: 5

Создайте галерею изображений, в которой основное изображение изменяется при клике на уменьшенный вариант. */

thumbs.addEventListener("click", evt => {
  const target = evt.target.closest("A");

  if (!target) return;

  largeImg.src = target.href;
  largeImg.title = target.title;

  evt.preventDefault();
});
