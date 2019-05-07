import React from 'react';

import './spinner.css';

const Spinner = () => {
    return (
        <div class="lds-css ng-scope">
            <div class="lds-double-ring">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;