import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App, { Home } from './ui/App.js';
import TodoList from './ui/Todos.js';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="todo" component={TodoList} />
    </Route>
  </Router>
);
