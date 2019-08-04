/*
Название JavaScript
важность: 2

Используя конструкцию if..else, напишите код, который будет спрашивать: „Каково «официальное» название JavaScript?“

Если пользователь вводит «ECMAScript», то показать: «Верно!», в противном случае – отобразить: «Не знаете? ECMAScript!»
*/

const question = 'Каково «официальное» название JavaScript?';
const answer = prompt(question, '');

if (answer === 'ECMAScript') {
  console.log('Правильно!');
} else {
  console.log('Не знаете? ECMAScript!');
}
