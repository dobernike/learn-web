import React from "react";
import renderer from "react-test-renderer";

import Custom from "../../Custom";

describe("Custom", () => {
  test("snapshot renders", () => {
    const tree = renderer.create(<Custom />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
