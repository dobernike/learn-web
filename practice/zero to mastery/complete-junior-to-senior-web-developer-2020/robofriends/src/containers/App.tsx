import * as React from 'react';
import { connect } from 'react-redux';
import { IRobot } from '../reducers';

import './App.css';

import { setSearchField, requestRobots } from '../actions';
import MainPage from '../components/MainPage';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event: React.SyntheticEvent<HTMLInputElement>) =>
      dispatch(setSearchField(event.currentTarget.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

export interface IAppProps {
  isPending: boolean;
  searchField: string;
  robots: IRobot[];
  onRequestRobots: () => void;
  onSearchChange(event: React.SyntheticEvent<HTMLInputElement>): void;
  error: string;
}

class App extends React.Component<IAppProps> {
  render() {
    return <MainPage {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
