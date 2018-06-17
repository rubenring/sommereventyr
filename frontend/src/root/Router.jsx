import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

export const AppRouter = (props) => {
  return (
    <Router>
      <Switch>

        <Route {...props} component={NotFoundPage} />
      </Switch>
    </Router>
  )
};