# Framework Features

# JSX In Depth

## JSX в деталях

[https://ru.reactjs.org/docs/jsx-in-depth.html]

---

# Redux

## Usage with React

[https://redux.js.org/basics/usage-with-react](https://redux.js.org/basics/usage-with-react)

### Implementing Components

components/Todo.js

```js
import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}
  </li>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default Todo;
```

components/TodoList.js

```js
import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map((todo, index) => (
      <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired,
};

export default TodoList;
```

components/Link.js

```js
import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href=""
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Link;
```

components/Footer.js

```js
import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions';

const Footer = () => (
  <p>
    Show: <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </p>
);

export default Footer;
```

### Implementing Container Components

To use connect(), you need to define a special function called mapStateToProps that describes how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping. For example, VisibleTodoList needs to calculate todos to pass to the TodoList, so we define a function that filters the state.todos according to the state.visibilityFilter, and use it in its mapStateToProps:

```js
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed);
    case 'SHOW_ALL':
    default:
      return todos;
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};
```

In addition to reading the state, container components can dispatch actions. In a similar fashion, you can define a function called mapDispatchToProps() that receives the dispatch() method and returns callback props that you want to inject into the presentational component. For example, we want the VisibleTodoList to inject a prop called onTodoClick into the TodoList component, and we want onTodoClick to dispatch a TOGGLE_TODO action:

```js
const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};
```

Finally, we create the VisibleTodoList by calling connect() and passing these two functions:

```js
import { connect } from 'react-redux';

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
```

Find the rest of the container components defined below:

containers/FilterLink.js

```js
import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
```

containers/VisibleTodoList.js

```js
import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter((t) => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter((t) => !t.completed);
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;
```

### Implementing Other Components

containers/AddTodo.js

```js
import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          dispatch(addTodo(input.value));
          input.value = '';
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
AddTodo = connect()(AddTodo);

export default AddTodo;
```

### Tying the containers together within a component

components/App.js

```js
import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default App;
```

### Passing the Store

index.js

```js
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';

const store = createStore(todoApp);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

---

## How to use Redux in ReactJS with real-life examples

[https://www.freecodecamp.org/news/how-to-use-redux-in-reactjs-with-real-life-examples-687ab4441b85/](https://www.freecodecamp.org/news/how-to-use-redux-in-reactjs-with-real-life-examples-687ab4441b85/)

### When working with Redux, you will need three main things:

- actions: these are objects that should have two properties, one describing the type of action, and one describing what should be changed in the app state.
- reducers: these are functions that implement the behavior of the actions. They change the state of the app, based on the action description and the state change description.
- store: it brings the actions and reducers together, holding and changing the state for the whole app — there is only one store.

```js
export const startAction = {
  type: 'rotate',
  payload: true,
};
```

```js
export default (state, action) => {
  switch (action.type) {
    case 'rotate':
      return {
        rotating: action.payload,
      };
    default:
      return state;
  }
};
```

```js
import { createStore } from 'redux';
import rotateReducer from 'reducers/rotateReducer';

function configureStore(state = { rotating: true }) {
  return createStore(rotateReducer, state);
}

export default configureStore;
```

```js
import { connect } from 'react-redux';
import { startAction } from 'actions/startAction';
import { stopAction } from 'actions/stopAction';

export default connect()(App);
```

### This will be done using the connect function, which accepts two parameters:

- mapStateToProps: this is used to retrieve the store state
- mapDispatchToProps: this is used to retrieve the actions and dispatch them to the store

```js
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  startAction: () => dispatch(startAction),
  stopAction: () => dispatch(stopAction),
});
```

After this, let’s add them inside our connect function like so:

```js
export default connect(mapStateToProps, mapDispatchToProps)(App);
```

App.js

```js
import React, { Component } from 'react';
// new lines from here
import { connect } from 'react-redux';
import rotateAction from 'actions/rotateAction';

//// new lines to here

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className={
              'App-logo' + (this.props.rotating ? '' : ' App-logo-paused')
            }
            alt="logo"
            onClick={() => this.props.rotateAction(!this.props.rotating)}
          />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
  rotateAction: (payload) => dispatch(rotateAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

---

## ReactNext 2019: A Deep Dive into React-Redux

[https://www.youtube.com/watch?v=yOZ4Ml9LlWE&feature=youtu.be](https://www.youtube.com/watch?v=yOZ4Ml9LlWE&feature=youtu.be)

redux hooks
useDispatch()
useSelector()

useContext
zombie-child (update child, but not parrent)

## Advanced

[https://redux.js.org/advanced/advanced-tutorial](https://redux.js.org/advanced/advanced-tutorial)

### Async Actions

#### Actions

You may use a dedicated status field in your actions:

```js
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }
```

Or you can define separate types for them:

```js
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

#### Synchronous Action Creators

actions.js (Synchronous)

```js
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}
```

They can also press a “refresh” button to update it:

```js
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}
```

When it's time to fetch the posts for some subreddit, we will dispatch a REQUEST_POSTS action:

```js
export const REQUEST_POSTS = 'REQUEST_POSTS';

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}
```

Finally, when the network request comes through, we will dispatch RECEIVE_POSTS:

```js
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now(),
  };
}
```

#### Designing the State Shape

Here's what the state shape for our “Reddit headlines” app might look like:

```js
{
  selectedSubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [
        {
          id: 42,
          title: 'Confusion about Flux and Relay'
        },
        {
          id: 500,
          title: 'Creating a Simple Application Using React JS and Flux Architecture'
        }
      ]
    }
  }
}
```

or

```js
{
  selectedSubreddit: 'frontend',
  entities: {
    users: {
      2: {
        id: 2,
        name: 'Andrew'
      }
    },
    posts: {
      42: {
        id: 42,
        title: 'Confusion about Flux and Relay',
        author: 2
      },
      100: {
        id: 100,
        title: 'Creating a Simple Application Using React JS and Flux Architecture',
        author: 2
      }
    }
  },
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [ 42, 100 ]
    }
  }
}
```

#### Handling Actions

reducers.js

```js
import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from '../actions';

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export default rootReducer;
```

We use ES6 computed property syntax so we can update state[action.subreddit] with Object.assign() in a concise way. This:

```js
return Object.assign({}, state, {
  [action.subreddit]: posts(state[action.subreddit], action),
});
```

is equivalent to this:

```js
let nextState = {};
nextState[action.subreddit] = posts(state[action.subreddit], action);
return Object.assign({}, state, nextState);
```

#### Async Action Creators

```js
import fetch from 'cross-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now(),
  };
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestPosts(subreddit));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(
        (response) => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        (error) => console.log('An error occurred.', error)
      )
      .then((json) =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call.

        dispatch(receivePosts(subreddit, json))
      );
  };
}
```

```js
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPosts } from './actions';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

store.dispatch(selectSubreddit('reactjs'));
store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()));
```

```js
import fetch from 'cross-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now(),
  };
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function fetchPosts(subreddit) {
  return (dispatch) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((json) => dispatch(receivePosts(subreddit, json)));
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts(subreddit));
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
```

```js
store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));
```

### Usage with React Router

Configuring Express
If you are serving your index.html from Express:

```js
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
```

Configuring WebpackDevServer
If you are serving your index.html from WebpackDevServer: You can add to your webpack.config.dev.js:

```js
devServer: {
  historyApiFallback: true;
}
```

Connecting React Router with Redux App

First we will need to import <Router /> and <Route /> from React Router. Here's how to do it:

#components/Root.js

```js
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/:filter?" component={App} />
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
```

Navigating with React Router

containers/FilterLink.js

```js
import React from 'react';
import { NavLink } from 'react-router-dom';

const FilterLink = ({ filter, children }) => (
  <NavLink
    exact
    to={filter === 'SHOW_ALL' ? '/' : `/${filter}`}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}
  </NavLink>
);

export default FilterLink;
```

components/Footer.js

```js
import React from 'react';
import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions';

const Footer = () => (
  <p>
    Show: <FilterLink filter={VisibilityFilters.SHOW_ALL}>All</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterLink>
    {', '}
    <FilterLink filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLink>
  </p>
);

export default Footer;
```

Reading From the URL

containers/VisibleTodoList.js

```js
const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(state.todos, ownProps.filter), // previously was getVisibleTodos(state.todos, state.visibilityFilter)
  };
};
```

components/App.js

```js
const App = ({ match: { params } }) => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList filter={params.filter || 'SHOW_ALL'} />
      <Footer />
    </div>
  );
};
```

#### EXAMPLE

Entry Point
index.js

```js
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';

render(<Root />, document.getElementById('root'));
```

Action Creators and Constants
#actions.js

```js
import fetch from 'cross-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit,
  };
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit,
  };
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now(),
  };
}

function fetchPosts(subreddit) {
  return (dispatch) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((json) => dispatch(receivePosts(subreddit, json)));
  };
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
  };
}
```

Reducers
reducers.js

```js
import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
} from './actions';

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
});

export default rootReducer;
```

Store
configureStore.js

```js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
}
```

Container Components
containers/Root.js

```js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    );
  }
}
```

containers/AsyncApp.js

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <Picker
          value={selectedSubreddit}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
        {posts.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Posts posts={posts} />
          </div>
        )}
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { selectedSubreddit, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: posts } = postsBySubreddit[
    selectedSubreddit
  ] || {
    isFetching: true,
    items: [],
  };

  return {
    selectedSubreddit,
    posts,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(AsyncApp);
```

Presentational Components
components/Picker.js

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Picker extends Component {
  render() {
    const { value, onChange, options } = this.props;

    return (
      <span>
        <h1>{value}</h1>
        <select onChange={(e) => onChange(e.target.value)} value={value}>
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    );
  }
}

Picker.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
```

components/Posts.js

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.posts.map((post, i) => (
          <li key={i}>{post.title}</li>
        ))}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
};
```

### Next Steps

#### Perform Asynchronous dispatch

redux-thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. It incorporates the methods dispatch and getState as parameters.

redux-saga
redux-saga is a library that aims to make the execution of application side effects (e.g., asynchronous tasks like data fetching and impure procedures such as accessing the browser cache) manageable and efficient. It's simple to test, as it uses the ES6 feature called generators, making the flow as easy to read as synchronous code.

redux-observable
redux-observable is a middleware for redux that is inspired by redux-thunk. It allows developers to dispatch a function that returns an Observable, Promise or iterable of action(s). When the observable emits an action, or the promise resolves an action, or the iterable gives an action out, that action is then dispatched as usual.

#### Development Purposes / debug

redux-devtools
Redux DevTools is a set of tools for your Redux development workflow.

redux-logger
redux-logger logs all actions that are being dispatched to the store.

---

# MobX

practice -
[https://github.com/dobernike/learn-web/tree/master/practice/JavaScript/React/mobx-example]

## Concepts & Principles

[https://mobx.js.org/intro/concepts.html](https://mobx.js.org/intro/concepts.html)

First, let’s define the core concepts of MobX:

- Observable state. Any value that can be mutated and might serve as source for computed values is state. MobX can make most types of values (primitives, arrays, classes, objects, etc.) and even (potentially cyclic) references observable out of the box.
  Computed values. Any value that can be computed by using a function that purely operates on other observable values.

- Computed values can range from the concatenation of a few strings up to deriving complex object graphs and visualizations. Because computed values are observable themselves, even the rendering of a complete user interface can be derived from the observable state. Computed values might evaluate either lazily or in reaction to state changes.
  Reactions. A reaction is a bit similar to a computed value, but instead of producing a new value it produces a side effect.

- Reactions bridge reactive and imperative programming for things like printing to the console, making network requests, incrementally updating the React component tree to patch the DOM, etc.

- Actions. Actions are the primary means to modify the state. Actions are not a reaction to state changes but take sources of change, like user events or incoming web-socket connections, to modify the observable state.

https://mobx.js.org/assets/action-state-view.png

```js
import { observable, autorun } from 'mobx';

var todoStore = observable({
  /* some observable state */
  todos: [],

  /* a derived value */
  get completedCount() {
    return this.todos.filter((todo) => todo.completed).length;
  },
});

/* a function that observes the state */
autorun(function () {
  console.log(
    'Completed %d of %d items',
    todoStore.completedCount,
    todoStore.todos.length
  );
});

/* ..and some actions that modify the state */
todoStore.todos[0] = {
  title: 'Take a walk',
  completed: false,
};
// -> synchronously prints 'Completed 0 of 1 items'

todoStore.todos[0].completed = true;
// -> synchronously prints 'Completed 1 of 1 items'
```

---

## MobX and the unique symbiosis of predictability and speed

[https://www.youtube.com/watch?v=NBYbBbjZeX4](https://www.youtube.com/watch?v=NBYbBbjZeX4)

can use with functions component like:
const fn = observer(() => {...})

---

## Becoming fully reactive: an in-depth explanation of MobX

[https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254](https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254)

Reacting to state changes is always better then acting on state changes.

when using manual subscriptions, your app will eventually be inconsistent.

A minimal, consistent set of subscriptions can only be achieved if subscriptions are determined at run-time.1

---

## Understanding MobX and when to use it

[https://github.com/mobxjs/mobx/issues/199](https://github.com/mobxjs/mobx/issues/199)

I'm using MobX now because I can write code 3x faster than with Redux, but my codebase still is predictable and testable.

In the end of the day Redux and MobX are just concepts. Choose Redux if you want to have full control over dispatching actions and transforming state. Go with MobX if you prefer to don't manually handle action dispatchments and state transformations.

I think that implemented in the right way, MobX is a natural evolution of Redux, you can trust MobX to manage your state, you just tell what you want, instead teaching MobX how to do it.

I think the main difference between Redux and MobX is that for Redux you need to "teach" how to dispatch actions and transform state, for MobX you just trust that MobX will do a good job, you just tell MobX "do it", and MobX does.

---

## Best Practices for Building JavaScript Applications with React and MobX

[https://www.accelebrate.com/blog/best-practices-for-building-javascript-applications-with-react-and-mobx-part-1-of-3/]

Best Practice #1 – Declaring Variables

```js
// do not use
var a = 2;

// variable is immutable
const b = 2;
b = 3; // throws an error

// variable is mutable
let c = 2;
c = 3; // allowed
```

Best Practice #2 – Immutable Programming with Objects

```js
// mutable operations
const nums = [1, 2, 3, 4];

// array mutated to [ 1, 2, 3, 4, 5 ]
nums.push(5);

// array mutated to [ 1, 2, 3, 4 ]
nums.pop();

// array mutated to [ 1, 2, 9, 4 ]
nums.splice(2, 1, 9);
// immutable operations
const oldNums = [1, 2, 3, 4];

// oldNums: [ 1, 2, 3, 4 ]
// newNums: [ 1, 2, 3, 4, 5 ]
let newNums = oldNums.concat(5);

// oldNums: [ 1, 2, 3, 4 ]
// newNums: [ 2, 3 ]
newNums = oldNums.slice(1, 3);

// immutable operations with spread and rest
const oldNums = [1, 2, 3, 4];

// oldNums: [ 1, 2, 3, 4 ]
// removeItem: 1
// newNums [ 2, 3, 4 ]
const [removeItem, newNums] = oldNums;

// oldNums: [ 1, 2, 3, 4 ]
// newNums [ 1, 2, 3, 4, 5 ]
const newNums = [...oldNums, 5];

// Examples of Object.assign and Object Spreads
const oldPerson = {
  firstName: 'Bob',
  lastName: 'Smith',
};

// oldPerson => { firstName: 'Bob', lastName: 'Smith' }
// newPerson => { firstName: 'Jane', lastName: 'Smith' }
let newPerson = Object.assign({}, oldPerson, { firstName: 'Jane' });

// oldPerson => { firstName: 'Bob', lastName: 'Smith' }
// newPerson => { firstName: 'Jane', lastName: 'Smith' }
newPerson = { ...oldPerson, firstName: 'Jane' };
```

Best Practice #3 – Props and State

```js
const message = 'Hello World';

// pass the message into the component
<ShowMessage message={message} />;

// the ShowMessage component referenced on the previous line
class ShowMessage extends React.Component {
  render() {
    // access the message passed in via props
    return <span>{this.props.message}</span>;
  }
}
```

```js
render() {

  // outputs true to the console
  console.log(Object.isFrozen(this.props);

  // throw an error
  this.props.message = ‘New Message’;

  return <span>{this.props.message}</span>;
}
```

```js
class SimpleForm extends React.Component {
  constructor(props) {
    super(props);

    // initializing the state in the constructor
    this.state = {
      message: '',
    };

    this.onChange.bind = this.onChange.bind(this);
  }

  // … omitted …
}
```

```js
class SimpleForm extends React.Component {
  // … omitted …

  onChange(e) {
    // changing the state with setState
    this.setState({
      message: e.target.value,
    });
  }

  // … omitted …
}
```

```js
class SimpleForm extends React.Component {
  // … omitted …

  render() {
    // the state from SimpleForm is passed as props to the input component
    return <input type="text" value={this.state.message} onChange={this.onChange}>;
  }
}
```

Best Practice #4 – Validating Props

```js
class ShowMessage extends React.Component {
  static propTypes = {
    // message is a string and is required
    message: PropTypes.string.isRequired,
  };

  render() {
    return <span>{this.props.message}</span>;
  }
}
```

```js
static propTypes = {
  // example of a custom string required
  message: (props, propName, componentName) => {
    if (props[propName] == null) {
      return Error(`${propName} is required`);
    }
    if (typeof props[propName] !== 'string') {
      return Error(`${propName} should be a string`);
    }
  }
}
```

Best Practice #5 – Structuring a Component Tree

```js
shouldComponentUpdate(nextProps, nextState) {

  // build a set of all property names on the existing props and next props
  const propsPropertyNames = new Set(Object.keys(this.props), Object.keys(nextProps))

  // iterate over the whole set of props
  for (let propName of propsPropertyNames) {

    // if any of them are not the same, then return true and update
    // observe only object references would be compares for props which
    // which point to objects
    if (this.props[propName] !== nextProps[propName]) {
      return true;
    }

  }

  // repeat the same process for state
  const statePropertyNames = new Set(Object.keys(this.state), Object.keys(nextState))

  for (let propName of Object.keys(statePropertyNames)) {

    if (this.state[propName] !== nextState[propName]) {
      return true;
    }

  }

  // no changes do not re-render
  return false;

}
```

Best Practice #6 – Application State vs. Component State

https://cdn.accelebrate.com/images/blog/best-practices-for-building-javascript-applications-with-react-and-mobx-part-3-of-3/ui-components.png

Best Practice #7 – Computed Properties

```js
export class CarStore {
  @observable
  cars = [];

  @observable
  sortFieldName = 'id';

  @observable filterFieldName = '';
  @observable filterFieldValue = '';

  // computed properties observe the properties above through
  // property accessor tracking

  @computed
  get filteredCars() {
    if (this.filterFieldName === '') {
      return this.cars;
    }
    return this.cars.filter((car) =>
      String(car[this.filterFieldName]).includes(String(this.filterFieldValue))
    );
  }

  @computed
  get sortedCars() {
    return this.filteredCars.sort(
      (a, b) => a[this.sortFieldName] > b[this.sortFieldName]
    );
  }

  // … omitted …
}
```
