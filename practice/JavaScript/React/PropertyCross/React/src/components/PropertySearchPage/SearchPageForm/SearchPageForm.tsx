import React, { ChangeEvent, FormEvent, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import SearchPageSearchedList from '../SearchPageSearchedList/SearchPageSearchedList';
import fetchSearch from '../../../store/actions/fetchSearch';
import fetchCoords from '../../../store/actions/fetchCoords';
import ErrorIndicator from '../../Error/ErrorIndicator/ErrorIndicator';

const styles = require('./SearchPageForm.css');

function SearchPageForm() {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const [isRedirect, setIsRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        return setValue(value);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (value === '') {
            return false;
        }

        return dispatch(fetchSearch(value))
            .then(() => setIsRedirect(true))
            .catch((err: Error) => setErrorMessage(err.toString()));
    };

    const handleClick = useCallback(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            return fetchCoords(`${position.coords.latitude},${position.coords.longitude}`)
                .then((city) => dispatch(fetchSearch(city)))
                .catch(() => {
                    setValue('London');
                    dispatch(fetchSearch('London'));
                })
                .then(() => setIsRedirect(true));
        });
    }, []);

    if (isRedirect) {
        return <Redirect to={`/result?${value}`} />;
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input onChange={handleChange} value={value} placeholder="newcastle" />
            <div className={styles.searchWrapper}>
                <div className={styles.submitButton}>
                    <Button type="submit">Go</Button>
                </div>
                <Button type="button" onClick={handleClick}>
                    My location
                </Button>
            </div>
            {errorMessage === '' ? <SearchPageSearchedList /> : <ErrorIndicator errorMessage={errorMessage} />}
        </form>
    );
}

export default SearchPageForm;
