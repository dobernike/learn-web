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
      <h1 className="Dialog-title">Добро пожаловать!</h1>
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
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  );
}

function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />;
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
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Добро пожаловать"
      message="Спасибо, что посетили наш космический корабль!"
    />
  );
}
```

Композиция работает одинаково хорошо для компонентов, определённых в виде классов:

```jsx
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">{props.title}</h1>
      <p className="Dialog-message">{props.message}</p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = { login: '' };
  }

  render() {
    return (
      <Dialog
        title="Программа исследования Марса"
        message="Как мы должны обращаться к вам?"
      >
        <input value={this.state.login} onChange={this.handleChange} />

        <button onClick={this.handleSignUp}>Зарегистрируй меня!</button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({ login: e.target.value });
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
    console.log(props); // ✅ {}
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
    console.log(props); // ✅ {}
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

## Why Do React Elements Have a \$\$typeof Property

[https://overreacted.io/why-do-react-elements-have-typeof-property/]

You might think you’re writing JSX:

```jsx
<marquee bgcolor="#ffa7c4">hi</marquee>
```

But really, you’re calling a function:

```jsx
React.createElement(
  /* type */ 'marquee',
  /* props */ { bgcolor: '#ffa7c4' },
  /* children */ 'hi'
);
```

And that function gives you back an object. We call this object a React element. It tells React what to render next. Your components return a tree of them.

```jsx
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'), // 🧐 Who dis
}
```

if your server has a hole that lets the user store an arbitrary JSON object while the client code expects a string, this could become a problem:

```jsx
// Server could have a hole that lets user store JSON
let expectedTextButGotJSON = {
  type: 'div',
  props: {
    dangerouslySetInnerHTML: {
      __html: '/* put your exploit here */',
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// Dangerous in React 0.13
<p>{message.text}</p>;
```

In that case, React 0.13 would be vulnerable to an XSS attack. To clarify, again, this attack depends on an existing server hole. Still, React could do a better job of protecting people against it. And starting with React 0.14, it does.

The fix in React 0.14 was to tag every React element with a Symbol:

```jsx
{
  type: 'marquee',
  props: {
    bgcolor: '#ffa7c4',
    children: 'hi',
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element'),
}
```

This works because you can’t just put Symbols in JSON. So even if the server has a security hole and returns JSON instead of text, that JSON can’t include Symbol.for('react.element'). React will check element.\$\$typeof, and will refuse to process the element if it’s missing or invalid.

---

# "Framework Architecture State and Lifecycle"

## Состояние и жизненный цикл

[https://ru.reactjs.org/docs/state-and-lifecycle.html]

### Преобразование функционального компонента в классовый

1. Создаём ES6-класс с таким же именем, указываем React.Component в качестве родительского класса
2. Добавим в класс пустой метод render()
3. Перенесём тело функции в метод render()
4. Заменим props на this.props в теле render()
5. Удалим оставшееся пустое объявление функции

### Добавим внутреннее состояние в класс

1. Заменим this.props.date на this.state.date в методе render():

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

2. Добавим конструктор класса, в котором укажем начальное состояние в переменной this.state:

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Привет, мир!</h1>
        <h2>Сейчас {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

3. Удалим проп date из элемента <Clock />:

```jsx
ReactDOM.render(<Clock />, document.getElementById('root'));
```

### Добавим методы жизненного цикла в класс

В приложениях с множеством компонентов очень важно освобождать используемые системные ресурсы когда компоненты удаляются.

Метод componentDidMount() запускается после того, как компонент отрендерился в DOM — здесь мы и установим таймер:

```jsx
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Поля this.props и this.state в классах особенные, и их устанавливает сам React. Вы можете вручную добавить новые поля, если компоненту нужно хранить дополнительную информацию (например, ID таймера).

Теперь нам осталось сбросить таймер в методе жизненного цикла componentWillUnmount():

```jsx
componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

Давайте рассмотрим наше решение и разберём порядок, в котором вызываются методы:

1. Когда мы передаём <Clock /> в ReactDOM.render(), React вызывает конструктор компонента. Clock должен отображать текущее время, поэтому мы задаём начальное состояние this.state объектом с текущим временем.
2. React вызывает метод render() компонента Clock. Таким образом React узнаёт, что отобразить на экране. Далее, React обновляет DOM так, чтобы он соответствовал выводу рендера Clock.
3. Как только вывод рендера Clock вставлен в DOM, React вызывает метод жизненного цикла componentDidMount(). Внутри него компонент Clock указывает браузеру установить таймер, который будет вызывать tick() раз в секунду.
4. Таймер вызывает tick() ежесекундно. Внутри tick() мы просим React обновить состояние компонента, вызывая setState() с текущим временем. React реагирует на изменение состояния и снова запускает render(). На этот раз this.state.date в методе render() содержит новое значение, поэтому React заменит DOM. Таким образом компонент Clock каждую секунду обновляет UI.
5. Если компонент Clock когда-либо удалится из DOM, React вызовет метод жизненного цикла componentWillUnmount() и сбросит таймер.

### Как правильно использовать состояние

Важно знать три детали о правильном применении setState().

#### Не изменяйте состояние напрямую

В следующем примере повторного рендера не происходит:

```jsx
// Неправильно
this.state.comment = 'Привет';
```

Вместо этого используйте setState():

```jsx
// Правильно
this.setState({ comment: 'Привет' });
```

Конструктор — это единственное место, где вы можете присвоить значение this.state напрямую.

#### Обновления состояния могут быть асинхронными

React может сгруппировать несколько вызовов setState() в одно обновление для улучшения производительности.

Поскольку this.props и this.state могут обновляться асинхронно, вы не должны полагаться на их текущее значение для вычисления следующего состояния.

Например, следующий код может не обновить счётчик:

```jsx
// Неправильно
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Правильно будет использовать второй вариант вызова setState(), который принимает функцию, а не объект. Эта функция получит предыдущее состояние в качестве первого аргумента и значения пропсов непосредственно во время обновления в качестве второго аргумента:

```jsx
// Правильно
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
```

#### Обновления состояния объединяются

Когда мы вызываем setState(), React объединит аргумент (новое состояние) c текущим состоянием.

```jsx
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Состояния объединяются поверхностно, поэтому вызов this.setState({comments}) оставляет this.state.posts нетронутым, но полностью заменяет this.state.comments.

#### Однонаправленный поток данных

В иерархии компонентов, ни родительский, ни дочерние компоненты не знают, задано ли состояние другого компонента. Также не важно, как был создан определённый компонент — с помощью функции или класса.

Состояние часто называют «локальным», «внутренним» или инкапсулированным. Оно доступно только для самого компонента и скрыто от других.

Компонент FormattedDate получает date через пропсы, но он не знает, откуда они взялись изначально — из состояния Clock, пропсов Clock или просто JavaScript-выражения:

```jsx
function FormattedDate(props) {
  return <h2>Сейчас {props.date.toLocaleTimeString()}.</h2>;
}
```

Этот процесс называется «нисходящим» («top-down») или «однонаправленным» («unidirectional») потоком данных. Состояние всегда принадлежит определённому компоненту, а любые производные этого состояния могут влиять только на компоненты, находящиеся «ниже» в дереве компонентов.

Если представить иерархию компонентов как водопад пропсов, то состояние каждого компонента похоже на дополнительный источник, который сливается с водопадом в произвольной точке, но также течёт вниз.

В React-приложениях, имеет ли компонент состояние или нет — это внутренняя деталь реализации компонента, которая может меняться со временем. Можно использовать компоненты без состояния в компонентах с состоянием, и наоборот.

---

## React Component Lifecycle Old vs New

[https://medium.com/@kartikag01/react-component-lifecycle-old-vs-new-32757aee5850]

Methods Deprecated in 16.4
componentWillMount()
componentWillReceiveProps()
componentWillUpdate()
New Methods introduced
getDerivedStateFromProps()
getSnapshotBeforeUpdate()

componentWillMount() → UNSAFE_componentWillMount()
componentWillReceiveProps() → UNSAFE_componentWillReceiveProps()
componentWillUpdate() → UNSAFE_componentWillUpdate()

---

## How Does setState Know What to Do?

[https://overreacted.io/how-does-setstate-know-what-to-do/]

The answer is that every renderer sets a special field on the created class. This field is called updater. It’s not something you would set — rather, it’s something React DOM, React DOM Server or React Native set right after creating an instance of your class:

```jsx
// Inside React DOM
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMUpdater;

// Inside React DOM Server
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactDOMServerUpdater;

// Inside React Native
const inst = new YourComponent();
inst.props = props;
inst.updater = ReactNativeUpdater;
```

Looking at the setState implementation in React.Component, all it does is delegate work to the renderer that created this component instance:

```jsx
// A bit simplified
setState(partialState, callback) {
  // Use the `updater` field to talk back to the renderer!
  this.updater.enqueueSetState(this, partialState, callback);
}
```

React DOM Server might want to ignore a state update and warn you, whereas React DOM and React Native would let their copies of the reconciler handle it.

And this is how this.setState() can update the DOM even though it’s defined in the React package. It reads this.updater which was set by React DOM, and lets React DOM schedule and handle the update.

We know about classes now, but what about Hooks?

Instead of an updater field, Hooks use a “dispatcher” object. When you call React.useState(), React.useEffect(), or another built-in Hook, these calls are forwarded to the current dispatcher.

```jsx
// In React (simplified a bit)
const React = {
  // Real property is hidden a bit deeper, see if you can find it!
  __currentDispatcher: null,

  useState(initialState) {
    return React.__currentDispatcher.useState(initialState);
  },

  useEffect(initialState) {
    return React.__currentDispatcher.useEffect(initialState);
  },
  // ...
};
```

```jsx
// In React DOM
const prevDispatcher = React.__currentDispatcher;
React.__currentDispatcher = ReactDOMDispatcher;
let result;
try {
  result = YourComponent(props);
} finally {
  // Restore it back
  React.__currentDispatcher = prevDispatcher;
}
```

---

## React as a UI Runtime

[https://overreacted.io/react-as-a-ui-runtime/]

### Host Tree

React programs usually output a tree that may change over time. It might be a DOM tree, an iOS hierarchy, a tree of PDF primitives, or even of JSON objects.

A specialized tool works better than a generic one when it can impose and benefit from particular constraints. React makes a bet on two principles:

- Stability. The host tree is relatively stable and most updates don’t radically change its overall structure. If an app rearranged all its interactive elements into a completely different combination every second, it would be difficult to use. Where did that button go? Why is my screen dancing?
- Regularity. The host tree can be broken down into UI patterns that look and behave consistently (such as buttons, lists, avatars) rather than random shapes.

These principles happen to be true for most UIs. However, React is ill-suited when there are no stable “patterns” in the output. For example, React may help you write a Twitter client but won’t be very useful for a 3D pipes screensaver.

### Renderers

A renderer teaches React to talk to a specific host environment and manage its host instances. React DOM, React Native, and even Ink are React renderers. You can also create your own React renderer.

### React Elements

In the host environment, a host instance (like a DOM node) is the smallest building block. In React, the smallest building block is a React element.

A React element is a plain JavaScript object. It can describe a host instance.

A React element is lightweight and has no host instance tied to it. Again, it is merely a description of what you want to see on the screen.

Like host instances, React elements can form a tree:

```jsx
// JSX is a syntax sugar for these objects.
// <dialog>
//   <button className="blue" />
//   <button className="red" />
// </dialog>
{
  type: 'dialog',
  props: {
    children: [{
      type: 'button',
      props: { className: 'blue' }
    }, {
      type: 'button',
      props: { className: 'red' }
    }]
  }
}
```

However, remember that React elements don’t have their own persistent identity. They’re meant to be re-created and thrown away all the time.

I like to think of React elements as being like frames in a movie. They capture what the UI should look like at a specific point in time. They don’t change.

### Entry Point

Each React renderer has an “entry point”. It’s the API that lets us tell React to render a particular React element tree inside a container host instance.

For example, React DOM entry point is ReactDOM.render:

```jsx
ReactDOM.render(
  // { type: 'button', props: { className: 'blue' } }
  <button className="blue" />,
  document.getElementById('container')
);
```

When we say ReactDOM.render(reactElement, domContainer), we mean: “Dear React, make the domContainer host tree match my reactElement.”

React will look at the reactElement.type (in our example, 'button') and ask the React DOM renderer to create a host instance for it and set the properties:

```jsx
// Somewhere in the ReactDOM renderer (simplified)
function createHostInstance(reactElement) {
  let domNode = document.createElement(reactElement.type);
  domNode.className = reactElement.props.className;
  return domNode;
}
```

In our example, effectively React will do this:

```jsx
let domNode = document.createElement('button');
domNode.className = 'blue';

domContainer.appendChild(domNode);
```

If the React element has child elements in reactElement.props.children, React will recursively create host instances for them too on the first render.

### Reconciliation

What happens if we call ReactDOM.render() twice with the same container?

Again, React’s job is to make the host tree match the provided React element tree. The process of figuring out what to do to the host instance tree in response to new information is sometimes called reconciliation.

If an element type in the same place in the tree “matches up” between the previous and the next renders, React reuses the existing host instance.

```jsx
// let domNode = document.createElement('button');
// domNode.className = 'blue';
// domContainer.appendChild(domNode);
ReactDOM.render(
  <button className="blue" />,
  document.getElementById('container')
);

// Can reuse host instance? Yes! (button → button)
// domNode.className = 'red';
ReactDOM.render(
  <button className="red" />,
  document.getElementById('container')
);

// Can reuse host instance? No! (button → p)
// domContainer.removeChild(domNode);
// domNode = document.createElement('p');
// domNode.textContent = 'Hello';
// domContainer.appendChild(domNode);
ReactDOM.render(<p>Hello</p>, document.getElementById('container'));

// Can reuse host instance? Yes! (p → p)
// domNode.textContent = 'Goodbye';
ReactDOM.render(<p>Goodbye</p>, document.getElementById('container'));
```

The same heuristic is used for child trees. For example, when we update a <dialog> with two <button>s inside, React first decides whether to re-use the <dialog>, and then repeats this decision procedure for each child.

### Conditions

```jsx
function Form({ showMessage }) {
  let message = null;
  if (showMessage) {
    message = {
      type: 'p',
      props: { children: 'I was just added here!' },
    };
  }
  return {
    type: 'dialog',
    props: {
      children: [message, { type: 'input', props: {} }],
    },
  };
}
```

Regardless of whether showMessage is true or false, the <input> is the second child and doesn’t change its tree position between renders.

If showMessage changes from false to true, React would walk the element tree, comparing it with the previous version:

dialog → dialog: Can reuse the host instance? Yes — the type matches.

(null) → p: Need to insert a new p host instance.
input → input: Can reuse the host instance? Yes — the type matches.
And the code executed by React would be similar to this:

```jsx
let inputNode = dialogNode.firstChild;
let pNode = document.createElement('p');
pNode.textContent = 'I was just added here!';
dialogNode.insertBefore(pNode, inputNode);
```

### Lists

So instead of re-ordering them, React would effectively update each of them. This can create performance issues and possible bugs. For example, the content of the first input would stay reflected in first input after the sort — even though conceptually they might refer to different products in your shopping list!

This is why React nags you to specify a special property called key every time you include an array of elements in your output:

```jsx
function ShoppingList({ list }) {
  return (
    <form>
      {list.map((item) => (
        <p key={item.productId}>
          You bought {item.name}
          <br />
          Enter how many do you want: <input />
        </p>
      ))}
    </form>
  );
}
```

What’s a good value for a key? An easy way to answer this is to ask: when would you say an item is the “same” even if the order changed? For example, in our shopping list, the product ID uniquely identifies it between siblings.

### Components

```jsx
function Form({ showMessage }) {
  let message = null;
  if (showMessage) {
    message = <p>I was just added here!</p>;
  }
  return (
    <dialog>
      {message}
      <input />
    </dialog>
  );
}
```

They are called components. They let us create our own “toolbox” of buttons, avatars, comments, and so on. Components are the bread and butter of React.

Components take one argument — an object hash. It contains “props” (short for “properties”). Here, showMessage is a prop. They’re like named arguments.

### Purity

React components are assumed to be pure with respect to their props.

```jsx
function Button(props) {
  // 🔴 Doesn't work
  props.isActive = true;
}
```

In general, mutation is not idiomatic in React. (We’ll talk more about the idiomatic way to update the UI in response to events later.)

### Recursion

How do we use components from other components? Components are functions so we could call them:

```jsx
let reactElement = Form({ showMessage: true });
ReactDOM.render(reactElement, domContainer);
```

However, this is not the idiomatic way to use components in the React runtime.

. This means that you don’t directly call the component function, but instead let React later do it for you:

```jsx
// { type: Form, props: { showMessage: true } }
let reactElement = <Form showMessage={true} />;
ReactDOM.render(reactElement, domContainer);
```

And somewhere inside React, your component will be called:

```jsx
// Somewhere inside React
let type = reactElement.type; // Form
let props = reactElement.props; // { showMessage: true }
let result = type(props); // Whatever Form returns
```

Component function names are by convention capitalized. When the JSX transform sees <Form> rather than <form>, it makes the object type itself an identifier rather than a string:

```jsx
console.log((<form />).type); // 'form' string
console.log((<Form />).type); // Form function
```

There is no global registration mechanism — we literally refer to Form by name when typing <Form />. If Form doesn’t exist in local scope, you’ll see a JavaScript error just like you normally would with a bad variable name.

Okay, so what does React do when an element type is a function? It calls your component, and asks what element that component wants to render.

You: ReactDOM.render(<App />, domContainer)
React: Hey App, what do you render to?

App: I render <Layout> with <Content> inside.
React: Hey Layout, what do you render to?

Layout: I render my children in a <div>. My child was <Content> so I guess that goes into the <div>.
React: Hey <Content>, what do you render to?

Content: I render an <article> with some text and a <Footer> inside.
React: Hey <Footer>, what do you render to?

Footer: I render a <footer> with some more text.
React: Okay, here you go:

```jsx
// Resulting DOM structure
<div>
  <article>
    Some text
    <footer>some more text</footer>
  </article>
</div>
```

### Inversion of Control

You might be wondering: why don’t we just call components directly? Why write <Form /> rather than Form()?

React can do its job better if it “knows” about your components rather than if it only sees the React element tree after recursively calling them.

```jsx
// 🔴 React has no idea Layout and Article exist.
// You're calling them.
ReactDOM.render(Layout({ children: Article() }), domContainer);

// ✅ React knows Layout and Article exist.
// React calls them.
ReactDOM.render(
  <Layout>
    <Article />
  </Layout>,
  domContainer
);
```

This is a classic example of inversion of control. There’s a few interesting properties we get by letting React take control of calling our components:

- Components become more than functions
- Component types participate in the reconciliation
- React can delay the reconciliation
- A better debugging story

### Lazy Evaluation

(<A><B /></A> in JSX is the same as <A children={<B />} />.)

### State

```jsx
function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

It returns a pair of values: the current state and a function that updates it.

### Consistency

React splits all work into the “render phase” and the “commit phase”. Render phase is when React calls your components and performs reconciliation. It is safe to interrupt and in the future will be asynchronous. Commit phase is when React touches the host tree. It is always synchronous.

### Memoization

```jsx
function Row({ item }) {
  // ...
}

export default React.memo(Row);
```

React intentionally doesn’t memoize components by default. Many components always receive different props so memoizing them would be a net loss.

### Raw Models

Note that there are common performance issues that even fine-grained subscriptions and “reactivity” systems can’t solve. For example, rendering a new deep tree (which happens on every page transition) without blocking the browser. Change tracking doesn’t make it faster — it makes it slower because we have to do more work to set up subscriptions. Another problem is that we have to wait for data before we can start rendering the view. In React, we aim to solve both of these problems with Concurrent Rendering.

### Batching

```jsx
function Parent() {
  let [count, setCount] = useState(0);
  return (
    <div onClick={() => setCount(count + 1)}>
      Parent clicked {count} times
      <Child />
    </div>
  );
}

function Child() {
  let [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Child clicked {count} times
    </button>
  );
}
```

When an event is dispatched, the child’s onClick fires first (triggering its setState). Then the parent calls setState in its own onClick handler.

If React immediately re-rendered components in response to setState calls, we’d end up rendering the child twice:

```
*** Entering React's browser click event handler ***
Child (onClick)
  - setState
  - re-render Child // 😞 unnecessary
Parent (onClick)
  - setState
  - re-render Parent
  - re-render Child
*** Exiting React's browser click event handler ***
```

This is why React batches updates inside event handlers:

```
*** Entering React's browser click event handler ***
Child (onClick)
  - setState
Parent (onClick)
  - setState
*** Processing state updates                     ***
  - re-render Parent
  - re-render Child
*** Exiting React's browser click event handler  ***
```

Batching is good for performance but can be surprising if you write code like:

```jsx
const [count, setCount] = useState(0);

function increment() {
  setCount(count + 1);
}

function handleClick() {
  increment();
  increment();
  increment();
}
```

If we start with count set to 0, these would just be three setCount(1) calls. To fix this, setState provides an overload that accepts an “updater” function:

```jsx
const [count, setCount] = useState(0);

function increment() {
  setCount((c) => c + 1);
}

function handleClick() {
  increment();
  increment();
  increment();
}
```

React would put the updater functions in a queue, and later run them in sequence, resulting in a re-render with count set to 3.

When state logic gets more complex than a few setState calls, I recommend expressing it as a local state reducer with the useReducer Hook. It’s like an evolution of this “updater” pattern where each update is given a name:

```jsx
const [counter, dispatch] = useReducer((state, action) => {
  if (action === 'increment') {
    return state + 1;
  } else {
    return state;
  }
}, 0);

function handleClick() {
  dispatch('increment');
  dispatch('increment');
  dispatch('increment');
}
```

The action argument can be anything, although an object is a common choice.

### Call Tree

Of course, React itself runs in JavaScript and obeys JavaScript rules. But we can imagine that internally React has some kind of its own call stack to remember which component we are currently rendering, e.g. [App, Page, Layout, Article /* we're here */].

These “call tree” frames are destroyed along with their local state and host instances, but only when the reconciliation rules say it’s necessary. If you ever read React source, you might have seen these frames being referred to as Fibers.

Fibers are where the local state actually lives. When the state is updated, React marks the Fibers below as needing reconciliation, and calls those components.

### Context

It is essentially like dynamic scoping for components. It’s like a wormhole that lets you put something on the top, and have every child at the bottom be able to read it and re-render when it changes.

```jsx
const ThemeContext = React.createContext(
  'light' // Default value as a fallback
);

function DarkApp() {
  return (
    <ThemeContext.Provider value="dark">
      <MyComponents />
    </ThemeContext.Provider>
  );
}

function SomeDeeplyNestedChild() {
  // Depends on where the child is rendered
  const theme = useContext(ThemeContext);
  // ...
}
```

If there’s no ThemeContext.Provider above, the result of useContext(ThemeContext) call will be the default value specified in the createContext() call. In our example, it is 'light'.

### Effects

```jsx
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

For example, this code is buggy:

```jsx
useEffect(() => {
  DataSource.addSubscription(handleChange);
  return () => DataSource.removeSubscription(handleChange);
}, []);
```

If we never let the effect re-run, handleChange will keep pointing at the version from the first render, and count will always be 0 inside of it.

To solve this, make sure that if you specify the dependency array, it includes all things that can change, including the functions:

```jsx
useEffect(() => {
  DataSource.addSubscription(handleChange);
  return () => DataSource.removeSubscription(handleChange);
}, [handleChange]);
```

### Custom Hooks

```jsx
function MyResponsiveComponent() {
  const width = useWindowWidth(); // Our custom Hook
  return <p>Window width is {width}</p>;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return width;
}
```

Custom Hooks let different components share reusable stateful logic. Note that the state itself is not shared. Each call to a Hook declares its own isolated state.

### Static Use Order

You can think of useState as a syntax for defining a “React state variable”. It’s not really a syntax, of course. We’re still writing JavaScript. But we are looking at React as a runtime environment, and because React tailors JavaScript to describing UI trees, its features sometimes live closer to the language space.

Arrays might be an easier mental model than linked lists:

```jsx
// Pseudocode
let hooks, i;
function useState() {
  i++;
  if (hooks[i]) {
    // Next renders
    return hooks[i];
  }
  // First render
  hooks.push(...);
}

// Prepare to render
i = -1;
hooks = fiber.hooks || [];
// Call the component
YourComponent();
// Remember the state of Hooks
fiber.hooks = hooks;
```

This is roughly how each useState() call gets the right state. As we’ve learned earlier, “matching things up” isn’t new to React — reconciliation relies on the elements matching up between renders in a similar way.

---

## Reconciliation

[https://reactjs.org/docs/reconciliation.html]

This article explains the choices we made in React’s “diffing” algorithm so that component updates are predictable while being fast enough for high-performance apps.

React implements a heuristic O(n) algorithm based on two assumptions:

Two elements of different types will produce different trees.
The developer can hint at which child elements may be stable across different renders with a key prop.

### The Diffing Algorithm

When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements.

#### Elements Of Different Types

Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch.

When tearing down a tree, old DOM nodes are destroyed. Component instances receive componentWillUnmount(). When building up a new tree, new DOM nodes are inserted into the DOM. Component instances receive componentWillMount() and then componentDidMount(). Any state associated with the old tree is lost.

#### DOM Elements Of The Same Type

When comparing two React DOM elements of the same type, React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes.

#### Component Elements Of The Same Type

When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance.

#### Recursing On Children

By default, when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and generates a mutation whenever there’s a difference.

If you implement it naively, inserting an element at the beginning has worse performance. For example, converting between these two trees works poorly:

```jsx
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

React will mutate every child instead of realizing it can keep the <li>Duke</li> and <li>Villanova</li> subtrees intact. This inefficiency can be a problem.

#### Keys

In order to solve this issue, React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree.

As a last resort, you can pass an item’s index in the array as a key. This can work well if the items are never reordered, but reorders will be slow.

### Tradeoffs

1. The algorithm will not try to match subtrees of different component types. If you see yourself alternating between two component types with very similar output, you may want to make it the same type. In practice, we haven’t found this to be an issue.
2. Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause many component instances and DOM nodes to be unnecessarily recreated, which can cause performance degradation and lost state in child components.

---

## Get derived state from props react

[https://www.youtube.com/watch?time_continue=26&v=XqFCMObsyKk]

React 16.3

componentWillMount -> componentDidMount
componentWillReceiveProps -> getDerivedStateFromProps
componentWillUpdate -> componentDidUpdate

```jsx
export class Names extends React.Component {
  static propTypes = {
    names: PropTypes.array.isRequired,
    color: PropTypes.string.isRequired,
  };

  state = {
    names: [],
    sortedNames: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.names !== nextProps.names) {
      return {
        names: nextProps.names,
        sortedNames: sort(nextProps.names),
      };
    }
    return null;
  }

  render() {
    return sortedNames.map((name) => <li key={name}>{name}</li>);
  }
}
```

---

## setState()

[https://ru.react.js.org/docs/react-component.html#setstate]

`setState(updater[, callback])`

setState () ставит в очередь изменения в состояние компонента и указывает React, что этот компонент и его дочерние элементы должны быть повторно отрисованы с обновлённым состоянием.

React не гарантирует незамедлительного применения изменений в состоянии.

setState() не всегда сразу обновляет компонент. Этот метод может группировать или откладывать обновление до следующего раза.

setState() всегда приводит к повторному рендеру, если только shouldComponentUpdate() не возвращает false.

Первым аргументом передаётся функция updater, которая имеет следующий вид:
`(state, props) => stateChange`

state — ссылка на состояние компонента при изменении. Объект состояния не должен мутировать. Изменения должны проявляться в виде нового объекта на основе входных данных из state и props.

```jsx
this.setState((state, props) => {
  return { counter: state.counter + props.step };
});
```

Второй параметр в setState() — дополнительный колбэк, который выполняется после того, как исполнится setState и произойдёт повторный рендер компонента. Мы рекомендуем использовать такой подход в componentDidUpdate().

В качестве первого аргумента setState(), вместо функции, вы можете передать объект:

`setState(stateChange[, callback])`

---

## Component.prototype.setState

[https://github.com/facebook/react/blob/2afeebdcc4ed8a78ab5b36792f768078d70e1ffd/packages/react/src/ReactBaseClasses.js#L58][https://github.com/facebook/react/blob/2afeebdcc4ed8a78ab5b36792f768078d70e1ffd/packages/react-reconciler/src/reactfiberclasscomponent.js#l184]
[https://github.com/facebook/react/blob/2afeebdcc4ed8a78ab5b36792f768078d70e1ffd/packages/react-reconciler/src/ReactUpdateQueue.js#L208]

---

# Framework Advantages Handling Events & Forms

## React events in depth w/ Kent C. Dodds, Ben Alpert, & Dan Abramov

[https://www.youtube.com/watch?v=dRo_egw7tBc]

---

## Обработка событий

[https://ru.reactjs.org/docs/handling-events.html]

Обработка событий в React-элементах очень похожа на обработку событий в DOM-элементах. Но есть несколько синтаксических отличий:

События в React именуются в стиле camelCase вместо нижнего регистра.
С JSX вы передаёте функцию как обработчик события вместо строки.

Например, в HTML:

```jsx
<button onclick="activateLasers()">Активировать лазеры</button>
```

В React немного иначе:

```jsx
<button onClick={activateLasers}>Активировать лазеры</button>
```

Ещё одно отличие — в React нельзя предотвратить обработчик события по умолчанию, вернув false. Нужно явно вызвать preventDefault

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('По ссылке кликнули.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Нажми на меня
    </a>
  );
}
```

В приведённом выше коде e — это синтетическое событие. React определяет синтетические события в соответствии со спецификацией W3C, поэтому не волнуйтесь о кроссбраузерности.

При использовании React обычно не нужно вызывать addEventListener, чтобы добавить обработчики в DOM-элемент после его создания. Вместо этого добавьте обработчик сразу после того, как элемент отрендерился.

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // Эта привязка обязательна для работы `this` в колбэке.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'Включено' : 'Выключено'}
      </button>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById('root'));
```

При обращении к this в JSX-колбэках необходимо учитывать, что методы класса в JavaScript по умолчанию не привязаны к контексту. Если вы забудете привязать метод this.handleClick и передать его в onClick, значение this будет undefined в момент вызова функции.

Дело не в работе React, это часть того, как работают функции в JavaScript. Обычно, если ссылаться на метод без () после него, например, onClick={this.handleClick}, этот метод нужно привязать.

Если вам не по душе bind, существует два других способа. Если вы пользуетесь экспериментальным синтаксисом общедоступных полей классов, вы можете использовать его, чтобы правильно привязать колбэки:

```jsx
class LoggingButton extends React.Component {
  // Такой синтаксис гарантирует, что `this` привязан к handleClick.
  // Предупреждение: это экспериментальный синтаксис
  handleClick = () => {
    console.log('значение this:', this);
  };

  render() {
    return <button onClick={this.handleClick}>Нажми на меня</button>;
  }
}
```

Если вы не пользуетесь синтаксисом полей, можете попробовать стрелочные функции в колбэке:

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('значение this:', this);
  }

  render() {
    // Такой синтаксис гарантирует, что `this` привязан к handleClick.
    return <button onClick={() => this.handleClick()}>Нажми на меня</button>;
  }
}
```

Проблема этого синтаксиса в том, что при каждом рендере LoggingButton создаётся новый колбэк. Чаще всего это не страшно. Однако, если этот колбэк попадает как проп в дочерние компоненты, эти компоненты могут быть отрендерены снова. Мы рекомендуем делать привязку в конструкторе или использовать синтаксис полей классов, чтобы избежать проблем с производительностью.

### Передача аргументов в обработчики событий

Внутри цикла часто нужно передать дополнительный аргумент в обработчик события. Например, если id — это идентификатор строки, можно использовать следующие варианты:

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Удалить строку</button>
<button onClick={this.deleteRow.bind(this, id)}>Удалить строку</button>
```

Две строки выше — эквивалентны, и используют стрелочные функции и Function.prototype.bind соответственно.

В обоих случаях аргумент e, представляющий событие React, будет передан как второй аргумент после идентификатора. Используя стрелочную функцию, необходимо передавать аргумент явно, но с bind любые последующие аргументы передаются автоматически.

---

## SyntheticEvent

[https://ru.reactjs.org/docs/events.html]

Ваши обработчики событий получают экземпляр SyntheticEvent, это кроссбраузерная обёртка над нативным экземпляром события. У неё такой же интерфейс, как и у нативного события, включая методы stopPropagation() и preventDefault(). Эта обёртка помогает событиям работать одинаково во всех браузерах.

Если вам всё-таки нужно получить нативное браузерное событие, обратитесь к атрибуту nativeEvent.

События SyntheticEvent содержатся в пуле. Это означает, что объект SyntheticEvent будет повторно использован, а все его свойства будут очищены после вызова обработчика события. Это необходимо из соображений производительности. Именно поэтому нельзя использовать синтетические события асинхронно.

```jsx
function onClick(event) {
  console.log(event); // => null-объект.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function () {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Не сработает, поскольку this.state.clickEvent будет содержать только null-значения.
  this.setState({ clickEvent: event });

  // По-прежнему можно экспортировать свойства события.
  this.setState({ eventType: event.type });
}
```

Если вы всё же хотите обратиться к полям события асинхронно, вам нужно вызвать event.persist() на событии. Тогда оно будет извлечено из пула, что позволит вашему коду удерживать ссылки на это событие.

React нормализует события так, чтобы они содержали одинаковые свойства во всех браузерах.

Обработчики ниже вызываются на фазе всплытия (bubbling). А чтобы зарегистрировать событие на фазе перехвата (capture), просто добавьте Capture к имени события; например, вместо использования onClick используйте onClickCapture, чтобы обработать событие на фазе перехвата.

---

## Final Form: Form state management via Observers

[https://youtu.be/fxEW4jgoX-4]

### why are forms hard?

- Maximum user interaction
- Rapid state change
- A lot of state

### Redux form (redux-form.com)

- only React
- only Redux
- much rerendering
- over 26k gzipped

### Final Form

- standalone form state management engine
- Framework agnostic
- Subscription based
- Plugin capabilities
- Zero dependencies
- 4.6 kB gzipped

### React final form

- React binding for final form
- Maps form and field state to render props
- Handles React SyntheticEvent
- Even smaller: 2.9 kB gzipped
- Total: 7.5 kb gzipped

### React final form hooks

- useForm and useField
- 843 bytes gzipped

---

## Back to Basics: Event Handling in React

[https://alligator.io/react/event-handling/]

The Basics of React Event Handling

camelCase vs lowercase

```jsx
// React Code
<button
  onclick={handleClick()}     // 🙅
  onClick={this.handleClick}  // 👌
>
```

This is pretty much 90% of the difficulty (or ease?) of learning React event handling. Well, there’s the curious way that handleClick is defined on the LoudButton class… but that’s more of a ES6 classes matter.

onClick
only accepts a single function

Also this.handleClick wasn’t invoked. This contrasts with HTML/JS where onclick can be any arbitrary amount of JavaScript code:

```html
<button onclick="handleClick(); const pizza = true; hazPizza(pizza);">
  Click Me
</button>
```

Additional Examples

So far we’ve only looked at click events, so let’s look at a few other events. Below is a code snippet that has 3 different events. It’s interesting to see how the event (or e argument) varies between different kinds of events:

```jsx
class App extends Component {
  state = {
    inputText: '',
    mouseX: 0,
    mouseY: 0
  }
  handleInput = (e) => {
    this.setState({inputText: e.target.value});
  }
  handleSubmit = () => {
    alert(`Quoteth Shakespeare, "You cad! ${this.state.inputText}"`);
  }
  handleMouse = (e) => {
    this.setState({ mouseX: e.screenX, mouseY: e.screenY });
  }
  render() {
    return (
      <div>

        <input
          onChange={this.handleInput}  {/* ⌨ input text */}
          value={this.state.inputText}
        />

        <form onSubmit={this.handleSubmit}>  {/* 📥 onsubmit */}
          <input value={this.state.inputText}/>
          <button type="submit">submit dis</button>
        </form>

        <div>
          <img
            src="doggo.jpeg"
            onMouseMove={this.handleMouse} {/* 🖱️ mouse movement */}
          />
          {this.state.mouseX}px / {this.state.mouseY}px
        </div>

      </div>
    )
  }
}
```

You’ll commonly see the word handle... used. This is merely a popular convention. For example, sometimes I’ll even mirror the prop name because I’m mildly OCD: <button onClick={this.onClick}/>. Just use whatever works!

The event argument

Notice the e argument. It’s automatically passed into the handler whenever the event is emitted. And depending on the kind of handler, sometimes the e argument has a slightly different API (eg., e.target.value vs e.screenX). If you haven’t written too many event handlers before… don’t worry about remembering the differences! You’ll start to remember the different e APIs as you use them.

Frankly, I only use ~3 different kinds of events with any kind of frequency. Just keep the React docs for Synthetic Events close-by for reference purposes. 😉

---
