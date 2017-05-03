import React from 'react';
import { connect } from 'react-redux';

const Cart = () => (
  <div className="well">
    <h3>Cart</h3>
    

  </div>
);

const mapStateToProps = state => ({
  // This should be broken up later
  state
});

export default connect(mapStateToProps)(Cart);

