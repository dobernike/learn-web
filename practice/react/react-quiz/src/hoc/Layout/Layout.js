import React, { Component } from "react";
import "./Layout.css";
import { connect } from "react-redux";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {
  state = {
    menu: false
  };

  toggleMenuHandler = () => {
    this.setState({ menu: !this.state.menu });
  };

  closeMenuHandler = () => {
    this.setState({ menu: false });
  };

  render() {
    return (
      <div className={`Layout`}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.closeMenuHandler}
          isAuthenticated={this.props.isAuthenticated}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

export default connect(mapStateToProps)(Layout);
