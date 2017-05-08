import React from 'react';
import { Link } from 'react-router';

const Nav = () => (
  <ul className="nav nav-tabs" style={{marginBottom: '15px'}}>
    <li>
      <Link to="/">Grace Shopper</Link>
    </li>
    <li>
      <Link to="/admin/orders">Orders</Link>
    </li>
    <li>
      <Link to="/admin/users">Users</Link>
    </li>
  </ul>
);

export default Nav;
