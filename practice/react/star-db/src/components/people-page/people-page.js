import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

import './people-page.css';
import SwapiService from '../../services/swapi-service';

export default class PeoplePage extends Component {

    swapiSevice = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
    };

    componentDidCatch(error, info) {
        // debugger;

        this.setState({
            hasError: true
        });
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList
                        onItemSelected={this.onPersonSelected}
                        getData={this.swapiSevice.getAllPeople}
                        renderItem={({ name, gender, birthYear }) => `${name} (${gender}, ${birthYear})`} />
                </div>
                <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div>
        );
    }
}
