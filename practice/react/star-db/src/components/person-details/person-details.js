import React, { Component } from 'react';

import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true
  };

  componentDidMount() {
    this.updatePerson();
  }
  personId
  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({
        loading: true
      });
      this.updatePerson();
    }
  }

  onPersonLoaded = (person) => {
    this.setState({
      person,
      loading: false,
      error: false
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService.getPerson(personId).then(this.onPersonLoaded).catch(this.onError)
  }

  render() {
    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }

    const { person, loading, error } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const loader = loading ? <Spinner /> : null;
    const content = hasData ? <PersonView person={person} /> : null;

    return (
      <div className="person-details card">
        {errorMessage}
        {loader}
        {content}
      </div>
    )
  }
}

const PersonView = ({ person }) => {

  const { id, name, gender, birthYear, eyeColor } = person;

  return (
    <React.Fragment>
      <img className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt={name} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}