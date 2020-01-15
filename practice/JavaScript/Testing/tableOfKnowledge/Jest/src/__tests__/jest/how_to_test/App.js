// src/App.js
<div className="App">
  <button
    className="loadButton"
    onClick={this.props.getUsers}
    disabled={this.props.users.loading}
  >
    Load Users
  </button>
  {this.props.users.users.length > 0 && (
    <ul>
      {this.props.users.users.map(user => {
        return <User user={user} key={user.id} />;
      })}
    </ul>
  )}
  {this.props.users.error && <div>A network error occurred</div>}
</div>;
