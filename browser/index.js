import React from 'react';
import ReactDOM from 'react-dom';

import {
  IndexRoute,
  Router,
  Route,
  browserHistory
} from 'react-router';

import store from './redux/store';
import Home from './react/Home';
import { Provider } from 'react-redux';

import Main from './react/Main';
import CategoryList from './react/CategoryList';

const app = (
  <Provider store = { store } >
    <Router history = { browserHistory }>
      <Route path='/' component={ Main }>
        <IndexRoute component={ Home } />
        <Route path='/eyeglasses' component={ CategoryList } />
        <Route path='/sunglasses' component={ CategoryList } />
        {/*<Route path='login' component={ LoginPage } />*/}
        </Route>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));

