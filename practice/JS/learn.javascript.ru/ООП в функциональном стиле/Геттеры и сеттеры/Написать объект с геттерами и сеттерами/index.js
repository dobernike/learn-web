// Написать объект с геттерами и сеттерами
// важность: 4

// Напишите конструктор User для создания объектов:

//     С приватными свойствами имя firstName и фамилия surname.
//     С сеттерами для этих свойств.
//     С геттером getFullName(), который возвращает полное имя.

// Должен работать так:

// function User() {
//   /* ваш код */
// }

// var user = new User();
// user.setFirstName("Петя");
// user.setSurname("Иванов");

// alert( user.getFullName() ); // Петя Иванов
// -------------------------------------------------------------------------- //
function User() {
  /* ваш код */
  //     С приватными свойствами имя firstName и фамилия surname.
  let firstName, surname;
  //     С сеттерами для этих свойств.
  this.setFirstName = function (newFirstName) {
    firstName = newFirstName;
  }

  this.setSurname = function (newSurname) {
    surname = newSurname;
  }
  //     С геттером getFullName(), который возвращает полное имя.
  this.getFullName = function () {
    return firstName + ' ' + surname;
  }
}

var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

console.log(user.getFullName()); // Петя Иванов

