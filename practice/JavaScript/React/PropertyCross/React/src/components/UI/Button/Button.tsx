import React, { ReactNode } from 'react';

const styles = require('./Button.css');

type Props = {
    type?: 'button' | 'submit' | 'reset';
    children: ReactNode;
    onClick?: () => void;
};

const Button = React.memo(({ type = 'button', onClick, children }: Props) => {
    return (
        <button className={styles.button} type={type} onClick={onClick}>
            {children}
        </button>
    );
});

export default Button;
