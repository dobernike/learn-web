const EnhancedComponent = higherOrderComponent(WrappedComponent);

class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" -- произвольный глобальный источник данных
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Подписаться на оповещения
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Отписаться от оповещений
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Сохранить комментарии из внешнего источника в локальном состоянии
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

const CommentListWithSubscription = withSubscription(CommentList, DataSource =>
  DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

// Эта функция принимает компонент...
function withSubscription(WrappedComponent, selectData) {
  // ...и возвращает другой компонент...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ...который подписывается на оповещения...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... и рендерит оборачиваемый компонент со свежими данными!
      // Обратите внимание, что мы передаём остальные пропсы
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}

function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log("Текущие пропсы: ", this.props);
    console.log("Следующие пропсы: ", nextProps);
  };
  // Если мы возвращаем оборачиваемый компонент, значит, наверняка мы его изменили
  return InputComponent;
}

// EnhancedComponent будет печатать в консоль при каждом изменении пропсов
const EnhancedComponent = logProps(InputComponent);

function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log("Текущие пропсы: ", this.props);
      console.log("Следующие пропсы: ", nextProps);
    }
    render() {
      // Оборачиваем компонент в контейнер без мутаций. Супер!
      return <WrappedComponent {...this.props} />;
    }
  };
}


render() {
  // Отфильтруйте пропсы применимые только к этому HOC и которые не нужно передавать дальше
  const { extraProp, ...passThroughProps } = this.props;

  // Добавьте новые пропсы в оборачиваемый компонент. Обычно мы передаём значения состояния или методы экземпляра
  const injectedProp = someStateOrInstanceMethod;

  // Передайте пропсы в оборачиваемый компонент
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}

const NavbarWithRouter = withRouter(Navbar);

const CommentWithRelay = Relay.createContainer(Comment, config);

// `connect` из React Redux
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

// Вызов функции connect возвращает другую функцию
const enhance = connect(commentListSelector, commentListActions);

// Эта функция и есть HOC. Она возвращает компонент, подключённый к хранилищу Redux
const ConnectedComment = enhance(CommentList);

// Вместо этого...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... вы можете воспользоваться вспомогательной совмещающей функцией
// compose(f, g, h) идентичен (...args) => f(g(h(...args)))
const enhance = compose(
  // Оба параметра являются HOC и принимают один единственный аргумент
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)

function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

render() {
  // Мы создаём новую версию EnhancedComponent при каждом рендере
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // Мы каждый раз размонтируем и монтируем целиком всё поддерево!
  return <EnhancedComponent />;
}

// Определим статический метод
WrappedComponent.staticMethod = function() {/*...*/}
// Теперь применим HOC
const EnhancedComponent = enhance(WrappedComponent);

// У расширенного компонента нет статических методов
typeof EnhancedComponent.staticMethod === 'undefined' // true

function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Мы должны точно знать какие методы копировать :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}

import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}

// Вместо...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...отдельно экспортируйте метод...
export { someFunction };

// ...в модуле-потребителе мы можем использовать оба экспорта
import MyComponent, { someFunction } from './MyComponent.js';
