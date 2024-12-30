import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Text from '../../UI/Typography/Text/Text';
import SearchPageItem from '../SearchPageItem/SearchPageItem';
import { SEARCH_STORAGE } from '../../../store/constants/constants';
import searchedListLoad from '../../../store/actions/searchedListLoad';
import { RootState } from '../../../store/reducers/rootReducer';

const styles = require('./SearchPageSearchedList.css');

function SearchPageSearchedList() {
    const searchedList = useSelector((state: RootState) => state.searchedList.searchedList);
    const dispatch = useDispatch();
    const [redirectValue, setRedirectValue] = useState('');

    useEffect(() => {
        dispatch(searchedListLoad(SEARCH_STORAGE));
    }, []);

    const handleRedirect = useCallback((redirectValue: string) => {
        setRedirectValue(redirectValue);
    }, []);

    if (redirectValue !== '') {
        return <Redirect to={`/result?${redirectValue}`} />;
    }

    return (
        <>
            <div className={styles.info}>
                <Text>Recent searches:</Text>
            </div>
            <ul className={styles.list}>
                {searchedList.length > 0 ? (
                    searchedList.map((item) => <SearchPageItem key={item} item={item} onClick={handleRedirect} />)
                ) : (
                    <p>Ваша история поиска чиста</p>
                )}
            </ul>
        </>
    );
}

export default SearchPageSearchedList;
