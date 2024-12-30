import React from 'react';

import CustomLink from '../UI/CustomLink/CustomLink';
import Text from '../UI/Typography/Text/Text';
import Title from '../UI/Typography/Title/Title';
import SearchPageForm from './SearchPageForm/SearchPageForm';

const styles = require('./PropertySearchPage.css');

const PropertySearchPage = React.memo(() => {
    return (
        <>
            <div className={styles.wrapper}>
                <Title>PropertyCross</Title>
                <CustomLink href="/favourites">Faves</CustomLink>
            </div>
            <div className={styles.info}>
                <Text>
                    Use the form below to search for houses to buy. You can search by place-name, postcode, or click
                    &rsquo;My location&rsquo;, to search in your current location
                </Text>
            </div>
            <SearchPageForm />
        </>
    );
});

export default PropertySearchPage;
