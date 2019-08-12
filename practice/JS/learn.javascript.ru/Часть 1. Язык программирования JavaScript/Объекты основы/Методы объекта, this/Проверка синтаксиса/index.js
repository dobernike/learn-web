/**
 * Проверка синтаксиса
важность: 2

Каким будет результат выполнения этого кода?

let user = {
  name: "Джон",
  go: function() { alert(this.name) }
}

(user.go)()

P.S. Здесь есть подвох :)
 */

let user = {
  name: "Джон",
  go: function () { console.log(this.name) }
} //Ошибка появляется, потому что точка с запятой пропущена после user = {...}.

  (user.go)() 