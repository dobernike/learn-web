import React from "react";
const withConditional = Component =>
  function withConditionalComponent({ condition, ...props }) {
    if (condition) {
      return <Component {...props} />;
    }
    return null;
  };
export default withConditional;

const ConditionalComponent = withConditional(MyComponent);
class HelloWorld extends React.Component {
  render() {
    return <ConditionalComponent condition={3 > 4} />;
  }
}

it("should render the component only when the condition passes", () => {
  const ConditionalComponent = withConditional(Component);
  const wrapper = shallow(<ConditionalComponent condition={true} />);
  expect(wrapper.html()).not.toBe(null);
});

it("should return null when the condition fails", () => {
  const ConditionalComponent = withConditional(Component);
  const wrapper = shallow(<ConditionalComponent condition={false} />);
  expect(wrapper.html()).toBe(null);
});
