import './index.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, configure, action, decorate, runInAction } from 'mobx';
import { observer } from 'mobx-react';
// import DevTools from 'mobx-react-devtools';
configure({ enforceActions: 'observed' });

class Store {
  user = null;

	getUser() {
    fetch(`https://randomuser.me/api/`)
    .then(res => res.json())
    .then(json => {
      if (json.results) {
        // this.setUser(json.results)
        // or
        runInAction(() => {
          this.user = json.results[0]
        })
      }
    })
  }

  setUser(results) {
    this.user = results[0]
  }
};

decorate(Store, {
  user: observable,
  getUser: action.bound,
  setUser: action
})

const appStore = new Store();

@observer class App extends Component {
  render() {
    return (
      <div>
				{/* <DevTools /> */}
        <button onClick={this.props.store.getUser}>Get User</button>
        <h1>{this.props.store.user ? this.props.store.user.login.username : 'Default name'}</h1>
      </div>
    )
  }
}

ReactDOM.render(<App store={appStore} />, document.getElementById('root'));
