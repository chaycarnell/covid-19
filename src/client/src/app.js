import React from 'react';
import NavBar from './components/navbar';
import { Dashboard } from './pages/pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Render = () => {
  return (
    <Router>
      <NavBar history />
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        {/* <Route path="/drawdown">
          <Drawdown />
        </Route> */}
      </Switch>
    </Router>
  );
};

export default Render;
