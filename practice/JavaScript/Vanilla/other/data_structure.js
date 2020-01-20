// СПИСОК
class List {
  constructor() {
    this.memory = [];
    this.length = 0;
  }

  // O(1)
  get(address) {
    return this.memory[address];
  }

  // Push — Добавить значение в конец.
  // O(1)
  push(value) {
    this.memory[this.length] = value;
    this.length++;
  }

  // Pop — Удалить значение из конца.
  // O(1)
  pop() {
    // нет элементов - ничего не делаем
    if (this.length === 0) return;

    // Получаем последнее значение, перестаём его хранить, возвращаем его.
    var lastAddress = this.length - 1;
    var value = this.memory[lastAddress];
    delete this.memory[lastAddress];
    this.length--;

    // Возвращаем значение, чтобы его можно было использовать.
    return value;
  }

  // Unshift — Добавить значение в начало.
  // O(N)
  unshift(value) {
    // Сохраняем значение, которое хотим добавить в начало.
    var previous = value;

    // Проходимся по каждому элементу...
    for (var address = 0; address < this.length; address++) {
      // заменяя текущее значение "current" на предыдущее значение "previous",
      // и сохраняя значение "current" для следующей итерации.
      var current = this.memory[address];
      this.memory[address] = previous;
      previous = current;
    }

    // Добавляем последний элемент на новую позицию в конце списка.
    this.memory[this.length] = previous;
    this.length++;
  }

  // Shift — Удалить значение из начала.
  // O(N)
  shift() {
    // Нет элементов - ничего не делаем.
    if (this.length === 0) return;

    var value = this.memory[0];

    // Проходимся по каждому элементу, кроме последнего
    for (var address = 0; address < this.length - 1; address++) {
      // и заменяем его на следующий элемент списка.
      this.memory[address] = this.memory[address + 1];
    }

    // удаляем последний элемент, поскольку значение теперь в предыдущем адресе.
    delete this.memory[this.length - 1];
    this.length--;

    return value;
  }
}

// ХЕШ-ТАБЛИЦА
class HashTable {
  constructor() {
    this.memory = [];
  }

  hashKey(key) {
    var hash = 0;
    for (var index = 0; index < key.length; index++) {
      // Ма-а-а-агия.
      var code = key.charCodeAt(index);
      hash = ((hash << 5) - hash + code) | 0;
    }

    return hash;
  }

  // O(1)
  get(key) {
    // Сперва получим адрес по ключу
    var address = this.hashKey(key);
    // Затем просто вернем значение, находящееся по этому адресу
    return this.memory[address];
  }

  //O(1)
  set(key, value) {
    // и вновь начинаем с превращения ключа в адрес
    var address = this.hashKey(key);
    // Затем просто записываем значение по этому адресу
    this.memory[address] = value;
  }

  // O(1)
  remove(key) {
    // Как обычно, хешируем ключ, получая адрес
    var address = this.hashKey(key);
    // Удаляем значение, если оно существует
    if (this.memory[address]) {
      delete this.memory[address];
    }
  }
}

var hashTable = new HashTable();

hashTable.set("myKey", "myValue");
hashTable.get("myKey"); // >> 'myValue'

hashTable.hashKey("abc"); // => 96354
hashTable.hashKey("xyz"); // => 119193

// СТЕК
class Stack {
  constructor() {
    this.list = [];
    this.length = 0;
  }

  push(value) {
    this.length++;
    this.list.push(value);
  }

  pop() {
    // Нет элементов - ничего не делаем
    if (this.length === 0) return;

    // Возьмём последний элемент списка и вернём значение
    this.length--;
    return this.list.pop();
  }

  peek() {
    // Возвращаем последний элемент, не удаляя его
    return this.list[this.length - 1];
  }
}

// ОЧЕРЕДЬ
class Queue {
  constructor() {
    this.list = [];
    this.length = 0;
  }

  enqueue(value) {
    this.length++;
    this.list.push(value);
  }

  // O(N)
  dequeue() {
    // Нет элементов - ничего не делаем
    if (this.length === 0) return;

    // Убираем первый элемент методов shift и возвращает значение
    this.length--;
    return this.list.shift();
  }

  peek() {
    return this.list[0];
  }
}

// ГРАФ
class Graph {
  constructor() {
    this.nodes = [];
  }

  addNode(value) {
    this.nodes.push({
      value: value,
      lines: []
    });
  }

  find(value) {
    return this.nodes.find(node => node.value === value);
  }

  addLine(startValue, endValue) {
    // Найдём вершины для каждого из значений
    var startNode = this.find(startValue);
    var endNode = this.find(endValue);

    // Ругнёмся, если не нашли одной или другой
    if (!startNode || !endNode) {
      throw new Error("Обе вершины должны существовать");
    }

    // В стартовую вершину startNode добавим ссылку на конечную вершину endNode
    startNode.lines.push(endNode);
  }
}

var graph = new Graph();
graph.addNode(1);
graph.addNode(2);
graph.addLine(1, 2);
var two = graph.find(1).lines[0];

// СВЯЗНЫЙ СПИСОК
// Представление
// {
//   value: 1,
//   next: {
//       value: 2,
//       next: {
//           value: 3,
//           next: {...}
//       }
//   }
// }

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  get(position) {
    // Выведем ошибку, если искомая позиция превосходит число вершин в списке
    if (position >= this.length) {
      throw new Error("Позиция выходит за пределы списка");
    }

    // Начнём с головного элемента списка
    var current = this.head;

    // Пройдём по всем элементам при помощи node.next,
    // пока не достигнем требуемой позиции
    for (var index = 0; index < position; index++) {
      current = current.next;
    }

    // Вернём найденную вершину
    return current;
  }

  add(value, position) {
    // Сначала создадим вершину, содержащую значение
    var node = {
      value: value,
      next: null
    };

    // Нужно обработать частный случай, когда вершина вставляется в начало
    // Установим поле 'next' в текущий головной элемент и заменим
    // головной элемент нашей вершиной
    if (position === 0) {
      node.text = this.head;
      this.head = node;

      // Если мы добавляем вершину на любую другую позицию, мы должны вставить её
      // между текущей вершиной current и предыдущей previous
    } else {
      // Сперва найдем предыдущую и текущую вершины
      var pre = this.get(position - 1);
      var current = prev.next;
      // Затем вставим новую вершину между ними, установив поле 'next'
      // на текущую вершину current,
      // и поле 'next' предыдущей вершины previous - на вставляемую
      node.next = current;
      prev.next = node;
    }

    // И увеличим длину
    this.length++;
  }

  remove(position) {
    // Если мы удаляем головной элемент, просто переставим указатель head
    // на следующую вершину
    if (position === 0) {
      this.head = this.head.next;

      // Для остальных случаев требуется найти предыдущую вершину и поставить
      // в ней ссылку на вершину, следующую за текущей
    } else {
      var prev = this.get(position - 1);
      prev.next = prev.next.next;
    }

    // И затем уменьшим длину
    this.length--;
  }
}
