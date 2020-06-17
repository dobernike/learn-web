# Framework Advance

# Context

## Контекст

[Контекст - React](https://ru.reactjs.org/docs/context.html)

    // Контекст позволяет передавать значение глубоко
    // в дерево компонентов без явной передачи пропсов
    // на каждом уровне. Создадим контекст для текущей
    // UI-темы (со значением "light" по умолчанию).
    const ThemeContext = React.createContext('light');

    class App extends React.Component {
      render() {
        // Компонент Provider используется для передачи текущей
        // UI-темы вниз по дереву. Любой компонент может использовать
        // этот контекст и не важно, как глубоко он находится.
        // В этом примере мы передаём "dark" в качестве значения контекста.
        return (
          <ThemeContext.Provider value="dark"><Toolbar />      </ThemeContext.Provider>);
      }
    }

    // Компонент, который находится в середине,
    // теперь не должен явно передавать UI-тему вниз.
    function Toolbar(props) {
      return (
        <div>      <ThemedButton />    </div>);
    }

    class ThemedButton extends React.Component {
      // Определяем contextType, чтобы получить значение контекста.
      // React найдёт (выше по дереву) ближайший Provider-компонент,
      // предоставляющий этот контекст, и использует его значение.
      // В этом примере значение UI-темы будет "dark".
      static contextType = ThemeContext;
      render() {
        return <Button theme={this.context} />;
      }
    }

    class MyClass extends React.Component {
      componentDidMount() {
        let value = this.context;
        /* выполнить побочный эффект на этапе монтирования, используя значение MyContext */
      }
      componentDidUpdate() {
        let value = this.context;
        /* ... */
      }
      componentWillUnmount() {
        let value = this.context;
        /* ... */
      }
      render() {
        let value = this.context;
        /* отрендерить что-то, используя значение MyContext */
      }
    }
    MyClass.contextType = MyContext;

    class MyClass extends React.Component {
      static contextType = MyContext;
      render() {
        let value = this.context;
        /* отрендерить что-то, используя значение MyContext */
      }
    }

    import {ThemeContext} from './theme-context';

    function ThemeTogglerButton() {
      // ThemeTogglerButton получает из контекста
      // не только значение UI-темы, но и функцию toggleTheme.
      return (
        <ThemeContext.Consumer>      {({theme, toggleTheme}) => (
            <button
              onClick={toggleTheme}style={{backgroundColor: theme.background}}>          Toggle Theme
            </button>)}
        </ThemeContext.Consumer>);
    }

    export default ThemeTogglerButton;

---

## React Context

[React Context - RWieruch](https://www.robinwieruch.de/react-context)

    // src/ThemeContext.js
    import React from 'react';
    const ThemeContext = React.createContext(null);
    export default ThemeContext;

    // src/ComponentA.js
    import React from 'react';
    import ThemeContext from './ThemeContext';
    const A = () => (
      <ThemeContext.Provider value="green">
        <D />
      </ThemeContext.Provider>
    );

    // src/ComponentC.js
    import React from 'react';
    import ThemeContext from './ThemeContext';
    const C = () => (
      <ThemeContext.Consumer>
        {value => (
          <p style={{ color: value }}>
            Hello World
          </p>
        )}
      </ThemeContext.Consumer>
    );

---

## React Hooks + Context over Redux: The Complete Guide

[React Hooks + Context over Redux: Complete guide](https://medium.com/sfl-newsroom/react-hooks-context-over-redux-complete-guide-1757e34a34ac)

    import { useTodoListStore } from '../../store/TodoListStore';

    const TodoList = () => {
      const {
        tasks,
        addTask,
        renameTask,
        removeTask,
      } = useTodoListStore();

      return (
        <>
          <TodoListItem addTask={addTask} />

          {tasks && tasks.map(task =>
            <TodoListItem
              key={task.id}
              {...task}
              renameTask={renameTask}
              removeTask={removeTask}
            />
          )}
        </>
      );
    };

    export default TodoList;

    // another

    import React, { useState, useCallback } from 'react';

    const Context = React.createContext();

    let nextId = 0;

    export const TodoListProvider = ({children}) => {
      const [tasks, setTasks] = useState([]);

      const addTask = useCallback(name => setTasks(tasks => ([...tasks, {id: ++nextId, name}])), [setTasks]);
      const renameTask = useCallback((id, name) => setTasks(tasks => tasks.map(task => ({...task, name: id === task.id ? name : task.name}))), [setTasks]);
      const removeTask = useCallback(id => setTasks(tasks => tasks.filter((task) => id !== task.id)), [setTasks]);

      const value = { tasks, addTask, renameTask, removeTask };

      return (
        <Context.Provider value={value}>
          {children}
        </Context.Provider>
      );
    };

    export const useTodoListStore = () => React.useContext(Context);

    //
    ...
    import createStoreProvider from './store/createStoreProvider';
    import { TodoListProvider } from './store/TodoListStore';
    import { MessageProvider } from './store/MessageStore';

    const StoreProvider = createStoreProvider([
        TodoListProvider,
        MessageProvider,
    ]);

    // const SecondStoreProvider = createStoreProvider([
    //     OrdersProvider,
    // ]);

    ReactDOM.render(<StoreProvider>
        <App />
    </StoreProvider>, document.getElementById('root'));

    //
    import React from 'react';

    const createStoreProvider = providers => ({ children }) => providers.reverse().reduce((tree, Provider) => <Provider>{tree}</Provider>, children);

    export default createStoreProvider;

# **Pros**

- No dependencies, only built-in API, small size
- Nothing new to learn especially if you’re familiar with React
- No difference between handling local and global states, continue using React’s already known APIs to use state, action, ref, memo (selectors), etc.
- Share stateful logic between stores with custom hooks 🔫
- Reducer pattern is optional

# **Cons**

- Impossibility to access context state from another context. (No alternative for Redux’s getState)
- Missing debug tools like redux-dev-tools (hopefully not for long)
- Missing automated SSR workflow

---

# Error Boundaries

## Предохранители

[Предохранители - React](https://ru.reactjs.org/docs/error-boundaries.html)

**Примечание**

Предохранители **не** поймают ошибки в:

- обработчиках событий ([подробнее](https://ru.reactjs.org/docs/error-boundaries.html#how-about-event-handlers));
- асинхронном коде (например колбэках из `setTimeout` или `requestAnimationFrame`);
- серверном рендеринге (Server-side rendering);
- самом предохранителе (а не в его дочерних компонентах).

  class ErrorBoundary extends React.Component {
  constructor(props) {
  super(props);
  this.state = { hasError: false };
  }

      static getDerivedStateFromError(error) {
        // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
        return { hasError: true };
      }

      componentDidCatch(error, errorInfo) {
        // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
        logErrorToMyService(error, errorInfo);
      }

      render() {
        if (this.state.hasError) {
          // Можно отрендерить запасной UI произвольного вида
          return <h1>Что-то пошло не так.</h1>;
        }

        return this.props.children;
      }

  }

## Error Boundaries in React

[Error Boundaries in React | Edvins Antonovs](https://edvins.io/error-boundaries-in-react/)

- First of all, we add a `constructor` which holds the state attribute – `hasError`.
- Then, `static getDerivedStateFromError` which updates the state so the next render would know it in order to display a fallback UI component.
- Next is `componentDidCatch` is a lifecycle method which is a good place to do some logging to the error tracking services (e.g [sentry.io](https://sentry.io/welcome/))

Please keep in mind that from time to time, you can see the practice of setting the state (e.g. like

`this.setState({ hasError: true })`

) inside the

`componentDidCatch`

method, yet according to the official React documentation, it’s better to use the specific method for this case –

`static getDerivedStateFromError`

The last step is to add a conditional rendering of the fallback UI component in

`render()`

by evaluating state attribute

`hasError`

- In cases when it’s `true` then it means we have an error here so we display a text message `Oops! Something went wrong.`, otherwise – we render the component.

---

# Code-Splitting

## Разделение кода

[Разделение кода - React](https://ru.reactjs.org/docs/code-splitting.html)

## `import()`

Лучший способ внедрить разделение кода в приложение — использовать синтаксис динамического импорта: `import()`.

**До:**

`import { add } from './math'; console.log(add(16, 26));`

**После:**

`import("./math").then(math => { console.log(math.add(16, 26)); });`

webpack

    module.exports = {
      entry: {
        main: './src/app.js',
      },
      output: {
        // `filename` provides a template for naming your bundles (remember to use `[name]`)
        filename: '[name].bundle.js',
        // `chunkFilename` provides a template for naming code-split bundles (optional)
        chunkFilename: '[name].bundle.js',
        // `path` is the folder where Webpack will place your bundles
        path: './dist',
        // `publicPath` is where Webpack will load your bundles from (optional)
        publicPath: 'dist/'
      }
    };

@babel/plugin-syntax-dynamic-import.

### React.lazy

Функция `React.lazy` позволяет рендерить динамический импорт как обычный компонент.

**До:**

`import OtherComponent from './OtherComponent';`

**После:**

`const OtherComponent = React.lazy(() => import('./OtherComponent'));`

    import React, { Suspense } from 'react';
    import MyErrorBoundary from './MyErrorBoundary';

    const OtherComponent = React.lazy(() => import('./OtherComponent'));
    const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

    const MyComponent = () => (
      <div>
        <MyErrorBoundary>
          <Suspense fallback={<div>Загрузка...</div>}>
            <section>
              <OtherComponent />
              <AnotherComponent />
            </section>
          </Suspense>
        </MyErrorBoundary>
      </div>
    );

### Разделение кода на основе маршрутов

    import React, { Suspense, lazy } from 'react';
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

    const Home = lazy(() => import('./routes/Home'));
    const About = lazy(() => import('./routes/About'));

    const App = () => (
      <Router>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </Switch>
        </Suspense>
      </Router>
    );

### Именованный экспорт

    // MyApp.js
    import React, { lazy } from 'react';
    const MyComponent = lazy(() => import("./MyComponent.js"));

---

## React и Code Splitting

[React и Code Splitting](https://habr.com/ru/post/442046/)

Сейчас более менее "официальным" выбором будут `React.lazy` и [loadable-components](https://github.com/smooth-code/loadable-components/)(просто `@loadable`), и выбор между ними очевиден:

- React.lazy совсем никак не может SSR(Server Side Rendering), от слова вообще. Даже в тестах упадет без особых плясок с бубном, типа "синхронных промисов".
- Loadable SSR может, и при этом поддерживает Suspense, те ничем не хуже React.Lazy.

В том числе loadable поддерживает красивые обертки над загрузкой библиотек (loadable.lib, можно увести moment.js в React renderProp), и помогает webpack на стороне сервера собрать список использованных скриптов, стилей и ресурсов на префетч (чего сам webpack не очень умеет). В общем, читайте [официальную документацию](https://www.smooth-code.com/open-source/loadable-components/docs/loadable-vs-react-lazy/).

### **SSR + CSS**

Еще больший источник проблем при SSR — это CSS.Если у вас Styled-components — это не так чтобы больно — они поставляются с `transform-stream` который сам добавит в конечный код что надо. Главное — должна быть одна версия SC везде, иначе фокус не получится — одна версия SC не сможет ничего рассказать о себе другой, а SC любит плодиться (проверьте свой бандл). Буду честен — именно из-за этого ограничения фокус обычно и **не** получается.

Ну и конечно — все это завязано на webpack и вообще никак иначе. Посему, при всем уважению к Грегу, автору loadable-components — предлагаю рассмотреть другие варианты.

### **Итого**

Итого — три подхода, которые могут изменить ваш взгляд на SSR и code splitting. Первый работает с JS codesplitting, и не ломается. Второй работает с CSS codesplitting, и не ломается. Третий работает на уровне HTML упрощая и ускоряя некоторые процессы, и опять же, не ломается.

Ссылки на библиотеки:

- [https://github.com/theKashey/react-imported-component/](https://github.com/theKashey/react-imported-component/)
- [https://github.com/theKashey/used-styles](https://github.com/theKashey/used-styles)
- [https://github.com/theKashey/react-prerendered-component](https://github.com/theKashey/react-prerendered-component)
- [https://github.com/smooth-code/loadable-components/](https://github.com/smooth-code/loadable-components/)
- (для тех кто в танке) [https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense](https://reactjs.org/blog/2018/10/23/react-v-16-6.html#reactlazy-code-splitting-with-suspense)

---

## Lessons Learned: Code Splitting with Webpack and React

[Lessons Learned: Code Splitting with Webpack and React](https://hackernoon.com/lessons-learned-code-splitting-with-webpack-and-react-f012a989113)

# **Unused Code**

You can actually see the amount of **unused code** you send over from the Chrome Dev Tools. Once you open them, press `Cmd + Shift + P` and type `coverage`. Pick the first option from the dropdown and press the reload icon.

![Framework%20Advance/Untitled.png](Framework%20Advance/Untitled.png)

Dynamic Imports

![Framework%20Advance/Untitled%201.png](Framework%20Advance/Untitled%201.png)

![Framework%20Advance/Untitled%202.png](Framework%20Advance/Untitled%202.png)

Route Level Code Splitting

![Framework%20Advance/Untitled%203.png](Framework%20Advance/Untitled%203.png)

Dynamic Import Routes

![Framework%20Advance/Untitled%204.png](Framework%20Advance/Untitled%204.png)

Naming bundles

![Framework%20Advance/Untitled%205.png](Framework%20Advance/Untitled%205.png)

![Framework%20Advance/Untitled%206.png](Framework%20Advance/Untitled%206.png)

Preloading and Prefetching

![Framework%20Advance/Untitled%207.png](Framework%20Advance/Untitled%207.png)

![Framework%20Advance/Untitled%208.png](Framework%20Advance/Untitled%208.png)

More on Magic Comments

![Framework%20Advance/Untitled%209.png](Framework%20Advance/Untitled%209.png)

![Framework%20Advance/Untitled%2010.png](Framework%20Advance/Untitled%2010.png)

---

## React Code Splitting in 2019

[React Code Splitting in 2019](https://itnext.io/react-code-splitting-in-2019-9a5d2776c502)

# **What’s about React-loadable?**

`React.lazy` superseded it. And provided more features, like `Suspense` to control loading state. So — use `React.Lazy` instead.

Grey Zone 1 – testing

    const LazyComponent = lazy(() => import('/path/to/dynamic/component'));
    const Fallback = () => <div />;
    const SuspenseComponent = () => (
        <Suspense fallback={<Fallback />}>
          <LazyComponent />
        </Suspense>
    );
    const wrapper = mount(<SuspenseComponent />)
    expect(wrapper.find('Fallback')).to.have.lengthOf(1)
    expect(wrapper.find('DynamicComponent')).to.have.lengthOf(0)
    // ^ not loaded
    await wrapper.waitUntilLazyLoaded()
    expect(wrapper.find('Fallback')).to.have.lengthOf(0)
    expect(wrapper.find('DynamicComponent')).to.have.lengthOf(1)
    // ^ loaded!

    const LazyText = lazy(() => ({
       then(cb) {
          cb({default: Text});
          // this is "sync" thenable
       },
    }));
    const root = ReactTestRenderer.create(
      <Suspense fallback={<Text text="Loading..." />}>
         <LazyText text="Hi" /> // this lazy is not very lazy
      </Suspense>,
    );

    const syncImport = (importFn) => {
       let preloaded = undefined;
       const promise = importFn().then(module => preloaded = module);
       // ^ "auto" import and "cache" promise
       return () => preloaded ? { then: () => preloaded } : promise;
       // ^ return sync thenable then possible
    }
    const lazyImport = isNode ? syncImport : a => a;
    // ^ sync for node, async for browser
    const LazyComponent = React.lazy(lazyImport(() => import('./file'));

Grey zone 2 – SSR

    import React from 'react';
    const realLazy = React.lazy;
    React.lazy = importer => realLazy(syncImport(importer));
    React.Suspense = React.Fragment; // :P
    // ^ React SSR just got fixed.

# **Behold code splitting libraries**

- [Universal-component](https://www.npmjs.com/package/react-universal-component) – the oldest, and still maintainable library. It “invented” code splitting in terms of – taught Webpack to code split.
- [React-loadable](https://www.npmjs.com/package/react-loadable) – **very** popular, but unmaintained library. Made code spitting a popular thing. Issues are closed, so there is no community around.
- [Loadable-components](https://www.npmjs.com/package/@loadable/component) – a feature complete library, it’s a pleasure to use, with the most active community around.
- [Imported-component](https://www.npmjs.com/package/react-imported-component) – a single library, not bound to Webpack, ie capable to handle parcel or esm.
- [React-async-component](https://www.npmjs.com/package/react-async-component) – already dead library(yet popular), which made a significant impact on everything around code splitting, custom React tree traversal and SSR.
- _Another library – there **were** many libraries, many of which did not survive Webpack evolution or React 16 – I havent listed them here, but if you know a good candidate – just DM me._

# **Which library to pick?**

It’s easy – not **react-loadable** – it’s heavy unmaintained and obsolete, even if it is still **mega** popular. *(and thank you for popularizing code splitting, yet again)*

- **Loadable-components** – might be a very good choice. It is well written, actively maintained and supports everything out of the box. Support “full dynamic imports”, allowing you to import files depending on the props given, but thus *untypable*. **Supports Suspense**, so could replace `React.lazy`.
- **Universal-component** – actually “inventors” of full dynamic imports – as long as **they implemented it in Webpack**. And many other things at *low level,* like *css-chunks, report-chunks and other -chunks* – **they did it**. And this library authors also members of a webpack team. I would say – this library is a bit hardcore, and a bit less user friendly. *Loadable-components documentation is unbeatable.* It’s worth if not to use this library, then to read documentation — there are so many details you should know…
- **React-imported-component** – is a bit *odd*. It’s *bundler independent*, so it would never break (there is nothing to break), would work with Webpack 5 and 55, but that **comes with a cost**. Does not support full dynamic imports, like `React.lazy`, and, as a result – typeable. Also **supports Suspense**. Uses `synchronous thenables` on SSR. It also has absolutely different approach for CSS, and perfect **stream rendering** support.

Grey zone 3 – hybrid render

So the easiest solution for SSR, especially for simple SPA would be **prerendering**. Like opening your SPA in a browser and hitting the “Save” button. Like:

- [React-snap](https://github.com/stereobooster/react-snap) — uses [puppeteer](https://github.com/GoogleChrome/puppeteer) to render your page in a “browser” and saves a result
- [Rendertron](https://github.com/GoogleChrome/rendertron) — which does the same, but in a different (in google clouds) way.

Prerendering is “SSR” without “Server”. It’s SSR using a Client. Magic! And working out of the box… … … but not for code spitting.

    import {PrerenderedComponent} from 'react-prerendered-component';
    const importer = memoizeOne(() => import('./Component'));
    // ^ it's very important to keep the "one" promise
    const Component = React.lazy(importer);
    // or use any other library with ".prefetch" support
    // all libraries has it (more or less)
    const App = () => (
      <PrerenderedComponent live={importer()}>
       {/* ^ shall return the same promise */ }
        <Component />
       {/* ^ would be rendered when component goes "live" */ }
      </PrerenderedComponent>
    );

# **TLDR?**

- don’t use react-loadable, it would not add any valuable value
- React.lazy is good, but too simple, yet.
- SSR is a hard thing, and you should know it
- Hybrid puppeteer-driven rendering is a thing. Sometimes even harder thing.

---

# Hooks

## Why Do React Hooks Rely on Call Order?

[Why Do React Hooks Rely on Call Order?](https://overreacted.io/why-do-hooks-rely-on-call-order/)

---

## React Hooks the missing link

[https://www.youtube.com/watch?v=cRtAjTFM7M4](https://www.youtube.com/watch?v=cRtAjTFM7M4)

хуки работаю с rebase (2 раза отрабатывают)

React не группирует обновления, если они НЕ в обработчике событий (вроде onClick) (несколько setState)

например в fetch.then(setData1(2);setData2(1));

будет 2 редера, 2 коммита

Используйте useReducer или unstable_batchedUpdates

Используйте useReducer вместо useState, если они логически связаны

Группируйте обновления стейта вне обработчиков событий

Старайтесь избегать выравнивание стейта между хуками внутри одного компонента

---

## React Hook Pitfalls

[https://www.youtube.com/watch?v=VIRcX2X7EUk](https://www.youtube.com/watch?v=VIRcX2X7EUk)

slides:

[kentcdodds/react-hooks-pitfalls](https://github.com/kentcdodds/react-hooks-pitfalls)

eslint

"react-hooks/rules-of-hooks": "error",

"react-hooks/exhaustive-deps": "warn"

profile → only then → optimize

(useCallback, useMemo, memo)

---

## Essential React Hooks Design Patterns

[Essential React Hooks Design Patterns](https://itnext.io/essential-react-hooks-design-patterns-a04309cc0404)

![https://miro.medium.com/max/500/1*EmEA9pwk4Kcai4HWJBIalQ.gif](https://miro.medium.com/max/500/1*EmEA9pwk4Kcai4HWJBIalQ.gif)

If a lifetime of the data is the same as the component’s lifetime, the data should belong to the component’s state. If the data lives longer than the component, it should be received as a prop and might be a member of some upper component state. Only the data living longer than any particular component should be stored globally.

    const userToString = x => x.name + ' <' + x.email + '>';

    const PickUser = ({ user }) => (
      <div>
        <input value={userToString(user)}/>
      </div>
    )

If the state member is not needed all the time, there’s an opportunity to push it down to the children components state.

all useSomething calls must be done at the top level only. Never do it inside of loops and ifs.

    const PickUser = ({ selected, setSelected }) => {
        // Declare the local component's state.
        const [ editing, setEditing ] = useState( false );

        return (
            <div>
                { editing ?
                    <EditUser selected={selected} setSelected={setSelected}
                              close={() => setEditing( false )}/>
                :
                    <input value={ userToString( selected ) }
                           onClick={ () => setEditing( true ) }/>
                }
            </div>
        )
    }

Writing Custom React Hooks

    function useLink( init ){
       const [ value, set ] = useState( init );
       // It can be a class with useful methods, like this one:
       // https://github.com/VoliJS/NestedLink/blob/master/valuelink/src/link.ts
       // But we just use the plain object here to illustrate an idea.
       return { value, set };
    }

    const PickUser = ({ $selected /* link to some upper component state */ }) => {
        // Declare the local component's state as a link.
        // Now, state elements are easy to distinguish and pass around.
        const $editing = useLink( false );

        return (
          <div>
             { $editing.value ?
                 <EditUser $selected={$selected /* just pass it through */}
                           close={() => $editing.set( false )}/>
             :
                 <input value={ userToString( $selected.value ) }
                        onClick={ () => $editing.set( true ) }/>
             }
          </div>
        )
    }

It’s okay to use hooks in your functions, just start their names with “use” so it will be clear that they are also “hooks”.

Links are “writable props” representing the writable references to some component’s state. Links simplify passing the upper state down to children.

Shared component’s state

    export const EditUser = ({ $selected, close }) => {
        const $filter = useLink('');

        return (
            <>
                <DelayedInput autoFocus
                    $value={ $filter }
                    placeholder="Start typing..."
                    onBlur={ close } />

                { $filter.value ?
                    <UsersList filter={$filter.value} $selected={$selected} />
                : void 0 }
            </>
        );
    }

    function useBoundLink( source ){
        // If the source is another Link, extract the value out of it.
        const value = source instanceof Link ? source.value : source,
              link = useLink( value );

        // If the value changes, execute link.set( value ) after the render.
        useEffect(() => link.set( value ), [ value ]);

        return link;
    }

useEffect() React hook can track changes so you can easily attach reactions to props changes after render. That’s what you do in place of old componentWillReceiveProps.

    export const DelayedInput = ({ $value, timeout = 1000, …props }) => {
     const $inputValue = useBoundLink( $value );
     // TODO: How to sync the state back?
     return <input {…$inputValue.props} {…props}/>;
    }

    export const DelayedInput = ({ $value, timeout = 1000, ...props }) => {
        const $inputValue = useBoundLink( $value )
            .onChange(
                useThrottle(
                    x => $value.set( x ),
                    timeout,
                    [ $value.value ]
                )
            );

        return <input {...$inputValue.props} {...props}/>;
    }

useRef React hook has the same meaning as a regular class member of the React class component

Clean-up is the function returned from the useEffect body, which is called right before the next useEffect body call and on unmount.

    function useThrottle( fun, timeout, changes = [] ){
        // Create the mutable local ref to store timer.
        const timer = useRef( null );

        function cancel(){
            if( timer.current ){
                clearTimeout( timer.current );
                timer.current = null;
            }
        }

        // Cancel the timer when the given values change or the component will unmount.
        useEffect( () => cancel, changes );

        // Return the throttled version of the function.
        return function( ...args ){
            cancel();

            // Save the timer to the ref, so it can be cancelled.
            timer.current = setTimeout(()=>{
                timer.current = null;
                fun.apply( this, args );
            }, timeout );
        }
    }

You can’t use async and await inside of useEffect. But you can create a custom hook to work it around.

    const UsersList = ({ filter, $selected }) => {
        // $users can be modified by async function after the component is unmounted.
        // We have to do something to prevent an exception. Let's do it in this custom hook.
        const $users = useSafeLink([]);

        // It's useful to know if there's an I/O peding. Another custom hook.
        const ioComplete = useIO( async () => {
            // This thing can happen after unmount.
            $users.set( await fetchUsers( filter ) );
        }, [ filter ]);

        return (
            <ul className="users-suggestions">
                { ioComplete ? $users.value.map( user => (
                    <li key={user.id}
                        className={ $selected.value && $selected.value.id === user.id ? 'selected' : '' }
                        onMouseDown={ () => $selected.set( user ) }
                    >
                        { userToString( user ) }
                    </li>
                )) : 'Loading...' }
            </ul>
        )
    }

You can’t just update your state when I/O is completed. The component might be unmounted and you get an exception.

    export function useIsMountedRef(){
        // We need something similar to the plain mutable class member.
        const isMounted = useRef( true );

        // And, we need something similar to componentWillUnmount.
        useEffect( () => {
            // Whatever we return is a cleanup effect.
            return () => { // <- componentWillUnmount
                isMounted.current = false
            }
        }, []); // [] never changes, so the "cleanup" function will be fired on unmount only.

        return isMounted;
    }

useEffect( whenDidMount, [] ) behaves as componentDidMount, and it’s cleanup effect as a componentWillUnmount.

    export function useSafeLink( initialState ){
        const $value = useLink( initialState ),
                isMounted = useIsMountedRef();

        const { set } = $value;
        $value.set = x => isMounted.current && set( x );
        return $value;
    }

All asynchronous state updates from I/O functions must be guarded agains the possible component unmount.

    function useIO( fun, condition = [] ) {
        // Counter of open I/O requests. If it's 0, I/O is completed.
        // Counter is needed to handle the situation when the next request
        // is issued before the previous one was completed.
        const $isReady = useSafeLink( null );

        useEffect(()=>{
            // function in set instead of value to avoid race conditions with counter increment.
            $isReady.set( x => ( x || 0 ) + 1 );

            fun().finally(() => $isReady.set( x => x - 1 ));
        }, condition);

        // null is used to detect the first render when no requests issued yet
        // but the I/O is not completed.
        return $isReady.value === null ? false : !$isReady.value;
    }

React Hooks are extremily powerful stateful mixins for React functional components which can encapsulate complex design patterns in a quite concise and elegant way.

    // npm install valuelink linked-controls --save-dev

    // That's what you need to start.
    import { useLink } from 'valuelink'

    // Hooks used in DelayedInput, and the DelayedInput himself.
    import { useBoundLink } from 'valuelink'
    import { useThrottle, DelayedInput } from 'linked-controls'

    // Hooks used in UsersList
    import { useIsMountedRef, useSafeLink, useIO } from 'valuelink'

    // And, just in case you'll need it...
    import { useSafeBoundLink } from 'valuelink'

---

## How to implement useState with useReducer

[How to implement useState with useReducer](https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer)

    const useStateReducer = (prevState, newState) =>
      typeof newState === 'function' ? newState(prevState) : newState
    const useStateInitializer = initialValue =>
      typeof initialValue === 'function' ? initialValue() : initialValue
    function useState(initialValue) {
      return React.useReducer(useStateReducer, initialValue, useStateInitializer)
    }

---

# Concurrent mode, suspense, etc

## Введение в конкурентный режим (экспериментально)
[https://ru.reactjs.org/docs/concurrent-mode-intro.html]

экспериментальные функции, которых еще нет в стабильной версии

Что такое конкурентный режим?
Конкурентный режим — это набор новых возможностей, которые помогают приложениям реагировать и корректно адаптироваться к устройствам пользователя и скорости сети.

В конкурентном режиме рендеринг не блокируется. Он прерывается. Это улучшает UX и открывает новые возможности.

### Прерываемый рендеринг

Распространенный способ обойти залипание — не обрабатывать входные данные при каждом изменении (debounce). В таком случае мы обновляем список только после того, как пользователь перестает печатать. Однако может быть неприятно если пользовательский интерфейс не обновляется во время ввода текста. В качестве альтернативы мы могли бы «тормозить» (throttle) обработку данных и обновлять список с определенной максимальной частотой. Но тогда на маломощных устройствах всё равно останется залипание. Оба подхода создают неоптимальный пользовательский интерфейс.

Конкурентный режим устраняет это фундаментальное ограничение, делая рендеринг прерываемым. Это означает, что когда пользователь нажимает другую клавишу, React не нужно блокировать браузер от обновления ввода текста. Вместо этого он может позволить браузеру отрисовать обновление для входных данных, а затем продолжить визуализацию обновленного списка в памяти. Когда рендеринг завершен, React обновляет DOM, и изменения отражаются на экране.

Возможности конкурентного режима уменьшают необходимость применять ожидание (debouncing) и торможение (throttling) в пользовательском интерфейсе. Поскольку рендеринг прерываем, React не нужно искусственно задерживать выполнение, чтобы избежать залипание. Он может начать визуализацию сразу же, но прервать эту работу при необходимости, чтобы сохранить отзывчивость приложения.

### Преднамеренная последовательность загрузок

Представьте себе, что мы перемещаемся между двумя экранами в приложении. Иногда у нас может быть недостаточно загруженного кода и данных, чтобы показать пользователю «достаточно хорошее» состояние загрузки на новом экране. Переход к пустому экрану или большому спиннеру может быть неприятным. Однако часто бывает так, что получение необходимого кода и данных не занимает слишком много времени. Может было бы лучше, если React смог бы оставаться на старом экране немного дольше и «пропустить» «плохое состояние загрузки», прежде чем показывать новый экран?

Сначала React начинает готовить новый экран в памяти — или, как говорится в нашей метафоре, «на другой ветке». Поэтому React может подождать до обновления DOM, чтобы загрузить больше контента. В конкурентном режиме мы можем сказать React, чтобы он продолжил показывать старый экран, полностью интерактивный, с встроенным индикатором загрузки. И когда новый экран будет готов, React может привести нас к нему.

### Конкурентность

В конкурентном режиме React может работать с несколькими обновлениями состояния одновременно

- Для обновлений с привязкой к ЦПУ (таких как создание узлов DOM и запуск кода компонента) конкурентность означает, что более срочное обновление может «прервать» уже начатую визуализацию.
- Для обновлений с привязкой к вводу-выводу (таких как извлечение кода или данных из сети) конкурентность означает, что React может начать визуализацию в памяти ещё до того, как все данные поступят, и пропустить показ раздражающих пустых состояний загрузки.

Важно отметить, что способ использования React остаётся таким же. Такие понятия, как компоненты, пропсы и состояние, в принципе работают одинаково. Когда вы хотите обновить страницу, вы устанавливаете состояние.

React использует эвристику, чтобы решить, насколько «срочно» обновление, и позволяет настроить его с помощью нескольких строк кода, чтобы вы могли достичь желаемого взаимодействия с пользователем.

---

# Common knowledge

## Как современные библиотеки и фреймворки работают с DOM (Осторожно! Доклад 2017 года)

[https://www.youtube.com/watch?v=P0XaHYtA1QE&list=PL8sJahqnzh8IDythQu3ZJPqnvuSXQF8MV&index=17](https://www.youtube.com/watch?v=P0XaHYtA1QE&list=PL8sJahqnzh8IDythQu3ZJPqnvuSXQF8MV&index=17)

### Общий цикл работы с DOM

1. Первоначальная отрисовка
2. Применение обработчиков событий
3. Делегирование событий пользовательским обработчикам
4. Сбор изменения данных
5. Применение изменений данных к DOM
6. Перейти к пункту 2 (цикл)

### React (15.4.1)

Компиляция JSX

<a href="/">JSX</a> → React.createElement('a', {href: '/'}, 'JSX') → { \$\$typeof: Symbol.for('react.element'), type: 'a', key: null, ref: null, props: {href: '/'}, \_owner: ReactCurrentOwner.current }

Слежение за позицией scroll

Кеширует значение избегая layout thrashing

What forces layout/reflow. The comprehensive list.

Внутренние классы компонентов

ReactCompositeComponent

mountComponent

ReactDOMComponent

Переиспользование DOM (data-reactroot, data-reactid)

Вызов отложенных функций

Восстанавливается фокус и каретка в поле ввода

Инициализируются обработчики событий

В случае вызова setState во время отрисовки, алгоритм запускается еще раз

Работа с событиями

Основной механизм - Event Delegation

На некоторые события подписка напрямую

Обход разных странных проблем в браузерах

Делегирование событий

1. Поиск всех Composite компонентов по цепочке
2. Пропуск события через цепочку плагинов
3. Очередь синтетических событий
4. Алгоритм всплытия синтетического события
5. Повторить пункт 3 (цикл)

Transaction (выполняются до и после выполнения работ)

ReactDefaulBatchingStrategyTransaction (сбросить все состояния и применить их к DOM)

ReactUpdatesFlushTransaction (следит, чтобы состояние дома было актуальным, если был еще 1 setState, то повторит с Batching )

ReactReconcileTransaction (Сохраняет позицию каретки, обрабатывает очередь)

### Ember 2.10

Компоненты и шаблоны

Wire Format (AST)

Подпрограммы

Opcode

Append Opcodes

'View' события

'Action' события

'Property' события

Применение обработчиков событий

Последствия Event Delegation (поиск на каждое движение мышки)

Backburner.js

### Angular 2

Компиляция DI (js в другой js)

Компонент

Host класс

View класс

Wrapper класс

Применение обработчиков событий

Обработчики применяются через плагины

HammerGesturesPlugin

KeyEventsPlugin

DomEventsPlugin

Делегирование событий пользовательским обработчикам

Zone.js (event loop на js)

Применение изменений данных к DOM

1. View класс получает событие
2. Компонент получает событие
3. После любой асинхронной операции Zone.js вызывает Angular
4. Angular вызывает проверку изменений у Host классов
5. Host класс вызывает проверку изменений у View классов
6. View класс меняет DOM если это необходимо

Recap

React (15 - до fiber)

Работает через внутренние компоненты

Переиспользует разметку

Система абстракций над событиями

Все работает внутри транзакций

Перерасчитывается все поддерево компонентов

Ember 2.10

Glimmer компилирует шаблоны в подпрограммы

Ember максимально использует Event Delegation

Существует два вида обработчиков событий

Все работает внутри Backburner.js

Подпрограммы выполняются в Glimmer VM

Angular 2

Компилирует компоненты в 3 JavaScript класса

View классы работают через внешний Renderer

Использует plugins для работы с событиями

Весь асинхронный код работает внутри Zone.js

View классы напрямую обновляют DOM

---

## Building a Custom React Renderer | Sophie Alpert

[https://www.youtube.com/watch?v=CGpMlWVcHok](https://www.youtube.com/watch?v=CGpMlWVcHok)

host environments:

host components (div, span, img, etc)

host components (View, Text, Image, etc)

completely shared (react-reconciler):

function components

class components

props, state

effects, lifecycles

key, ref, context

React.lazy, error boundaries

concurrent mode, and Suspense

mutation mode

view = createView()

updateView(view, {color: 'red'})

div = document.createElement('div')

div.style.color = 'red'

- update view X to be red
- create a new view
- add that view as a child of view Y

persistent mode

view = createView()

view = cloneView(view, {color: 'red'})

---

## React as a UI Runtime 🔥🔥🔥

[https://overreacted.io/react-as-a-ui-runtime/](https://overreacted.io/react-as-a-ui-runtime/)

### React Elements

A React element is a plain JavaScript object. It can describe a host instance.

```js
// JSX is a syntax sugar for these objects.
// <button className="blue" />
{
  type: 'button',
  props: { className: 'blue' }
}
```

Like host instances, React elements can form a tree:

```js
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

### Entry Point

For example, React DOM entry point is ReactDOM.render:

```js
ReactDOM.render(
  // { type: 'button', props: { className: 'blue' } }
  <button className="blue" />,
  document.getElementById("container")
);
```

React will look at the reactElement.type (in our example, 'button') and ask the React DOM renderer to create a host instance for it and set the properties:

```js
// Somewhere in the ReactDOM renderer (simplified)
function createHostInstance(reactElement) {
  let domNode = document.createElement(reactElement.type);
  domNode.className = reactElement.props.className;
  return domNode;
}
```

In our example, effectively React will do this:

```js
let domNode = document.createElement("button");
domNode.className = "blue";

domContainer.appendChild(domNode);
```

If the React element has child elements in reactElement.props.children, React will recursively create host instances for them too on the first render.

### Reconciliation

What happens if we call ReactDOM.render() twice with the same container?

```js
ReactDOM.render(
  <button className="blue" />,
  document.getElementById("container")
);

// ... later ...

// Should this *replace* the button host instance
// or merely update a property on an existing one?
ReactDOM.render(
  <button className="red" />,
  document.getElementById("container")
);
```

There are two ways to go about it. A simplified version of React could blow away the existing tree and re-create it from scratch:

```js
let domContainer = document.getElementById("container");
// Clear the tree
domContainer.innerHTML = "";
// Create the new host instance tree
let domNode = document.createElement("button");
domNode.className = "red";
domContainer.appendChild(domNode);
```

But in DOM, this is slow and loses important information like focus, selection, scroll state, and so on. Instead, we want React to do something like this:

```js
let domNode = domContainer.firstChild;
// Update existing host instance
domNode.className = "red";
```

If an element type in the same place in the tree “matches up” between the previous and the next renders, React reuses the existing host instance.

Here is an example with comments showing roughly what React does:

```js
// let domNode = document.createElement('button');
// domNode.className = 'blue';
// domContainer.appendChild(domNode);
ReactDOM.render(
  <button className="blue" />,
  document.getElementById("container")
);

// Can reuse host instance? Yes! (button → button)
// domNode.className = 'red';
ReactDOM.render(
  <button className="red" />,
  document.getElementById("container")
);

// Can reuse host instance? No! (button → p)
// domContainer.removeChild(domNode);
// domNode = document.createElement('p');
// domNode.textContent = 'Hello';
// domContainer.appendChild(domNode);
ReactDOM.render(<p>Hello</p>, document.getElementById("container"));

// Can reuse host instance? Yes! (p → p)
// domNode.textContent = 'Goodbye';
ReactDOM.render(<p>Goodbye</p>, document.getElementById("container"));
```

The same heuristic is used for child trees. For example, when we update a <dialog> with two <button>s inside, React first decides whether to re-use the <dialog>, and then repeats this decision procedure for each child.

### Conditions

If React only reuses host instances when the element types “match up” between updates, how can we render conditional content?

Say we want to first show only an input, but later render a message before it:

```js
// First render
ReactDOM.render(
  <dialog>
    <input />
  </dialog>,
  domContainer
);

// Next render
ReactDOM.render(
  <dialog>
    <p>I was just added here!</p>
    <input />
  </dialog>,
  domContainer
);
```

In this example, the <input> host instance would get re-created. React would walk the element tree, comparing it with the previous version:

dialog → dialog: Can reuse the host instance? Yes — the type matches.

input → p: Can reuse the host instance? No, the type has changed! Need to remove the existing input and create a new p host instance.
(nothing) → input: Need to create a new input host instance.
So effectively the update code executed by React would be like:

```js
let oldInputNode = dialogNode.firstChild;
dialogNode.removeChild(oldInputNode);

let pNode = document.createElement("p");
pNode.textContent = "I was just added here!";
dialogNode.appendChild(pNode);

let newInputNode = document.createElement("input");
dialogNode.appendChild(newInputNode);
```

In practice, you would rarely call ReactDOM.render directly. Instead, React apps tend to be broken down into functions like this:

```js
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

This example doesn’t suffer from the problem we just described. It might be easier to see why if we use object notation instead of JSX. Look at the dialog child element tree:

```js
function Form({ showMessage }) {
  let message = null;
  if (showMessage) {
    message = {
      type: "p",
      props: { children: "I was just added here!" }
    };
  }
  return {
    type: "dialog",
    props: {
      children: [message, { type: "input", props: {} }]
    }
  };
}
```

Regardless of whether showMessage is true or false, the <input> is the second child and doesn’t change its tree position between renders.

If showMessage changes from false to true, React would walk the element tree, comparing it with the previous version:

dialog → dialog: Can reuse the host instance? Yes — the type matches.

(null) → p: Need to insert a new p host instance.
input → input: Can reuse the host instance? Yes — the type matches.
And the code executed by React would be similar to this:

```js
let inputNode = dialogNode.firstChild;
let pNode = document.createElement("p");
pNode.textContent = "I was just added here!";
dialogNode.insertBefore(pNode, inputNode);
```

### Lists

With dynamic lists, we can’t be sure the order is ever the same:

```js
function ShoppingList({ list }) {
  return (
    <form>
      {list.map(item => (
        <p>
          You bought {item.name}
          <br />
          Enter how many do you want: <input />
        </p>
      ))}
    </form>
  );
}
```

The code executed by React to re-order 10 items would be something like:

```js
for (let i = 0; i < 10; i++) {
  let pNode = formNode.childNodes[i];
  let textNode = pNode.firstChild;
  textNode.textContent = "You bought " + items[i].name;
}
```

This is why React nags you to specify a special property called key every time you include an array of elements in your output:

```js
function ShoppingList({ list }) {
  return (
    <form>
      {list.map(item => (
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

A key tells React that it should consider an item to be conceptually the same even if it has different positions inside its parent element between renders.

### Components

We’ve already seen functions that return React elements:

```js
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

Components take one argument — an object hash. It contains “props” (short for “properties”). Here, showMessage is a prop. They’re like named arguments.

### Purity

React components are assumed to be pure with respect to their props.

```js
function Button(props) {
  // 🔴 Doesn't work
  props.isActive = true;
}
```

In general, mutation is not idiomatic in React. (We’ll talk more about the idiomatic way to update the UI in response to events later.)

However, local mutation is absolutely fine:

```js
function FriendList({ friends }) {
  let items = [];
  for (let i = 0; i < friends.length; i++) {
    let friend = friends[i];
    items.push(<Friend key={friend.id} friend={friend} />);
  }
  return <section>{items}</section>;
}
```

We created items while rendering and no other component “saw” it so we can mutate it as much as we like before handing it off as part of the render result. There is no need to contort your code to avoid local mutation.

Similarly, lazy initialization is fine despite not being fully “pure”:

```js
function ExpenseForm() {
  // Fine if it doesn't affect other components:
  SuperCalculator.initializeIfNotReady();

  // Continue rendering...
}
```

### Recursion

How do we use components from other components? Components are functions so we could call them:

```js
let reactElement = Form({ showMessage: true });
ReactDOM.render(reactElement, domContainer);
```

However, this is not the idiomatic way to use components in the React runtime.

This means that you don’t directly call the component function, but instead let React later do it for you:

```js
// { type: Form, props: { showMessage: true } }
let reactElement = <Form showMessage={true} />;
ReactDOM.render(reactElement, domContainer);
```

And somewhere inside React, your component will be called:

```js
// Somewhere inside React
let type = reactElement.type; // Form
let props = reactElement.props; // { showMessage: true }
let result = type(props); // Whatever Form returns
```

### Inversion of Control

React can do its job better if it “knows” about your components rather than if it only sees the React element tree after recursively calling them.

```js
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

### Lazy Evaluation

When we call functions in JavaScript, arguments are evaluated before the call:

```js
// (2) This gets computed second
eat(
  // (1) This gets computed first
  prepareMeal()
);
```

Consider this component putting <Comments> inside a <Page>:

```js
function Story({ currentUser }) {
  // return {
  //   type: Page,
  //   props: {
  //     user: currentUser,
  //     children: { type: Comments, props: {} }
  //   }
  // }
  return (
    <Page user={currentUser}>
      <Comments />
    </Page>
  );
}
```

The Page component can render the children given to it inside some Layout:

```js
function Page({ user, children }) {
  return <Layout>{children}</Layout>;
}
```

(<A><B /></A> in JSX is the same as <A children={<B />} />.)

But what if it has an early exit condition?

```js
function Page({ user, children }) {
  if (!user.isLoggedIn) {
    return <h1>Please log in</h1>;
  }
  return <Layout>{children}</Layout>;
}
```

If we called Comments() as a function, it would execute immediately regardless of whether Page wants to render them or not:

```js
// {
//   type: Page,
//   props: {
//     children: Comments() // Always runs!
//   }
// }
<Page>{Comments()}</Page>
```

But if we pass a React element, we don’t execute Comments ourselves at all:

```js
// {
//   type: Page,
//   props: {
//     children: { type: Comments }
//   }
// }
<Page>
  <Comments />
</Page>
```

### State

We call these features Hooks. For example, useState is a Hook.

```js
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

### Memoization

When a parent schedules an update by calling setState, by default React reconciles its whole child subtree. This is because React can’t know whether an update in the parent would affect the child or not, and by default, React opts to be consistent. This may sound very expensive but in practice, it’s not a problem for small and medium-sized subtrees.

When trees get too deep or wide, you can tell React to memoize a subtree and reuse previous render results during shallow equal prop changes:

```js
function Row({ item }) {
  // ...
}

export default React.memo(Row);
```

Now setState in a parent <Table> component would skip over reconciling Rows whose item is referentially equal to the item rendered last time.

React intentionally doesn’t memoize components by default. Many components always receive different props so memoizing them would be a net loss.

### Batching

Several components may want to update state in response to the same event. This example is contrived but it illustrates a common pattern:

```js
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

```js
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

```js
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

```js
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

```js
const [count, setCount] = useState(0);

function increment() {
  setCount(c => c + 1);
}

function handleClick() {
  increment();
  increment();
  increment();
}
```

React would put the updater functions in a queue, and later run them in sequence, resulting in a re-render with count set to 3.

When state logic gets more complex than a few setState calls, I recommend expressing it as a local state reducer with the useReducer Hook. It’s like an evolution of this “updater” pattern where each update is given a name:

```js
const [counter, dispatch] = useReducer((state, action) => {
  if (action === "increment") {
    return state + 1;
  } else {
    return state;
  }
}, 0);

function handleClick() {
  dispatch("increment");
  dispatch("increment");
  dispatch("increment");
}
```

The action argument can be anything, although an object is a common choice.

### Context

In React, this is solved by Context. It is essentially like dynamic scoping for components. It’s like a wormhole that lets you put something on the top, and have every child at the bottom be able to read it and re-render when it changes.

```js
const ThemeContext = React.createContext(
  "light" // Default value as a fallback
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

When SomeDeeplyNestedChild renders, useContext(ThemeContext) will look for the closest <ThemeContext.Provider> above it in the tree, and use its value.

(In practice, React maintains a context stack while it renders.)

If there’s no ThemeContext.Provider above, the result of useContext(ThemeContext) call will be the default value specified in the createContext() call. In our example, it is 'light'.

### Effects

In React, this is done by declaring an effect:

```js
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

Effects may require cleanup, such as in case of subscriptions. To clean up after itself, an effect can return a function:

```js
useEffect(() => {
  DataSource.addSubscription(handleChange);
  return () => DataSource.removeSubscription(handleChange);
});
```

Sometimes, re-running the effect on every render can be undesirable. You can tell React to skip applying an effect if certain variables didn’t change:

```js
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```

However, it is often a premature optimization and can lead to problems if you’re not familiar with how JavaScript closures work.

For example, this code is buggy:

```js
useEffect(() => {
  DataSource.addSubscription(handleChange);
  return () => DataSource.removeSubscription(handleChange);
}, []);
```

It is buggy because [] says “don’t ever re-execute this effect”. But the effect closes over handleChange which is defined outside of it. And handleChange might reference any props or state:

```js
function handleChange() {
  console.log(count);
}
```

If we never let the effect re-run, handleChange will keep pointing at the version from the first render, and count will always be 0 inside of it.

To solve this, make sure that if you specify the dependency array, it includes all things that can change, including the functions:

```js
useEffect(() => {
  DataSource.addSubscription(handleChange);
  return () => DataSource.removeSubscription(handleChange);
}, [handleChange]);
```

### Custom Hooks

Since Hooks like useState and useEffect are function calls, we can compose them into our own Hooks:

```js
function MyResponsiveComponent() {
  const width = useWindowWidth(); // Our custom Hook
  return <p>Window width is {width}</p>;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return width;
}
```

Custom Hooks let different components share reusable stateful logic. Note that the state itself is not shared. Each call to a Hook declares its own isolated state.

### Static Use Order

You can think of useState as a syntax for defining a “React state variable”. It’s not really a syntax, of course. We’re still writing JavaScript. But we are looking at React as a runtime environment, and because React tailors JavaScript to describing UI trees, its features sometimes live closer to the language space.

If use were a syntax, it would make sense for it to be at the top level:

```js
// 😉 Note: not a real syntax
component Example(props) {
  const [count, setCount] = use State(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

What would putting it into a condition or a callback or outside a component even mean?

```js
// 😉 Note: not a real syntax

// This is local state... of what?
const [count, setCount] = use State(0);

component Example() {
  if (condition) {
    // What happens to it when condition is false?
    const [count, setCount] = use State(0);
  }

  function handleClick() {
    // What happens to it when we leave a function?
    // How is this different from a variable?
    const [count, setCount] = use State(0);
  }
```

React state is local to the component and its identity in the tree. If use were a real syntax it would make sense to scope it to the top-level of a component to

```js
// 😉 Note: not a real syntax
component Example(props) {
  // Only valid here
  const [count, setCount] = use State(0);

  if (condition) {
    // This would be a syntax error
    const [count, setCount] = use State(0);
  }
```

This is similar to how import only works at the top level of a module.

Of course, use is not actually a syntax. (It wouldn’t bring much benefit and would create a lot of friction.)

This article provides a simplified explanation for how Hooks work internally. Arrays might be an easier mental model than linked lists:

```js
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

---

## 2019 ReactJS Best Practices

[https://medium.com/@konstankino/2019-reactjs-best-practices-design-patterns-516e1c3ca06a](https://medium.com/@konstankino/2019-reactjs-best-practices-design-patterns-516e1c3ca06a)

### Types of ReactJS components

There are four main types of ReactJS components:

- State-full or class-based components
- State-less or function-based components
- Presentational (or high-order) components
- Container components

[https://miro.medium.com/max/930/1*p1Ej4slk27NuCISlt0EcYA.png]
A preferred structure of your components tree is displayed on the left.

### State-full components or class-based components

Here is an example of the state-full, class-based ReactJS component:

[https://miro.medium.com/max/1403/0*1-H1z9phHWTRfze7.png]

[https://miro.medium.com/max/1410/0*UjwffjIGdUgC7F6D.png]

### Data-Down, Actions-Up

### Higher-Order Component

[https://miro.medium.com/max/1634/0*w-QLTAF5W7i42jZs.png]

### Container components

### Best Practices List

[Update May 22nd, 2019] — When using ReduxJS, split your Reducer code into smaller methods to avoid huge JSON within your Reducer.
Consider using TypeScript in your apps if you do not do it already.
Use the create-react-app generator to bootstrap your ReactJS app.
Keep your code DRY. Don’t Repeat Yourself, but keep in mind code duplicate is NOT always a bad thing.
Avoid having large classes, methods or components, including Reducers.
Use more robust managers to manage application state, such as Redux.
Use event synchronizer, such as Redux-Thunk, for interactions with your back end API.
Avoid passing too many attributes or arguments. Limit yourself to five props that you pass into your component.
Use ReactJS defaultProps and ReactJS propTypes.
Use linter, break up lines that are too long.
Keep your own jslint configuration file.
Always use a dependency manager with a lock file, such as NPM or yarn.
Test your commonly accessed code, code that is complex and prone to bugs.
Write more tests that give more test coverage for your code with a little effort and test code to ensure its proper functioning.
Every time you find a bug, make sure you write a test first.
Use function-based components by starting to use React Hooks, a new ReactJS way to create state-full components.
Use ES6 de-structuring for your props.
Use conditional rendering.
User `map()` to collect and render collections of components.
Use partial components, such as `<>` … `</>`
Name your event handlers with handle prefixes, such as `handleClick()` or `handleUpdate()`.
Use `onChange` to control your inputs, such as `onChange={this.handleInputChange}`.
Use JEST to test your ReactJS code.

Here is an example of using defaultProps and propTypes:
[https://miro.medium.com/max/1635/0*jRKmcUovWbWh9tkt.png]

---

## React v16.9.0 and the Roadmap Update

[https://ru.reactjs.org/blog/2019/08/08/react-v16.9.0.html](https://ru.reactjs.org/blog/2019/08/08/react-v16.9.0.html)

componentWillMount → UNSAFE_componentWillMount
componentWillReceiveProps → UNSAFE_componentWillReceiveProps
componentWillUpdate → UNSAFE_componentWillUpdate

```js
cd your_project
npx react-codemod rename-unsafe-lifecycles
```
