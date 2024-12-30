import React, { ReactNode } from 'react';
import cx from 'classnames';

const styles = require('./Text.css');

type Props = {
    bold?: boolean;
    center?: boolean;
    fontSizeMiddle?: boolean;
    children: ReactNode;
};

const Text = React.memo(({ bold, center, fontSizeMiddle, children }: Props) => {
    return (
        <p
            className={cx(styles.text, {
                [styles.bold]: bold,
                [styles.center]: center,
                [styles.fontSizeMiddle]: fontSizeMiddle,
            })}
        >
            {children}
        </p>
    );
});

export default Text;
