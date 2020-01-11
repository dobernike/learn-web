import React, { Component } from "react";
const App = () => (
  <div>
    <h1>Currency Converter</h1>
  </div>
);
export default App;

const App = () => <Amount />;
class Amount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
      </div>
    );
  }
}

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;
const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;

class Amount extends Component {
  // ...
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        <Euro amount={this.state.amount} />
        <Pound amount={this.state.amount} />
      </div>
    );
  }
}

const App = () => (
  <div>
    <Amount />
    <Euro amount={amount} />
    <Pound amount={amount} />
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <Amount
          amount={this.state.amount}
          onIncrement={this.onIncrement}
          onDecrement={this.onDecrement}
        />
        <Euro amount={this.state.amount} />
        <Pound amount={this.state.amount} />
      </div>
    );
  }
}
const Amount = ({ amount, onIncrement, onDecrement }) => (
  <div>
    <span>US Dollar: {amount} </span>
    <button type="button" onClick={onIncrement}>
      +
    </button>
    <button type="button" onClick={onDecrement}>
      -
    </button>
  </div>
);

class Amount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.children}
      </div>
    );
  }
}

const App = () => (
  <Amount>
    <Pound amount={amount} />
    <Euro amount={amount} />
  </Amount>
);

const App = () => (
  <Amount>
    {() => (
      <div>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  </Amount>
);

class Amount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.children()}
      </div>
    );
  }
}

const App = () => (
  <Amount>
    {amount => (
      <div>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  </Amount>
);
class Amount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0
    };
  }
  onIncrement = () => {
    this.setState(state => ({ amount: state.amount + 1 }));
  };
  onDecrement = () => {
    this.setState(state => ({ amount: state.amount - 1 }));
  };
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.children(this.state.amount)}
      </div>
    );
  }
}

const App = () => (
  <Amount>
    {amount => (
      <div>
        <h1>My Currency Converter</h1>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  </Amount>
);

const App = () => (
  <Amount
    render={amount => (
      <div>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  />
);
class Amount extends Component {
  // ...
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.render(this.state.amount)}
      </div>
    );
  }
}

const App = () => (
  <Amount
    renderAmountOne={amount => (
      <div>
        <h2>My one Amount</h2>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
    renderAmountTwo={amount => (
      <div>
        <h2>My other Amount</h2>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  />
);
class Amount extends Component {
  //...
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount} </span>
        {this.props.renderAmountTwo(this.state.amount)}
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.renderAmountOne(this.state.amount)}
      </div>
    );
  }
}

const withAmount = currencyComponents =>
  class Amount extends Component {
    constructor(props) {
      super(props);
      this.state = {
        amount: 0
      };
    }
    onIncrement = () => {
      this.setState(state => ({ amount: state.amount + 1 }));
    };
    onDecrement = () => {
      this.setState(state => ({ amount: state.amount - 1 }));
    };
    render() {
      return (
        <div>
          <span>US Dollar: {this.state.amount} </span>
          <button type="button" onClick={this.onIncrement}>
            +
          </button>
          <button type="button" onClick={this.onDecrement}>
            -
          </button>
          {currencyComponents.map(CurrencyComponent => (
            <CurrencyComponent amount={this.state.amount} />
          ))}
        </div>
      );
    }
  };

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;
const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;
const CurrenciesWithAmount = withAmount([Euro, Pound]);

const App = () => <CurrenciesWithAmount />;
