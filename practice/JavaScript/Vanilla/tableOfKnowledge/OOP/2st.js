console.log("*** PERSON ***");
function Person(name) {
  this.name = name;
}
// Определяем свойства/методы
Person.prototype = {
  eyes: 2,
  mouth: 1,
  sleep: function() {
    return "zzz";
  }
};
// Создаем человека (Person)
const p1 = new Person("Nick");
// and we can do:
console.log(
  `name: ${p1.name}`,
  `eyes: ${p1.eyes}`,
  `mouth: ${p1.mouth}`,
  p1.sleep()
);
console.log("*** EMPLOYEE ***");
// Теперь, если у нас есть «класс» сотрудника, то можно наследовать его свойства.
function Employee(name, salary) {
  this.name = name;
  this.salary = salary;
}
// Прототип наследования
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee; // Устанавливаем его конструктор
// Повторяем то же самое
// Создаем сотрудника
const em1 = new Employee("John", 3000);
// и прописываем следующее:
console.log(
  `name: ${em1.name}`,
  `salary: ${em1.salary} USD`,
  `eyes: ${em1.eyes}`,
  `mouth: ${em1.mouth}`,
  em1.sleep()
);

class Person {
  constructor(name) {
    this.name = name;
    this.eyes = 2;
    this.mouth = 1;
  }
  sleep() {
    return "zzz";
  }
}
class Employee extends Person {
  constructor(name, salary) {
    super(name);
    this.salary = salary;
  }
}
const p1 = new Person("Nick");
// теперь можно сделать следующее:
console.log(
  `name: ${p1.name}`,
  `eyes: ${p1.eyes}`,
  `mouth: ${p1.mouth}`,
  p1.sleep()
);
// Создаем сотрудника
const em1 = new Employee("John", 3000);
// прописываем вот это:
console.log(
  `name: ${em1.name}`,
  `salary: ${em1.salary} USD`,
  `eyes: ${em1.eyes}`,
  `mouth: ${em1.mouth}`,
  em1.sleep()
);

class Dog {
  static whatIs() {
    return "A dog is a beautiful animal";
  }
}
// Со static мы можем получить доступ к методам без создания экземпляров нового объекта класса.
console.log(Dog.whatIs());

class Person {
  constructor(name, phone) {
    this.name = name;
    this._phone = phone;
  }
}
const p1 = new Person("John", 544342212);
// Но «phone» не является приватным свойством, поскольку с ним можно сделать следующее:
console.log(p1._phone);

// Private — это зарезервированное слово. Поэтому не пользуйтесь им в названии переменной.
const secret = new WeakMap();

class Person {
  constructor(name, phone) {
    this.name = name;
    secret.set(this, { _phonenumber: phone });
  }
}
const p1 = new Person("John", 544342212);
// Теперь phonenumber стало приватным свойством.
console.log(p1._phone); // Вывод на печать не определен

const secret = new WeakMap();
class Person {
  constructor(name, phone) {
    this.name = name;
    secret.set(this, { _phonenumber: phone });
  }
  get phoneNumber() {
    return secret.get(this)._phonenumber;
  }
  set phoneNumber(newNumber) {
    secret.get(this)._phonenumber = newNumber;
  }
}
const p1 = new Person("John", 544342212);
// Теперь мы можем получить доступ к phone через геттер:
console.log(p1.phoneNumber); // Печатаем номер
// Задаем новый номер
p1.phoneNumber = 432232323;
console.log(p1.phoneNumber); // Получаем новый номер

class Person {
  constructor(name) {
    this.name = name;
  }
  me() {
    return "My name is ${this.name}";
  }
}
const axel = new Person("Axel");
console.log(axel.me());
// ->  'My name is Axel'
class Employee extends Person {
  constructor(name, salary) {
    super(name);
    this.salary = salary;
  }
  me() {
    return `My name is ${this.name} and my salary is ${this.salary}`;
  }
}
const nick = new Employee("Nick", 3000);
console.log(nick.me());
// ->  'My name is Nick and my salary is 3000'
