import React, { PureComponent } from 'react';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';

import store from '../../store/store';
import Title from './styled';
import Another from '../Another/Another';

class App extends PureComponent {
  render() {
    return (
      <>
        <Normalize />
        <Provider store={store}>
          <Title>Hello World!</Title>
          <Another name="Paul" />
        </Provider>
      </>
    );
  }
}

export default App;
