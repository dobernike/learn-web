/** Passing props to a Component */

/* X incorrect */
<Route path="/pokemon" someData={someData} component={Pokemon} />
// Passing 'someData' as props X just ignoring

<Route path="/pokemon" component={() => <Pokemon someData={someData} />} />
// Passing 'someData' as props X work fine but rerender Pokemon every rerender parant component

/* V correct */
// Best way is render prop <3
<Route path="/pokemon" render={() => <Pokemon someData={someData} />} />

/** Navigate Programmatically */

//Not a good approach
handleSubmit = () => {
  // perform required operations
  this.props.history.push('/pokemon');
}

// Not a great approach
import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {

  handleSubmit = () => {
    // perform operations
    // on successfull async operation
    this.props.history.push('/pokemon');
  }

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <Form onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default withRouter(LoginForm);

// Great approach V
import React from 'react';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {

  state = {
    showPokemon: false
  }
  handleSubmit = () => {
    // perform desired operation
    // on successfull async operation
    this.setState({
      showPokemon: true
    });
  };

  render() {
    if (this.state.showPokemon) {
      return <Redirect to="/pokemon" />
    }
    return (
      <div>
        <h1>Login Form</h1>
        <Form onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default LoginForm;

/** Protected Routes */

// Private Route Component
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    utils.auth.isAuthenticated === true
    ? <Component {...props} />
    : <Redirect to="/login" />
   )}
);

<Route path="/digimon" component={Digimon} />
<PrivateRoute path="/yugioh" component={Yugioh} />
<PrivateRoute path="/pokemon" component={Pokemon}

/** Using a route config file */

// route.js file
export const routes = [
  {
    path: 'pokemon',
    component: 'Pokemon'
  },
  {
    path: 'digimon',
    component: 'Digimon'
  },
  {
    path: 'yugioh',
    component: 'Yugioh'
  }
];

// App.js file
import { routes } from './routes';

<Router>
  { routes.map((route) => {
    <Route
      key={route.path}
      path={route.path}
      component={route.component}
      />
  })}
</Router>
