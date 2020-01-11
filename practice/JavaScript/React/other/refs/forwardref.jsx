function FancyButton(props) {
  return <button className="FancyButton">{props.children}</button>;
}

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// Теперь реф будет указывать непосредственно на DOM-узел button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("старые пропсы:", prevProps);
      console.log("новые пропсы:", this.props);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return LogProps;
}

class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// Вместо экспорта FancyButton, мы экспортируем LogProps.
// Рендериться при этом будет FancyButton.
export default logProps(FancyButton);

import FancyButton from "./FancyButton";

const ref = React.createRef();

// Компонент FancyButton, который мы импортировали — это HOC LogProps.
// Несмотря на то, что рендерят они одно и то же,
// реф в данном случае будет указывать на LogProps, а не на сам FancyButton!
// Это значит, что мы не сможем, например, вызвать ref.current.focus()
<FancyButton label="Click Me" handleClick={handleClick} ref={ref} />;

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps);
      console.log("new props:", this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;

      // Передаём в качестве рефа проп "forwardedRef"
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Обратите внимание, что React.forwardRef передает "ref" вторым аргументом.
  // Мы можем передать его дальше как проп, например, "forwardedRef",
  // а потом привязать его к компоненту.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}

const WrappedComponent = React.forwardRef((props, ref) => {
  return <LogProps {...props} forwardedRef={ref} />;
});

const WrappedComponent = React.forwardRef(function myFunction(props, ref) {
  return <LogProps {...props} forwardedRef={ref} />;
});

function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // Дадим компоненту более понятное имя в инструментах разработки.
  // Например, "ForwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}
