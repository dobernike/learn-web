import React, { ReactNode } from 'react';
const styles = require('./Title.css');

type Props = {
    children: ReactNode;
};

const Title = React.memo(({ children }: Props) => {
    return <h1 className={styles.title}>{children}</h1>;
});

export default Title;
