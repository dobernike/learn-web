/**
 *
 * Auth.js
 *
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

export default function(ComposedComponent) {
  class Authentication extends Component {
    /* eslint-disable */
    componentWillMount() {
      if (this.props.authenticated === false) {
        return this.props.changePage();
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated === false) {
        return this.props.changePage();
      }
    }
    /* eslint-enable */

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authentication.propTypes = {
    authenticated: PropTypes.bool,
    changePage: PropTypes.func
  };

  const mapStateToProps = state => ({ authenticated: state.user.isLoaded });

  const mapDispatchToProps = dispatch =>
    bindActionCreators({ changePage: () => push("/login") }, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}

// test

import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";

import Auth from "../Auth";

let store;

describe("<Auth />", () => {
  beforeEach(() => {
    const mockStore = configureStore();

    // creates the store with any initial state or middleware needed
    store = mockStore({
      user: {
        isLoaded: true
      }
    });
  });
  it("Should render the component only when auth prop is true", () => {
    const Component = <h1>Hola</h1>;
    const ConditionalHOC = Auth(Component);
    const wrapper = shallow(<ConditionalHOC store={store} />);
    expect(wrapper).not.toBe(null);
  });
});
