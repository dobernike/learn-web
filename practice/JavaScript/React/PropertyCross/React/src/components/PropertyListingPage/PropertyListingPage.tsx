import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import isApartmentInStorage from '../../store/actions/isApartmentInStorage';
import Title from '../UI/Typography/Title/Title';
import Button from '../UI/Button/Button';
import getApartment from '../../store/actions/getApartment';
import ListingPageApartment from './ListingPageApartment/ListingPageApartment';
import toggleFavorite from '../../store/actions/toggleFavorite';
import ErrorIndicator from '../Error/ErrorIndicator/ErrorIndicator';
import { RootState } from '../../store/reducers/rootReducer';

const styles = require('./PropertyListingPage.css');

type Props = {
    location: { search: string; hash: string };
    history: { goBack: () => void };
};

function PropertyListingPage(props: Props) {
    const apartmentsList = useSelector((state: RootState) => state.apartmentsList.apartmentsList);
    const city = props.location.search.replace('?', '');
    const apartmentId = props.location.hash.replace('#', '');
    const [apartment, setApartment] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getApartment({
            apartments: apartmentsList,
            apartmentId,
            city,
            numberPageLoad: 1,
        })
            .then((apartment) => {
                setApartment(apartment);
                setIsFavorite(isApartmentInStorage('favorites', apartment, city));
            })
            .catch((err) => setErrorMessage(err));
    }, []);

    const handleClick = useCallback(() => {
        setIsFavorite(toggleFavorite(apartment, city));
    }, [toggleFavorite, apartment, city]);

    if (errorMessage) {
        return <ErrorIndicator errorMessage={errorMessage.toString()} />;
    }

    if (!apartment) {
        return <div>loading...</div>;
    }

    const {
        price_formatted: price,
        title,
        img_url: img,
        bedroom_number: bedroom,
        bathroom_number: bathroom,
        summary,
    } = apartment;

    return (
        <>
            <div className={styles.wrapper}>
                <Button onClick={props.history.goBack}>Back</Button>
                <Title>Property Details</Title>
                <Button onClick={handleClick}>{isFavorite ? '-' : '+'}</Button>
            </div>
            <ListingPageApartment
                price={price}
                title={title}
                img={img}
                bedroom={+bedroom}
                bathroom={+bathroom}
                summary={summary}
            />
        </>
    );
}

export default PropertyListingPage;
