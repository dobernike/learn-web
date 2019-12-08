<!-- createTextNode vs innerHTML vs textContent
важность: 5

У нас есть пустой DOM-элемент elem и строка text.

Какие из этих 3-х команд работают одинаково?

    elem.append(document.createTextNode(text))
    elem.innerHTML = text
    elem.textContent = text
 -->

 1 и 3, 2-ой добавляет html