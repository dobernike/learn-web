import React, { useEffect, ReactChild } from 'react';
import throttle from '../../utils/throttle';

type Props = {
    hasMore: boolean;
    loadMore: Function;
    children: ReactChild;
};

const InfiniteScroll = React.memo((props: Props) => {
    useEffect(() => {
        const handleScroll = throttle(() => {
            const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
            const { body } = document;
            const html = document.documentElement;
            const docHeight = Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight
            );
            const windowBottom = Math.ceil(windowHeight + window.pageYOffset);

            if (windowBottom >= docHeight && props.hasMore) {
                props.loadMore();
            }
        }, 500);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [props.loadMore]);

    return <>{props.children}</>;
});

export default InfiniteScroll;
