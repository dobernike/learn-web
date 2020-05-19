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
