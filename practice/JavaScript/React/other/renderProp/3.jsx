class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /*...*/
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const Children1 = () => {};

const Children2 = () => {};

const App = () => (
  <Parent>
    <Children1 />
    <Children2 />
  </Parent>
);

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Flavio" };
  }

  render() {
    return <div>{this.props.children(this.state.name)}</div>;
  }
}

const Children1 = props => {
  return <p>{props.name}</p>;
};

const App = () => <Parent>{name => <Children1 name={name} />}</Parent>;

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "Flavio", age: 35 };
  }

  render() {
    return (
      <div>
        <p>Test</p>
        {this.props.someprop1(this.state.name)}
        {this.props.someprop2(this.state.age)}
      </div>
    );
  }
}

const Children1 = props => {
  return <p>{props.name}</p>;
};

const Children2 = props => {
  return <p>{props.age}</p>;
};

const App = () => (
  <Parent
    someprop1={name => <Children1 name={name} />}
    someprop2={age => <Children2 age={age} />}
  />
);

ReactDOM.render(<App />, document.getElementById("app"));
