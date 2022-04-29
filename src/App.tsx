import { NotFound } from 'components/Common';
import { LoginPage } from 'features/auth/pages';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
