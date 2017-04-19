import React from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import { store } from './redux/store';
import {
  Router,
  Route,
  IndexRoute,
  hashHistory
} from 'react-router';
import Main from './react/Main';

const app = (
  <Provider store={ store }>
    <Router history={ hashHistory }>
      <Route path="/">
        <IndexRoute component={ Main } />
      </Route>
    </Router>
  </Provider>
);

render(app, document.getElementById('app'));
