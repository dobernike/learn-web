import React, { Component } from 'react';
import CounterButton from './CounterButton';

class Header extends Component {
  render() {
    return (
      <div>
        <h1 className="f1">RoboFriends</h1>
        <CounterButton color="red" />
      </div>
    );
  }
}

export default Header;
