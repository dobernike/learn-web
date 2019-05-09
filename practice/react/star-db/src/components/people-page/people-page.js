import React, { Component } from 'react';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator';

import './people-page.css';
import SwapiService from '../../services/swapi-service';

const Row = ({ left, right }) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    );
};

class ErrorBoundry extends Component {

    state = {
        hasError: false
    };

    componentDidCatch() {

        this.setState({
            hasError: true
        });
    }


    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return this.props.children;
    }
}

export default class PeoplePage extends Component {

    swapiSevice = new SwapiService();

    state = {
        selectedPerson: 3
    };


    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiSevice.getAllPeople}>

                {(i) => (
                    `${i.name} (${i.birthYear})`
                )}

            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <PersonDetails personId={this.state.selectedPerson} />
            </ErrorBoundry>
        );

        return (

            <Row left={itemList} right={personDetails} />

        );

    }
}
