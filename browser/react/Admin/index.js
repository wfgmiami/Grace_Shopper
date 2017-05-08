import React from 'react';

import Nav from './Nav';

const Admin = ({ children }) => (
  <div className="container-fluid">
    <h1>Admin</h1>
    <Nav />
    { children }
  </div>
);

export default Admin;
