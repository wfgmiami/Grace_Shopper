import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

import {
  IndexRoute,
  Router,
  Route,
  browserHistory
} from 'react-router';

import { loadProducts } from './redux/reducers/products';
import { loadCategories } from './redux/reducers/categories';
import { getCart } from './redux/reducers/cart';
import { me } from './redux/reducers/auth';

import Main from './react/Main';
import CategoryList from './react/CategoryList';
import SignUp from './react/SignUp';

const init = () => {
  store.dispatch( loadProducts( 1 ) );
  store.dispatch( loadCategories() );
  store.dispatch( me() );
  store.dispatch( getCart() );
};

const app = (
  <Provider store = { store } >
    <Router history = { browserHistory }>
      <Route path="/" component={ Main } onEnter={ init }>
        <IndexRoute component={ CategoryList } />
        {/*<Route path="login" component={ LoginPage } />*/}
      </Route>
      <Route path="/signup" component={ SignUp } />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));

