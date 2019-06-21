import React, { Component } from "react";
import "./Layout.css";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

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
        <Drawer isOpen={this.state.isOpen} />
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
