import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter()
});

describe("<App />", () => {
  it(`should render 3 light characters`, () => {});
});
