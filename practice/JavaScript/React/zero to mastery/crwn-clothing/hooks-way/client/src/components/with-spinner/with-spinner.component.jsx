import React from 'react';

import Spinnner from '../spinner/spinner.component';

const WithSpinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinnner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
