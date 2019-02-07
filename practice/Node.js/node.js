import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';

/* Глобальные объекты */

// console.log(__filename);
// console.log(__dirname);

/* Функции, модули и require() */

// var x = 0;
// if (x == 0) {
//   console.log("Work");
// }
// for (let i = 0; i < 5; i++) {
//   console.log(i);
// }
// setTimeout(() => {
//   console.log("Привет!");
// }, 2000);
// function test() {
//   console.log("Привет!");
// }
// test();
// function call(func) {
//   func();
// }
// var printSomething = function() {
//   console.log("Просто текст");
// };
// call(printSomething);

/**Множественный вывод из модуля */

// var things = require("./things");
// console.log(things.array_counter([1, 7, 99, 8, 45, 8]));
// console.log(things.multiply(6, 4));
// console.log(things.some_value());

/**Ослеживание событий */

// const events = require('events');
// const myEmit = new events.EventEmitter();
// myEmit.on('some_event', function(text){
//     console.log(text);
// });
// myEmit.emit('some_event', 'Я обработчик событий!');

// var events = require('events');
// var util = require('util');
// var Cars = function(model){
//     this.model = model;
// };
// util.inherits(Cars, events.EventEmitter);
// var bmw = new Cars('BMW');
// var audi = new Cars('Audi');
// var volvo = new Cars('Volvo');
// var cars = [bmw, audi, volvo];
// cars.forEach(function(car){
//     car.on('speed', function(text){
//         console.log(car.model + ' speed is - ' + text);
//     });
// });
// bmw.emit('speed', '250 km');
// audi.emit('speed', '280 km');
// volvo.emit('speed', '210 km');

/**Написание и чтение файлов */

//sync
// var fs = require('fs');
// var file_read = fs.readFileSync('./Node.js/text.txt', 'utf8');
// console.log(file_read);
// var file_write = fs.writeFileSync('./Node.js/text2.txt', file_read);

//async
// var fs = require('fs');
// var file_read = fs.readFile('./Node.js/text.txt', 'utf8', function(err, data){
//      console.log(data);
//  });
//  fs.writeFile('./Node.js/text3.txt', 'some text', function(err, data){});
//  console.log('test');

/**Работа с директориями */

//Создание папки и файла внутри нее
// var fs = require('fs');
// fs.mkdir('./Node.js/new_folder', function(){
//     fs.writeFile('./Node.js/new_folder/new_file.txt', 'Some txt', function(){
//         console.log('File and folder is create');
//     });
// });

//Удаление папки и файла внутри нее
// var fs = require('fs');
// fs.unlink('./Node.js/new_folder/new_file.txt', function(){
//     fs.rmdir('./Node.js/new_folder', function(){
//         console.log('File anf folder is delete');
//     });
// });

/**Работа и создание сервера */

// var http = require("http");
// var server = http.createServer(function(req, res) {
//   console.log("URL страницы: " + req.url);
//   res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
//   res.end("Привет, мир!");
// });
// server.listen(1337, "127.0.0.1");

/**Работа с потоками */

//Обычное чтение большого файла
// var fs = require("fs");
// var read = fs.readFile("./Node.js/article.txt", "utf8", function(err, data) {
//     console.log(data);
// }); // 0.426 seconds

//Чтение с помощью потока
// var fs = require("fs");
// var read = fs.createReadStream(__dirname + "/article.txt", "utf8");
// read.on("data", function(chunk) {
//   console.log(chunk);
// }); // 0.338 seconds

//Чтение и запись потоком
// var fs = require('fs');
// var read = fs.createReadStream(__dirname + '/article.txt', 'utf8');
// var write = fs.createWriteStream(__dirname + '/news.txt');
// read.on('data', function(chunk){
//     console.log('Новые данные получены!');
//     write.write(chunk);
// });

/**Функция pipe(), работа с HTML и JSON */

//pipe
// var fs = require("fs");
// var readed = fs.createReadStream(__dirname + "/article.txt", "utf8");
// var writed = fs.createWriteStream(__dirname + "/news2.txt");
// readed.pipe(writed);
//pipe with server
// var http = require("http");
// var fs = require("fs");
// var server = http.createServer(function(req, res) {
//   console.log("Url this page: " + req.url);
//   res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
//   var readed = fs.createReadStream(__dirname + "/article.txt", "utf8");
//   readed.pipe(res);
// });
// server.listen(1337, "127.0.0.1");
// console.log("Server is running");

// Вывод индекс хтмл через пайп
// var http = require("http");
// var fs = require("fs");
// var server = http.createServer(function(req, res) {
//   console.log("Url this page: " + req.url);
//   res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//   var readed = fs.createReadStream(__dirname + "/index.html", "utf8");
//   readed.pipe(res);
// });
// server.listen(1337, "127.0.0.1");
// console.log("Server is running");

//JSON
// var http = require("http");
// var fs = require("fs");
// var server = http.createServer(function(req, res) {
//   console.log("Url this page: " + req.url);
//   res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
//  var Cars = {
//      model: 'Audi',
//      speed: '230 km',
//      wheels: 4
//  };
//  res.end(JSON.stringify(Cars));
// });
// server.listen(1337, "127.0.0.1");
// console.log("Server is running");

/**Маршрутизация */

// var fs = require("fs");
// var http = require("http");
// var server = http.createServer(function(req, res) {
//   console.log("Url this page: " + req.url);
//   if (req.url === "/index" || req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     fs.createReadStream(__dirname + "/index.html", "utf8").pipe(res);
//   } else {
//     res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
//     fs.createReadStream(__dirname + "/404.html", "utf8").pipe(res);
//   }
// });
// server.listen(1337, "127.0.0.1");

/**Эхо-сервер */

// // http://127.0.0.1/echo?message=Hello -> Hello
// var http = require('http');
// var url = require('url');
// var server = new http.Server(function(req, res){
// var urlParsed = url.parse(req.url, true);
// if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
//    res.setHeader('Cache-control', 'no-cache');
//     res.end(urlParsed.query.message);
// } else {
//     res.statusCode = 404; // Not Found
//     res.end('Page not found');
// }
// });
// server.listen(1337, '127.0.0.1');

/**Таймеры, отличия от браузера, ref/unref */

var http = require('http');
var serser = new http.Server(function (req, res){});