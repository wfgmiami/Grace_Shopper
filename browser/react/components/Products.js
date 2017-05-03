import React from 'react';
import { connect } from 'react-redux';

const Products = () => (
  <div className="well">
    <h3>Products</h3>
    

  </div>
);

const mapStateToProps = state => ({
  // This should be broken up later
  state
});

export default connect(mapStateToProps)(Products);

