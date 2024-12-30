import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomLink from '../UI/CustomLink/CustomLink';
import Text from '../UI/Typography/Text/Text';
import ResultPageCart from './ResultPageCart/ResultPageCart';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import fetchResult from '../../store/actions/fetchResult';
import getApartmentId from '../../utils/getApartmentId';
import { RootState } from '../../store/reducers/rootReducer';

const styles = require('./SearchResultsPage.css');

type Props = {
    location: { search: string };
};

function SearchResultsPage(props: Props) {
    const apartmentsList = useSelector((state: RootState) => state.apartmentsList.apartmentsList);
    const dispatch = useDispatch();
    const city = props.location.search.replace('?', '');
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!apartmentsList.length) {
            loadItems();
        } else {
            setCurrentPage(Math.floor(apartmentsList.length / 20) + 1);
        }
    }, []);

    const loadItems = useCallback(async () => {
        return dispatch(fetchResult(city, currentPage))
            .then(updateState)
            .catch((err: string) => setErrorMessage(err));
    }, [city, currentPage]);

    const updateState = (response: { total_results: number; page: number; total_pages: number }) => {
        const { total_results: totalResults, page, total_pages: totalPages } = response;

        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        setHasMore(page < totalPages);
        setTotalPages(totalResults);
    };

    if (errorMessage) {
        return <div>{errorMessage.toString()}</div>;
    }

    if (!apartmentsList.length) {
        return <div>loading...</div>;
    }

    return (
        <>
            <div className={styles.wrapper}>
                <CustomLink href="/">Back</CustomLink>
                <div className={styles.text}>
                    <Text bold center>
                        {apartmentsList.length} of {totalPages === 0 ? apartmentsList.length : totalPages} matches
                    </Text>
                </div>
            </div>

            <InfiniteScroll loadMore={loadItems} hasMore={hasMore}>
                <ul>
                    {apartmentsList.map((apartment) => (
                        <ResultPageCart
                            key={apartment.lister_url}
                            city={city}
                            id={getApartmentId(apartment)}
                            img={apartment.thumb_url}
                            price={apartment.price_formatted}
                            bedroom={+apartment.bedroom_number}
                            title={apartment.title}
                        />
                    ))}
                </ul>
            </InfiniteScroll>
        </>
    );
}

export default SearchResultsPage;
