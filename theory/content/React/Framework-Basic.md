# "Framework Base Tools / Components and Props"

## React.Component

[https://ru.react.js.org/docs/react-component.html]

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}
```

Единственный метод, который вы должны определить в подклассе React.Component — render(). Все другие методы, описанные на этой странице, являются необязательными.

### Монтирование

Эти методы вызывают в следующем порядке, когда экземпляр компонента создаётся и добавляется в DOM:

constructor()
static getDerivedStateFromProps()
render()
componentDidMount()

### Обновление

Обновление может быть вызвано изменениями в свойствах или состоянии. Эти методы вызываются в следующем порядке, когда компонент повторно отрисовывается:

static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()

### Размонтирование

Этот метод вызывается, когда компонент удаляется из DOM:

componentWillUnmount()

### Обработка ошибок

Этот метод вызывается при возникновении ошибки во время отрисовки, в методе жизненного цикла или в конструкторе любого дочернего компонента.

static getDerivedStateFromError()
componentDidCatch()

### Другие API

Каждый компонент также предоставляет некоторые другие методы API:

setState()
forceUpdate()

### Свойства класса

defaultProps
displayName

### Свойства экземпляра

props
state

---

## Компоненты и свойства

[https://ru.react.js.org/docs/components-and-props.html]

### Функциональные и классовые компоненты

```jsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}
```

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}
```

Два вышеуказанных компонента эквивалентны с точки зрения React.

### Отрисовка компонента

```jsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(element, document.getElementById('root'));
```

Давайте посмотрим, что происходит в этом примере:

Мы вызываем ReactDOM.render() с элементом <Welcome name="Сара" />.
React вызывает компонент Welcome с объектом {name: 'Sara'} как props.
Наш компонент Welcome возвращает элемент <h1>Hello, Sara</h1> в качестве результата.
React DOM эффективно обновляет DOM, чтобы соответствовать <h1>Hello, Sara</h1>.

```
Примечание: Всегда называйте компоненты с заглавной буквы.

Если компонент начинается с маленькой буквы, React принимает его за DOM-тег. Например, <div /> это div-тег из HTML, а <Welcome /> это уже наш компонент Welcome, который должен быть в области видимости.
```

### Композиция компонентов

```jsx
function Welcome(props) {
  return <h1>Привет, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Алиса" />
      <Welcome name="Базилио" />
      <Welcome name="Буратино" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

В приложениях, написанных на React с нуля, как правило, есть один компонент App, который находится на самом верху. В случае, если вы переписываете существующее приложение на React, имеет смысл начать работу с маленького компонента типа Button и постепенно двигаться «вверх» по иерархии.

### Извлечение компонентов

Не бойтесь разбивать компоненты на части.

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img
          className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

Этот компонент представляет собой комментарий в социальной сети. Его пропсы включают в себя author (объект), text (строка), и date (дата).

С этим компонентом может быть не очень удобно работать из-за излишней вложенности. Мы также не можем повторно использовать его составные части. Давайте извлечём из него пару компонентов.

Для начала извлечём Avatar:

```jsx
function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}
```

Компоненту Avatar незачем знать, что он рендерится внутри Comment. Поэтому мы дали его пропу чуть менее конкретное имя — user, а не author.

Пропсы следует называть так, чтобы они имели смысл в первую очередь с точки зрения самого компонента, а уже во вторую тех компонентов, которые его рендерят.

Теперь можно немножко упростить наш Comment:

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">{props.author.name}</div>
      </div>
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

Следующим шагом извлечём компонент UserInfo, который рендерит Avatar рядом с именем пользователя:

```jsx
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}
```

Это позволит ещё сильнее упростить Comment:

```jsx
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
```

Извлечение компонентов может сначала показаться неблагодарной работой. Тем не менее, в больших приложениях очень полезно иметь палитру компонентов, которые можно многократно использовать. Если вы не уверены, извлекать компонент или нет, вот простое правило. Если какая-то часть интерфейса многократно в нём повторяется (Button, Panel, Avatar) или сама по себе достаточно сложная (App, FeedStory, Comment), имеет смысл её вынести в независимый компонент.

### Пропсы можно только читать

Компонент никогда не должен что-то записывать в свои пропсы — вне зависимости от того, функциональный он или классовый.

`React-компоненты обязаны вести себя как чистые функции по отношению к своим пропсам.`

---

## ReactBaseClasses.js

[https://github.com/facebook/react/blob/master/packages/react/src/ReactBaseClasses.js]

---

## ReactElement.js

[https://github.com/facebook/react/blob/2afeebdcc4ed8a78ab5b36792f768078d70e1ffd/packages/react/src/ReactElement.js#L175]

---

## Что такое Virtual DOM?

[https://habr.com/ru/post/256965/]

Главная проблема DOM — он никогда не был рассчитан для создания динамического пользовательского интерфейса (UI). Мы можем работать с ним, используя JavaScript и библиотеки наподобие jQuery, но их использование не решает проблем с производительностью.
Посмотрите на современные социальные сети, такие как Twitter, Facebook или Pinterest.
После небольшого скроллинга, мы будем иметь десятки тысяч DOM-узлов, эффективно взаимодействовать с которыми — задача не из легких.

Для примера, попробуйте переместить 1000 div-блоков на 5 пикселей влево.
Это может занять больше секунды — это слишком много для современного интернета. Вы можете оптимизировать скрипт и использовать некоторые приемы, но в итоге это вызовет лишь головную боль при работе с огромными страницами и динамическим UI.

Вместо того, чтобы взаимодействовать с DOM напрямую, мы работаем с его легковесной копией. Мы можем вносить изменения в копию, исходя из наших потребностей, а после этого применять изменения к реальному DOM.
При этом происходит сравнение DOM-дерева с его виртуальной копией, определяется разница и запускается перерисовка того, что было изменено.

Но только если мы делаем это правильно. Есть две проблемы: когда именно делать повторную перерисовку DOM и как это сделать эффективно.

Когда?
Когда данные изменяются и нуждается в обновлении.
Есть два варианта узнать, что данные изменились:
Первый из них — «dirty checking» (грязная проверка) заключается в том, чтобы опрашивать данные через регулярные промежутки времени и рекурсивно проверять все значения в структуре данных.
Второй вариант — «observable» (наблюдаемый) заключается в наблюдении за изменением состояния. Если ничего не изменилось, мы ничего не делаем. Если изменилось, мы точно знаем, что нужно обновить.

Как?
Что делает этот подход действительно быстрым:
Эффективные алгоритмы сравнения
Группировка операций чтения/записи при работе с DOM
Эффективное обновление только под-деревьев

React создает легковесное дерево из JavaScript-объектов для имитации DOM-дерева. Затем он создает из них HTML, который вставляется или добавляется к нужному DOM-элементу, что вызывает перерисовку страницы в браузере.

Вывод

Virtual DOM — это техника и набор библиотек / алгоритмов, которые позволяют нам улучшить производительность на клиентской стороне, избегая прямой работы с DOM путем работы с легким JavaScript-объектом, имитирующем DOM-дерево.

---

## Композиция в сравнении с наследованием
[https://ru.react.js.org/docs/composition-vs-inheritance.html]

У React мощная модель композиции, и мы рекомендуем использовать композицию вместо наследования для повторного использования кода между компонентами.

### Меры предосторожности

Некоторые компоненты не знают заранее о своих дочерних элементах. Это особенно характерно для таких компонентов, как Sidebar или Dialog, которые представляют собой общие «ящики» (либо контейнеры).
Мы рекомендуем для таких компонентов использовать специальное свойство children для передачи дочерних элементов непосредственно в их вывод:

```jsx
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

Это позволяет другим компонентам передавать им произвольные дочерние элементы, путём вложения в JSX:

```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Добро пожаловать!
      </h1>
      <p className="Dialog-message">
        Спасибо, что посетили наш космический корабль!
      </p>
    </FancyBorder>
  );
}
```

Хотя это менее распространено, иногда вам может понадобиться несколько «каналов вставки» в компоненте. В таких случаях вы можете придумать собственное соглашение вместо использования children:

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

React-элементы, такие как <Contacts /> и <Chat />, — это просто объекты, поэтому вы можете передавать их как свойства, как любые другие данные. Этот подход может напомнить вам о «слотах» в других библиотеках (например, во Vue.js — прим. пер.), но нет никаких ограничений на то, что вы можете передавать в качестве свойства в React.

### Специализация

Иногда мы рассматриваем компоненты как «частные случаи» других компонентов. Например, мы можем полагать, что WelcomeDialog является частным случаем Dialog.

В React это также достигается путём композиции, где более «конкретный» компонент отрисовывает более «общий» и настраивает его с помощью свойств:

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Добро пожаловать"
      message="Спасибо, что посетили наш космический корабль!" />
  );
}
```

Композиция работает одинаково хорошо для компонентов, определённых в виде классов:

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Программа исследования Марса"
              message="Как мы должны обращаться к вам?">
        <input value={this.state.login}
               onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>
          Зарегистрируй меня!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Добро пожаловать на борт, ${this.state.login}!`);
  }
}
```

### А что насчёт наследования?

В Facebook мы используем React в тысячах компонентов, и мы не обнаружили каких-либо случаев использования, где мы бы порекомендовали создавать иерархии наследования компонентов.

Если вы хотите повторно использовать функциональность, отличную от пользовательского интерфейса, между компонентами, мы предлагаем извлечь её в отдельный модуль JavaScript. Компоненты могут импортировать его и использовать эту функцию, объект или класс, без расширения (наследования).

---

## Why Do We Write super(props)?
[https://overreacted.io/why-do-we-write-super-props/]

I wrote super(props) more times in my life than I’d like to know:

```jsx
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true };
  }
  // ...
}
```

Of course, the class fields proposal lets us skip the ceremony:

```jsx
class Checkbox extends React.Component {
  state = { isOn: true };
  // ...
}
```

Why do we call super? Can we not call it? If we have to call it, what happens if we don’t pass props? Are there any other arguments? Let’s find out.

In JavaScript, super refers to the parent class constructor. (In our example, it points to the React.Component implementation.)

Importantly, you can’t use this in a constructor until after you’ve called the parent constructor. JavaScript won’t let you:

```jsx
class Checkbox extends React.Component {
  constructor(props) {
    // 🔴 Can’t use `this` yet
    super(props);
    // ✅ Now it’s okay though
    this.state = { isOn: true };
  }
  // ...
}
```

There’s a good reason for why JavaScript enforces that parent constructor runs before you touch this. Consider a class hierarchy:

```jsx
class Person {
  constructor(name) {
    this.name = name;
  }
}

class PolitePerson extends Person {
  constructor(name) {
    this.greetColleagues(); // 🔴 This is disallowed, read below why
    super(name);
  }
  greetColleagues() {
    alert('Good morning folks!');
  }
}
```

Imagine using this before super call was allowed. A month later, we might change greetColleagues to include the person’s name in the message:

```jsx
 greetColleagues() {
    alert('Good morning folks!');
    alert('My name is ' + this.name + ', nice to meet you!');
  }
```

You might think that passing props down to super is necessary so that the base React.Component constructor can initialize this.props:

```jsx
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}
```

But somehow, even if you call super() without the props argument, you’ll still be able to access this.props in the render and other methods. (If you don’t believe me, try it yourself!)

How does that work? It turns out that React also assigns props on the instance right after calling your constructor:

```jsx
 // Inside React
  const instance = new YourComponent(props);
  instance.props = props;
```

So even if you forget to pass props to super(), React would still set them right afterwards. There is a reason for that.

```jsx
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}

// Inside your code
class Button extends React.Component {
  constructor(props) {
    super(); // 😬 We forgot to pass props
    console.log(props);      // ✅ {}
    console.log(this.props); // 😬 undefined 
  }
  // ...
}
```

It can be even more challenging to debug if this happens in some method that’s called from the constructor. And that’s why I recommend always passing down super(props), even though it isn’t strictly necessary:

```jsx
class Button extends React.Component {
  constructor(props) {
    super(props); // ✅ We passed props
    console.log(props);      // ✅ {}
    console.log(this.props); // ✅ {}
  }
  // ...
}
```

This ensures this.props is set even before the constructor exits.

---

## How Does React Tell a Class from a Function?
[https://overreacted.io/how-does-react-tell-a-class-from-a-function/]

```jsx
function Greeting() {
  return <p>Hello</p>;
}

class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}
```

When you want to render a <Greeting />, you don’t care how it’s defined:

```jsx
// Class or function — whatever.
<Greeting />
```

But React itself cares about the difference!

If Greeting is a function, React needs to call it:

```jsx
// Your code
function Greeting() {
  return <p>Hello</p>;
}

// Inside React
const result = Greeting(props); // <p>Hello</p>
```

But if Greeting is a class, React needs to instantiate it with the new operator and then call the render method on the just created instance:

```jsx
// Your code
class Greeting extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

// Inside React
const instance = new Greeting(props); // Greeting {}
const result = instance.render(); // <p>Hello</p>
```

In both cases React’s goal is to get the rendered node (in this example, <p>Hello</p>). But the exact steps depend on how Greeting is defined.

---
