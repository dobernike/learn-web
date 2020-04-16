import React from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CategoryPage from '../category/category.component';

const ShopPage = ({ match }) => (
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionOverview} />
    <Route path={`${match.path}/:categoryId`} component={CategoryPage} />
  </div>
);

export default ShopPage;
