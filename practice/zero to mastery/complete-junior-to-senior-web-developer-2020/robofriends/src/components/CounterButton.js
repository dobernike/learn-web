import React, { PureComponent } from 'react';

class CounterButton extends PureComponent {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (this.state.count !== nextState.count) {
  //       return true;
  //     }
  //     return false;
  //   }

  updateCount = () => {
    this.setState((state) => ({ count: state.count + 1 }));
  };

  render() {
    return (
      <button
        color={this.props.color}
        onClick={this.updateCount}
        className="f1"
      >
        Count: {this.state.count}
      </button>
    );
  }
}

export default CounterButton;
