import React from 'react';
import { Link } from 'react-router-dom';

import { Apartment } from '../../../store/reducers/apartmentsListReducer';
import Text from '../../UI/Typography/Text/Text';

const styles = require('./ResultPageCart.css');

const SearchResultsPage = React.memo(({ id, city, img, price, bedroom, title }: Apartment) => {
    return (
        <li>
            <Link to={`/listing?${city}#${id}`} className={styles.link}>
                <div className={styles.cart}>
                    <img src={img} className={styles.image} alt="apartment" />
                    <div className={styles.wrapper}>
                        <div className={styles.price}>
                            <Text fontSizeMiddle>{price}</Text>
                        </div>

                        <Text>Bedrooms: {bedroom}</Text>
                        <Text>{title}</Text>
                    </div>
                </div>
            </Link>
        </li>
    );
});

export default SearchResultsPage;
