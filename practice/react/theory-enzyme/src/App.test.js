import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App";
import Character from "./Character";

configure({
  adapter: new Adapter()
});

let wrapper;

beforeEach(() => {
  wrapper = shallow(<App />);
});

describe("<App />", () => {
  it(`should render 3 light characters`, () => {
    expect(wrapper.find(Character)).toHaveLength(3);
  });

  it(`should render 2 dark characters`, () => {
    wrapper.setProps({
      side: "dark"
    });
    expect(wrapper.find(Character)).toHaveLength(2);
  });
});
