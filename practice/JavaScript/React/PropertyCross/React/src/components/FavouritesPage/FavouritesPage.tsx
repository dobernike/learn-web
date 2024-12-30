import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../UI/Button/Button';
import Title from '../UI/Typography/Title/Title';
import Text from '../UI/Typography/Text/Text';
import ResultPageCart from '../SearchResultsPage/ResultPageCart/ResultPageCart';
import getFavourite from '../../store/actions/getFavourite';
import getApartmentId from '../../utils/getApartmentId';

const styles = require('./FavouritesPage.css');

type Props = {
    history: { goBack: () => void };
};

function FavouritesPage(props: Props) {
    const dispatch = useDispatch();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        dispatch(getFavourite('favorites')).then((favorites: []) => setFavorites(favorites));
    }, []);

    return (
        <>
            <div className={styles.wrapper}>
                <Button onClick={props.history.goBack}>Back</Button>
                <Title>Favourites</Title>
            </div>

            {favorites.length ? (
                <ul>
                    {favorites.map((favorite) => (
                        <ResultPageCart
                            key={favorite.lister_url}
                            city={favorite.city}
                            id={getApartmentId(favorite)}
                            img={favorite.thumb_url}
                            price={favorite.price_formatted}
                            bedroom={+favorite.bedroom_number}
                            title={favorite.title}
                        />
                    ))}
                </ul>
            ) : (
                <div className={styles.text}>
                    <Text center>You have not added any properties to your favourites</Text>
                </div>
            )}
        </>
    );
}

export default FavouritesPage;
