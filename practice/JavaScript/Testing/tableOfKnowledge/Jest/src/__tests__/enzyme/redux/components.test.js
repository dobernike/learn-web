import React, { Component } from "react";
import PropTypes from "prop-types";
import TodoTextInput from "./TodoTextInput";
class Header extends Component {
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text);
    }
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo={true}
          onSave={this.handleSave.bind(this)}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}
Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};
export default Header;

import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Header from "../../components/Header";
Enzyme.configure({ adapter: new Adapter() });
function setup() {
  const props = {
    addTodo: jest.fn()
  };
  const enzymeWrapper = shallow(<Header {...props} />);
  return {
    props,
    enzymeWrapper
  };
}
describe("components", () => {
  describe("Header", () => {
    it("should render self and subcomponents", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find("header").hasClass("header")).toBe(true);
      expect(enzymeWrapper.find("h1").text()).toBe("todos");
      const todoInputProps = enzymeWrapper.find("TodoTextInput").props();
      expect(todoInputProps.newTodo).toBe(true);
      expect(todoInputProps.placeholder).toEqual("What needs to be done?");
    });
    it("should call addTodo if length of text is greater than 0", () => {
      const { enzymeWrapper, props } = setup();
      const input = enzymeWrapper.find("TodoTextInput");
      input.props().onSave("");
      expect(props.addTodo.mock.calls.length).toBe(0);
      input.props().onSave("Use Redux");
      expect(props.addTodo.mock.calls.length).toBe(1);
    });
  });
});
