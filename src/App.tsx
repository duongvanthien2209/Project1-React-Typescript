import { NotFound } from 'components/Common';
import { Default } from 'components/Layout';
import { LoginPage, RegisterPage } from 'features/auth/pages';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Default>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/register">
          <RegisterPage />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Default>
  );
}

export default App;
