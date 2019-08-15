/**Отследить одновременное нажатие
важность: 5

Создайте функцию runOnKeys(func, code1, code2, ... code_n), которая запускает func при одновременном нажатии клавиш со скан-кодами code1, code2, …, code_n.

Например, код ниже выведет alertпри одновременном нажатии клавиш "Q" и "W" (в любом регистре, в любой раскладке)

runOnKeys(
  () => alert("Привет!"),
  "KeyQ",
  "KeyW"
); */

function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) { // все ли клавиши из набора нажаты?
      if (!pressed.has(code)) {
        return;
      }
    }

    // да, все

    // во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
    // при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
    // чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
    pressed.clear();

    func();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });

}

runOnKeys(
  () => alert("Привет!"),
  "KeyQ",
  "KeyW"
);
