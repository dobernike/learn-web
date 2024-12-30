import React, { ChangeEvent } from 'react';

const styles = require('./Input.css');

type Props = {
    onChange?: React.EventHandler<ChangeEvent>;
    type?: string;
    placeholder?: string;
    value: string;
};

const Input = React.memo(({ onChange, value, type = 'text', placeholder }: Props) => {
    return <input className={styles.search} onChange={onChange} value={value} type={type} placeholder={placeholder} />;
});

export default Input;
