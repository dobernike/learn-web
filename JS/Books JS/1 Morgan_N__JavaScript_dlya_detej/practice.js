// Много в браузере //

//Генератор случайных дразнилок

// var randomLangs = ["Js", "C#", "PHP"];
// var randomAdjectives = ["переменные", "массивы", "циклы"];
// var randomWords = ["пони", "junior", "устрица"];
// var randomLangs = randomLangs[Math.floor(Math.random() * randomLangs.length)];
// var randomAdjectives =
//   randomAdjectives[Math.floor(Math.random() * randomAdjectives.length)];
// var randomWords = randomWords[Math.floor(Math.random() * randomWords.length)];
// var randomResult =
//   "Ты на " +
//   randomLangs +
//   " создаешь " +
//   randomAdjectives +
//   " как " +
//   randomWords;
// console.log(randomResult);

// var array = [3,2,1];
// array = array.join(" больше, чем ");
// console.log(array);

// var cat = {
//     'legs': 3,
//     'name': 'Garmony',
//     'color': 'torque'
// };
// console.log(cat);

// var cat = {
//     legs: 3,
//     name: '',
//     color: 'torque'
// };
// console.log(cat);

// Объекты
// УПРАЖНЕНИЯ
// Попрактикуйтесь в использовании объектов, выполнив эти
// упражнения.

// #1. Подсчет очков
// Представьте, что вы играете в какую-нибудь игру со своими друзь-
// ями и вам нужно вести счет. Создайте для этого объект и назовите
// его scores. Пусть ключами будут имена ваших друзей, а значе-
// ниями — набранные ими очки (0 или больше). Счет игроков надо
// будет увеличивать по мере того, как они зарабатывают новые
// очки. Как вы будете менять счет игрока, хранящийся в объекте
// scores?

// var scores = {
//     Paul: 1,
//     Vladimir: 0,
//     Jane: 0
// };
// console.log(scores.Paul += 1);
// console.log(scores);

// #2. Вглубь объектов и массивов
// Пускай у вас есть такой объект:
// var myCrazyObject = {
// "name": "Нелепый объект",
// "some array": [7, 9, { purpose: "путаница", number: 123 }, 3.3],
// "random animal": "Банановая акула"
// };

// Как одной строкой JavaScript-кода извлечь из этого объекта
// число 123? Проверьте свое решение, запустив его в консоли.

// console.log(myCrazyObject["some array"][2].number);

// loops

//ПОПРОБУЙТЕ! Напишите цикл for, который печатает степени тройки, не превышающие 10 000 (программа должна выводить 3, 9, 27 и т. д.)

// for (var i = 3; i<10000; i*=3){
//     console.log(i);
// };

//Перепишите это задание, вместо for использовав цикл while. (Подсказка: установите начальное значение перед входом в цикл.)

// var counter = 1;
// while (counter < 10000){
//     counter*=3;
//     console.log(counter);
// }

//УПРАЖНЕНИЯ
// Выполните эти упражнения, чтобы попрактиковаться в работе с условными конструкциями и циклами.

// #1. Прекрасные животные Напишите цикл for, который изменяет массив животных, делая их прекрасными! Например, если есть следующий массив:
// var animals = ["Кот", "Рыба", "Лемур", "Комодский варан"];
// то ваш цикл должен сделать его таким:
// ["Кот - прекрасное животное", "Рыба - прекрасное животное", "Лемур - прекрасное животное", "Комодский варан - прекрасное животное"]
// Подсказка: вам понадобится переприсвоить значения для каждого индекса, то есть присвоить новые значения уже существующим элементам. Например, сделать первое животное прекрасным можно так:
// animals[0] = animals[0] + " - прекрасное животное";

// var animals = ['Cat', 'Fish', 'Lemur', 'Varan'];
// for (var i = 0; i<animals.length; i++){
//     animals[i]+=" - beauty animal";
// }
// console.log(animals);

// #2. Генератор случайных строк Напишите генератор случайных строк. Для этого вам понадобится строка со всеми буквами алфавита:
// var alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
// Чтобы выбирать из этой строки случайную букву, можно использовать примерно такой же код, как для генератора случайных дразнилок из третьей главы: Math.ﬂ
//  oor(Math.random() * alphabet.length). Так вы получите случайный индекс в строке. Затем, воспользовавшись квадратными скобками, можно получить символ по этому индексу. Начните создавать случайную строку с пустой строки (var randomString = ""). Затем добавьте цикл while и при каждом его повторе добавляйте в строку новый случайный символ — до тех пор, пока длина строки randomString не превысит шесть символов (или любой другой длины на ваш выбор).
//  Alphabet — алфавит
//  Random string — случайная строка
// Добавлять символ в конец строки можно с помощью оператора +=. После того как цикл закончит работу, выведите получившуюся строку в консоль, чтобы полюбоваться на свое творение!

// var alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
// var randomString = "";
// while(randomString.length<6){
//  randomString+=alphabet[Math.floor(Math.random() * alphabet.length)];
// }
// console.log(randomString);

// #3. h4ck3r sp34k Переведите англоязычный текст на «хакерский язык» (h4ck3r sp34k)! Многим в интернете нравится заменять некоторые буквы похожими на них числами — например, число «4» похоже на букву «A», «3» похоже на «E», «1» — на «I», а «0» — на «О». Хотя цифры напоминают скорее заглавные буквы, мы будем заменять ими буквы строчные. Чтобы перевести обычный текст на «хакерский язык», понадобится строка с исходным текстом и новая пустая строка для результата:
// var input = "javascript is awesome"; var output = "";
// Теперь воспользуйтесь циклом for, чтобы перебрать все символы исходной строки. Встретив букву «a», добавьте к результирующей строке «4». Встретив «e», добавьте «3», встретив «i», добавьте «1», а встретив «o» — «0». В противном случае просто добавляйте к результату исходный символ. И снова оператор += отлично подойдет для добавления символа в конец строки. После завершения цикла выведите результирующую строку в консоль. Если программа работает верно, вы должны увидеть следующее: "j4v4scr1pt 1s 4w3s0m3".

// var input = "javascript is awesome";
// var output = "";
// for (var i = 0; i<input.length; i++){
// if (input[i] == 'a'){
//     output += 4;
// } else if (input[i] == 'e'){
//     output += 3;
// } else if (input[i] == 'i'){
//     output += 1;
// } else if (input[i] == 'o'){
//     output += 0;
// } else {
// output += input[i];
// }
// }
// console.log(output);

// Глава 7 ПИШЕМ ИГРУ «ВИСЕЛИЦА»
// in handman.html

// Chapter 8 Function

// var ourFirtsFunction = function () {
//     console.log('Hello, world!');
// };
// ourFirtsFunction();

// var sayHelloTo = function(name){
//     console.log('Hello, ' + name + '!');
// };
// sayHelloTo('Paul');

// function drawCats(howManyTimes){
//     for (var i = 0; i< howManyTimes; i++){
//         console.log('=^.^=');
//     }
// }
// drawCats(100);

// var printMultipleTimes = function(howManyTimes, whatToDraw){
//     for (var i = 0; i<howManyTimes; i++){
//         console.log(whatToDraw);
//     }
// };
// printMultipleTimes(3, '=^-^=');

// var double = function (number) {
//     return number * 2;
// };
// console.log(double(3) + double(5));

// var pickRandomWord = function(words){
//     return words[Math.floor(Math.random() * words.length)];
// };
// var randomWords = ["Планета", "Червяк", "Цветок", "Компьютер"];
// console.log(pickRandomWord(randomWords));

// var generateRandomInsult = function(){
// var randomBodyParts = ["глаз", "нос", "череп"];
// var randomAdjectives = ["вонючая", "унылая", "дурацкая"];
// var randomWords = ["муха", "выдра", "дубина", "мартышка", "крыса"];
// var pickRandomWord = function(words){
//     return words[Math.floor(Math.random() * words.length)];};
//  var randomInsult = "У тебя " + pickRandomWord(randomBodyParts) + " словно " + pickRandomWord(randomAdjectives) + " " + pickRandomWord(randomWords) + "!!!";
//  return randomInsult;
// }
//  console.log(generateRandomInsult());

// Например, следующая функция возвращает строку с информацией о пятой букве вашего имени. Если в имени, переданном в аргументе name, меньше пяти букв, будет выполнен return, чтобы сразу же выйти из функции. При этом оператор return в конце функции (тот, что возвращает сообщение о пятой букве) так и не будет выполнен.

// var fithLetterOfYourName = function (name) {
//     if (name.length < 5) {
//         return;
//     }
//     return name[4];

// };
// console.log(fithLetterOfYourName('Paul'));

//Можно многократно использовать return внутри разных конструкций if, чтобы возвращать из функции разные значения в зависимости от входных данных. Предположим, вы пишете игру, в которой игроки награждаются медалями согласно набранным очкам. Счету меньше трех очков соответствует бронзовая медаль, счету от трех до шести — серебряная, а счету от семи и выше — золотая.

// var medalForScore = function (score) {
//     if (score < 3) {
//         return 'Бронзовая медаль';
//     }
//     if (score < 7) {
//         return 'Серебрянная медаль';
//     }
//     return 'Золотая медаль';

// };
// console.log(medalForScore(20));

// var double = function(number) {
//     return number * 2;
// };
// //or
// function double(number) {
//     return number * 2;
// }
//На техническом сленге длинная запись называется функциональным выражением, а короткая — объявлением функции.

//УПРАЖНЕНИЯ
// Выполните эти упражнения, чтобы попрактиковаться в использовании функций.

//#1. Математические расчеты и функции Создайте две функции, add и multiply; пусть каждая принимает по два аргумента. Функция add должна складывать аргументы и возвращать результат, а функция multiply — перемножать аргументы. С помощью только этих двух функций вычислите следующее несложное выражение:
//36325 * 9824 + 777 == 356 857 577

// function add(arg1, arg2){
// return arg1 + arg2;
// }

// function multiply(arg1, arg2){
// return arg1 * arg2;
// }

// console.log(add(multiply(36325, 9824), 777));

//#2. Совпадают ли массивы? Напишите функцию areArraysSame, которая принимает два массива с числами в качестве аргументов. Она должна возвращать true, если эти массивы одинаковые (то есть содержат одни и те же числа в одном и том же порядке), или false, если массивы различаются. Убедитесь, что ваша функция работает правильно, запустив такой код:
// areArraysSame([1, 2, 3], [4, 5, 6]); false areArraysSame([1, 2, 3], [1, 2, 3]); true areArraysSame([1, 2, 3], [1, 2, 3, 4]); false

// function areArraysSame(arr1, arr2) {
//   if (arr1.length === arr2.length) {
//     for (var i = 0; i < arr1.length; i++) {
//       if (arr1[i] === arr2[i]) {
       
//       } else {
//         return false;
//       }
//     }
//     return true;
//   }
//   return false;
// }
// console.log(areArraysSame([1, 2, 3], [4, 5, 6])); //false
// console.log(areArraysSame([1, 2, 3], [1, 2, 3])); // true
// console.log(areArraysSame([1, 2, 3], [1, 2, 3, 4])); // false

//