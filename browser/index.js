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
import { getUsers } from './redux/reducers/admin/users';
import { getOrders } from './redux/reducers/admin/orders';

import Main from './react/Main';
import Nav from './react/Nav';
import CategoryList from './react/CategoryList';
import ProductDetail from './react/ProductDetail';
import SignUp from './react/SignUp';
import Admin from './react/Admin';
import Users from './react/Admin/Users';
import AdminOrders from './react/Admin/Orders';
import Checkout from './react/Checkout'

const init = () => {
  store.dispatch( loadProducts( 1 ) );
  store.dispatch( loadCategories() );
  store.dispatch( me() );
  store.dispatch( getCart() );
};

const admin = () => {
  store.dispatch(getUsers());
  store.dispatch(getOrders());
};

const app = (
  <Provider store = { store } >
    <Router history = { browserHistory }>

      <Route path="/" component={ Main } onEnter={ init }>
        <IndexRoute component={ CategoryList } />
        <Route path="/detail/:productId" components={ProductDetail} />
        <Route path="/checkout" component={ Checkout } />
      </Route>
      
        <Route path="/signup" component={ SignUp } />
        
      
      <Route path="/admin" component={ Admin } onEnter={ admin }>
        <Route path="users" component={ Users } />
        <Route path="orders" component={ AdminOrders } />
        
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));

