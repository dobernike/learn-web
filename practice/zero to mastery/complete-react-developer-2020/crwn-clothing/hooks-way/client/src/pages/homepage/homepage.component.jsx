import React from 'react';

import Directory from '../../components/directory/directory.component';

import { HomePageContainer } from './homepage.styles';

const HomePage = () => (
  <HomePageContainer>
    {/* <React.Profiler
      id="Directory"
      onRender={(id, phase, actualDuration) => {
        console.log({
          id,
          phase,
          actualDuration,
        });
      }}
    > */}
    <Directory />
    {/* </React.Profiler> */}
  </HomePageContainer>
);

export default HomePage;
