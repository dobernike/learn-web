import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="http://localhost:3000/">
          Star DB
        </a>
      </h3>
      <ul className="d-flex">
        <li>
          <a href="http://localhost:3000/">People</a>
        </li>
        <li>
          <a href="http://localhost:3000/">Planets</a>
        </li>
        <li>
          <a href="http://localhost:3000/">Starships</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;