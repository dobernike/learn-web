import React from 'react';

class ProfileIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
  }
  render() {
    return (
      <div className="pa4 tc">
        <img
          src="http://tachyons.io/img/logo.jpg"
          className="br-100 ba h3 w3 dib"
          alt="avatar"
        />
      </div>
    );
  }
}

export default ProfileIcon;
