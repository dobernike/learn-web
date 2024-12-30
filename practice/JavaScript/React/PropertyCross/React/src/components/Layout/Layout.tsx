import React, { ReactChild } from 'react';

const styles = require('./Layout.css');

function Layout({ children }: { children: ReactChild }) {
    return <main className={styles.container}>{children}</main>;
}

export default Layout;
