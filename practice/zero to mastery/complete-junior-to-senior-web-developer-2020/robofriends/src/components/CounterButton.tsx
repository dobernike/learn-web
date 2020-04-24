import * as React from 'react';

interface IProps {
  color: string;
}

interface IState {
  count: number;
}

class CounterButton extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  updateCount = () => {
    this.setState((state) => ({ count: state.count + 1 }));
  };

  render() {
    return (
      <button
        id="counter"
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
