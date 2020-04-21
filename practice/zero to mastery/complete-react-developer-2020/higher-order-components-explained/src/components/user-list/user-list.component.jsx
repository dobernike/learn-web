import React from 'react';

import withData from '../../with-data';

const UserList = ({ data }) => (
  <div className="container user-list">
    <h1> Users List</h1>
    {data.map((user) => (
      <div className="post" key={user.id}>
        <div>{user.name}</div>
        <div>{user.email}</div>
      </div>
    ))}
  </div>
);

export default withData(UserList);
