/**
 * Улучшенная подсказка
важность: 5

Напишите JavaScript код, который показывает подсказку над элементом со значением, взятым из атрибута data-tooltip.

Это похоже на задачу Поведение "подсказка", но здесь элементы с подсказками могут быть вложены друг в друга. Показываться должна подсказка на самом глубоко вложенном элементе.

Например:

<div data-tooltip="Здесь - домашний интерьер" id="house">
  <div data-tooltip="Здесь - крыша" id="roof"></div>
  ...
  <a href="https://ru.wikipedia.org/wiki/%D0%A2%D1%80%D0%B8_%D0%BF%D0%BE%D1%80%D0%BE%D1%81%D1%91%D0%BD%D0%BA%D0%B0" data-tooltip="Читать далее…">Наведи курсор на меня</a>
</div>

Результат в iframe:

P.S. Подсказка: только одна подсказка может быть показана в любой момент времени.
 */

let tooltip;

document.onmouseover = function(event) {
  // важно: быстро движущийся курсор может прыгнуть сразу к дочернему элементу, пропустив родительский
  // так что событие mouseover произойдёт сразу на дочернем элементе.

  let anchorElem = event.target.closest('[data-tooltip]');

  if (!anchorElem) return;

  // показываем подсказку и запоминаем её
  tooltip = showTooltip(anchorElem, anchorElem.dataset.tooltip);
}

document.onmouseout = function() {
  // возможно такое, что произошло событие mouseout, но мы всё ещё внутри элемента
  // (оно было где-то внутри и всплыло)
  // но в этом случае сразу же последует событие mouseover,
  // то есть подсказка исчезнет и потом снова покажется
  //
  // к счастью, этого не будет видно,
  // так как оба события происходят почти одновременно
  if (tooltip) {
    tooltip.remove();
    tooltip = false;
  }

}


function showTooltip(anchorElem, html) {
  let tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = html;
  document.body.append(tooltipElem);

  let coords = anchorElem.getBoundingClientRect();

  // позиционируем подсказку над центром элемента
  let left = coords.left + (anchorElem.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0;

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) {
    top = coords.top + anchorElem.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';

  return tooltipElem;
}

