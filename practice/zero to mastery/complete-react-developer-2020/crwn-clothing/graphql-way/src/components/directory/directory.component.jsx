import React from 'react';

import DIRECTORY_DATA from './directory.data';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';

const Directory = () => (
  <div className="directory-menu">
    {DIRECTORY_DATA.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

export default Directory;
