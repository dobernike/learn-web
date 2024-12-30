import React from 'react';
import Text from '../../UI/Typography/Text/Text';

const ErrorIndicator = ({ errorMessage }: { errorMessage: string }) => <Text>{errorMessage}</Text>;

export default ErrorIndicator;
