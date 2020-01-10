import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "react-router-redux";

export default function requiresAuth(WrappedComponent) {
  class AuthenticatedComponent extends Component {
    static propTypes = {
      user: PropTypes.object,
      dispatch: PropTypes.func.isRequired
    };

    componentDidMount() {
      this._checkAndRedirect();
    }

    componentDidUpdate() {
      this._checkAndRedirect();
    }

    _checkAndRedirect() {
      const { dispatch, user } = this.props;

      if (!user) {
        dispatch(push("/signin"));
      }
    }

    render() {
      return (
        <div className="authenticated">
          {this.props.user ? <WrappedComponent {...this.props} /> : null}
        </div>
      );
    }
  }

  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";
  AuthenticatedComponent.displayName = `Authenticated(${wrappedComponentName})`;

  const mapStateToProps = state => {
    return {
      user: state.account.user
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
