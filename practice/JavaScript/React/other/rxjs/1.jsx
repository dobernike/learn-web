import React from "react";

const App = ({ query, onChangeQuery }) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
  </div>
);

export default App;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };
  }

  onChangeQuery = query => {
    this.setState({ query });
  };

  render() {
    return (
      <div>
        <h1>React with RxJS</h1>

        <input
          type="text"
          value={this.state.query}
          onChange={event => this.onChangeQuery(event.target.value)}
        />

        <p>{`http://hn.algolia.com/api/v1/search?query=${this.state.query}`}</p>
      </div>
    );
  }
}

export default App;

import React from "react";

const withObservableStream = (...) => Component => {
  return class extends React.Component {
    componentDidMount() {}

    componentWillUnmount() {}

    render() {
      return (
        <Component {...this.props} {...this.state} />
      )
    }
  }
}

const App = ({ query, onChangeQuery }) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
  </div>
);

export default withObservableStream(...)(App);

import React from 'react'
import { BegaviorSubject } from 'rxjs';

// ...

const App = ({ query, onChangeQuery}) => (
  <div>
    <h1>React with RxJS</h1>

    <input type="text" value={query} onChange={event => onChangeQuery(event.target.value)} />

    <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
  </div>
);

const query$ = new BegaviorSubject({ query: 'react'});

export default withObservableStream(
  query$,
  {
    onChanheQuery: value => query$.next({ query: value })
  }
)(App);


const withObservableStream = (observable, triggers) => Component => {
  return class extends React.Component {
    componentDidMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState }),
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} {...triggers} />
      );
    }
  };
};

const App = ({ query = '', onChangeQuery }) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <p>{`http://hn.algolia.com/api/v1/search?query=${query}`}</p>
  </div>
);

const withObservableStream = (
  observable,
  triggers,
  initialState,
) => Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...initialState,
      };
    }

    componentDidMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState }),
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} {...triggers} />
      );
    }
  };
};

const App = ({ query, onChangeQuery }) => (
  ...
);

export default withObservableStream(
  query$,
  {
    onChangeQuery: value => query$.next({ query: value }),
  },
  {
    query: '',
  }
)(App);

const SUBJECT = {
  POPULARITY: 'search',
  DATE: 'search_by_date',
};

const App = ({
  query = '',
  subject,
  onChangeQuery,
  onSelectSubject,
}) => (
  <div>
    <h1>React with RxJS</h1>

    <input
      type="text"
      value={query}
      onChange={event => onChangeQuery(event.target.value)}
    />

    <div>
      {Object.values(SUBJECT).map(value => (
        <button
          key={value}
          onClick={() => onSelectSubject(value)}
          type="button"
        >
          {value}
        </button>
      ))}
    </div>

    <p>{`http://hn.algolia.com/api/v1/${subject}?query=${query}`}</p>
  </div>
);

import React from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs/index';

...

const query$ = new BehaviorSubject({ query: 'react' });
const subject$ = new BehaviorSubject(SUBJECT.POPULARITY);

export default withObservableStream(
  combineLatest(subject$, query$, (subject, query) => ({
    subject,
    query,
  })),
  {
    onChangeQuery: value => query$.next({ query: value }),
    onSelectSubject: subject => subject$.next(subject),
  },
)(App);


const query$ = new BehaviorSubject('react');
const subject$ = new BehaviorSubject(SUBJECT.POPULARITY);

export default withObservableStream(
  combineLatest(subject$, query$, (subject, query) => ({
    subject,
    query,
  })),
  {
    onChangeQuery: value => query$.next(value),
    onSelectSubject: subject => subject$.next(subject),
  },
)(App);

...

const App = ({
  query = '',
  subject,
  stories = [],
  onChangeQuery,
  onSelectSubject,
}) => (
  <div>
    ...

    <p>{`http://hn.algolia.com/api/v1/${subject}?query=${query}`}</p>

    <ul>
      {stories.map(story => (
        <li key={story.objectID}>
          <a href={story.url || story.story_url}>
            {story.title || story.story_title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

import React from 'react';
import axios from 'axios';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

...

const query$ = new BehaviorSubject('react');
const subject$ = new BehaviorSubject(SUBJECT.POPULARITY);

const fetch$ = combineLatest(subject$, query$).pipe(
  flatMap(([subject, query]) =>
    axios(`http://hn.algolia.com/api/v1/${subject}?query=${query}`),
  ),
  map(result => result.data.hits),
);

...

export default withObservableStream(
  combineLatest(
    subject$,
    query$,
    fetch$,
    (subject, query, stories) => ({
      subject,
      query,
      stories,
    }),
  ),
  {
    onChangeQuery: value => query$.next(value),
    onSelectSubject: subject => subject$.next(subject),
  },
)(App);

import React from 'react';
import axios from 'axios';
import { BehaviorSubject, combineLatest, timer } from 'rxjs';
import { flatMap, map, debounce, filter } from 'rxjs/operators';

...

const queryForFetch$ = query$.pipe(
  debounce(() => timer(1000)),
  filter(query => query !== ''),
);

const fetch$ = combineLatest(subject$, queryForFetch$).pipe(
  flatMap(([subject, query]) =>
    axios(`http://hn.algolia.com/api/v1/${subject}?query=${query}`),
  ),
  map(result => result.data.hits),
);

...

const query$ = new BehaviorSubject('react');
const subject$ = new BehaviorSubject(SUBJECT.POPULARITY);

const withObservableStream = (
  observable,
  triggers,
  initialState,
) => Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        ...initialState,
      };
    }

    componentDidMount() {
      this.subscription = observable.subscribe(newState =>
        this.setState({ ...newState }),
      );
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    render() {
      return (
        <Component {...this.props} {...this.state} {...triggers} />
      );
    }
  };
};

...

const App = ({
  query,
  subject,
  stories,
  onChangeQuery,
  onSelectSubject,
}) => (
  ...
);

export default withObservableStream(
  combineLatest(
    subject$,
    query$,
    fetch$,
    (subject, query, stories) => ({
      subject,
      query,
      stories,
    }),
  ),
  {
    onSelectSubject: subject => subject$.next(subject),
    onChangeQuery: value => query$.next(value),
  },
  {
    query: 'react',
    subject: SUBJECT.POPULARITY,
    stories: [],
  },
)(App);
