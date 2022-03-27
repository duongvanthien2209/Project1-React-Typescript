import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Switch } from 'react-router-dom';

function Example() {
  return <div>Example</div>;
}

function NotFound() {
  return <div>Not Found</div>;
}

function App() {
  return (
    <Switch>
      <Route path="/">
        <Example />
      </Route>

      {/* <Route>
        <NotFound />
      </Route> */}
    </Switch>
  );
}

export default App;
