import { NotFound } from 'components/Common';
import { Default } from 'components/Layout';
import { LoginPage, RegisterPage } from 'features/auth/pages';
import { CartPage } from 'features/cart/pages';
import { HomePage } from 'features/filter/pages';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Default>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/register">
          <RegisterPage />
        </Route>

        <Route exact path="/cart">
          <CartPage />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Default>
  );
}

export default App;
