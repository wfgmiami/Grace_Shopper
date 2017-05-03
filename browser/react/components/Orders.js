import React from 'react';
import { connect } from 'react-redux';

const Orders = () => (
  <div className="well">
    <h3>Orders</h3>
    

  </div>
);

const mapStateToProps = state => ({
  // This should be broken up later
  state
});

export default connect(mapStateToProps)(Orders);

