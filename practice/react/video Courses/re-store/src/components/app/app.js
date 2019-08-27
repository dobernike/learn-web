import React from 'react';
import './app.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { HomePage, CartPage } from '../pages';
import ShopHeader from '../shop-header';

const App = () => {
  return (
    <main role="main" className="container">
      <ShopHeader numItems={5} total={210} />
      {/* Отрисовывает максимум один Route */}
      <Switch>
        {/* Route - конфигурирует адрес "/" */}
        <Route path="/" component={HomePage} exact />
        {/* Route - конфигурирует адрес "/cart" */}
        < Route path="/cart" component={CartPage} />
        {/* Redirect Переадресовывает с несуществующего адреса на адрес "/" */}
        <Redirect to="/" exact />
      </Switch>
    </main>
  )
};

export default App;


