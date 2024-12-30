import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

const styles = require('./CustomLink.css');

type Props = {
    href?: string;
    children: ReactNode;
};

const CustomLink = React.memo(({ href, children }: Props) => {
    return (
        <Link to={href} className={styles.link}>
            {children}
        </Link>
    );
});

export default CustomLink;
