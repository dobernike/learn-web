import React, { Component } from 'react';

import Header from '../header';
import ErrorBoundry from "../error-boundry";

import './app.css';
import Row from '../row';
import ItemDetails, { Record } from '../item-details';
import SwapiService from '../../services/swapi-service';

export default class App extends Component {

  swapiServise = new SwapiService();

  state = {
    showRandomPlanet: true
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };

  render() {

    // const planet = this.state.showRandomPlanet ?
    //   <RandomPlanet /> :
    //   null;

    const { getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage } = this.swapiServise;

    const personDetails = (
      <ItemDetails
        itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>

        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />

      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>

        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="costInCredits" label="Cost" />

      </ItemDetails>
    );

    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />

          <Row
            left={personDetails}
            right={starshipDetails} />

        </div>
      </ErrorBoundry>
    );
  }
}
