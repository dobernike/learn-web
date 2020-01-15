import { connect } from "react-redux";
import { compose } from "redux";

// Define a functional React component.
export function UserProfileBase(props) {
  return <span>{props.user.name}</span>;
}

// Define a function to map Redux state to properties.
function mapStateToProps(state, ownProps) {
  return { user: state.users[ownProps.userId] };
}

// Export the final UserProfile component composed of
// a state mapper function.
export default compose(connect(mapStateToProps))(UserProfileBase);

import { mount } from "enzyme";
import UserProfile from "src/UserProfile";

describe("<UserProfile>", () => {
  it("renders a name", () => {
    const store = createNormalReduxStore();
    // Simulate fetching a user from an API and loading it into state.
    store.dispatch(actions.loadUser({ userId: 1, name: "Kumar" }));

    // Render with a user ID so it can retrieve the user from state.
    const root = mount(<UserProfile userId={1} store={store} />);

    expect(root.find("span")).toEqual("Kumar");
  });
});

export function UserProfileBase(props) {
  const { user } = props;
  return (
    <div>
      <UserAvatar url={user.avatarURL} />
      <span>{user.name}</span>
    </div>
  );
}

import UserProfile, { UserProfileBase } from "src/UserProfile";
import UserAvatar from "src/UserAvatar";
import { shallowUntilTarget } from "./helpers";

describe("<UserProfile>", () => {
  it("renders a UserAvatar", () => {
    const user = {
      userId: 1,
      avatarURL: "https://cdn/image.png"
    };
    store.dispatch(actions.loadUser(user));

    const root = shallowUntilTarget(
      <UserProfile userId={1} store={store} />,
      UserProfileBase
    );

    expect(root.find(UserAvatar).prop("url")).toEqual(user.avatarURL);
  });
});

export function UserProfileBase(props) {
  const { user } = props;
  return (
    <div>
      <InfoCard>
        <UserAvatar url={user.avatarURL} />
      </InfoCard>
      <span>{user.name}</span>
    </div>
  );
}

expect(root.find(UserAvatar).prop("url")).toEqual(user.avatarURL);

export function UserProfileBase(props) {
  const { user } = props;
  const avatar = <UserAvatar url={user.avatarURL} />;
  return (
    <div>
      <InfoCard content={avatar} />
      <span>{user.name}</span>
    </div>
  );
}

export function UserProfileBase(props) {
  const { user } = props;
  return (
    <div>
      <InfoCard header={<Localized>Avatar</Localized>}>
        <UserAvatar url={user.avatarURL} />
      </InfoCard>
      <span>{user.name}</span>
    </div>
  );
}

import { shallow } from "enzyme";
import InfoCard from "src/InfoCard";
import Localized from "src/Localized";
import { shallowUntilTarget } from "./helpers";

describe("<UserProfile>", () => {
  it("renders an InfoCard with a custom header", () => {
    const user = {
      userId: 1,
      avatarURL: "https://cdn/image.png"
    };
    store.dispatch(actions.loadUser(user));

    const root = shallowUntilTarget(
      <UserProfile userId={1} store={store} />,
      UserProfileBase
    );

    const infoCard = root.find(InfoCard);

    // Simulate how InfoCard will render the
    // header property we passed to it.
    const header = shallow(<div>{infoCard.prop("header")}</div>);

    // Now you can make assertions about the content:
    expect(header.find(Localized).text()).toEqual("Avatar");
  });
});

import FormOverlay from "src/FormOverlay";

export class UserProfileManagerBase extends React.Component {
  onSubmit = () => {
    // Pretend that the inputs are controlled form elements and
    // their values have already been connected to this.state.
    this.props.dispatch(actions.updateUser(this.state));
  };

  render() {
    return (
      <FormOverlay onSubmit={this.onSubmit}>
        <input id="nameInput" name="name" />
      </FormOverlay>
    );
  }
}

// Export the final UserProfileManager component.
export default compose(
  // Use connect() from react-redux to get props.dispatch()
  connect()
)(UserProfileManagerBase);

import FormOverlay from "src/FormOverlay";
import { shallowUntilTarget } from "./helpers";

describe("<UserProfileManager>", () => {
  it("updates user information", () => {
    const store = createNormalReduxStore();
    // Create a spy of the dispatch() method for test assertions.
    const dispatchSpy = sinon.spy(store, "dispatch");

    const root = shallowUntilTarget(
      <UserProfileManager store={store} />,
      UserProfileManagerBase
    );

    // Simulate typing text into the name input.
    const name = "Faye";
    const changeEvent = {
      target: { name: "name", value: name }
    };
    root.find("#nameInput").simulate("change", changeEvent);

    const formOverlay = root.find(FormOverlay);

    // Simulate how FormOverlay will invoke the onSubmit property.
    const onSubmit = formOverlay.prop("onSubmit");
    onSubmit();

    // Make sure onSubmit dispatched the correct ation.
    const expectedAction = actions.updateUser({ name });
    sinon.assertCalledWith(dispatchSpy, expectedAction);
  });
});
