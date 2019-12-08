/**
 * Привет, object
важность: 5

Напишите код, выполнив задание из каждого пункта отдельной строкой:

    Создайте пустой объект user.
    Добавьте свойство name со значением John.
    Добавьте свойство surname со значением Smith.
    Измените значение свойства name на Pete.
    Удалите свойство name из объекта.

 */

// Создайте пустой объект user.
const user = {}; // или = new Object();
// Добавьте свойство name со значением John.
user.name = 'John'; // или user['name'] = ...;
// Добавьте свойство surname со значением Smith.
user.surname = 'Smith' // или user['surname'] = ...;
// Измените значение свойства name на Pete.
user.name = 'Pete' // или user['name'] = ...;
// Удалите свойство name из объекта.
delete user.name; // или ... user['name'];

console.log(user);
