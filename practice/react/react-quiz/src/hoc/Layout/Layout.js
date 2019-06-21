import React, { Component } from "react";
import "./Layout.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
class Layout extends Component {
  state = {
    isOpen: false
  };

  toggleMenuHandler = () => {
    console.log(`click`);
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className={`Layout`}>
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.isOpen}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
