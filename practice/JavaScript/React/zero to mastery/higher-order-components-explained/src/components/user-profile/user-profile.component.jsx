import React from 'react';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>{this.props.name}</h1>
        <h2>{this.props.email}</h2>
      </div>
    );
  }
}

export default UserProfile;
