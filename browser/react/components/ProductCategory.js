import React from 'react';
import { connect } from 'react-redux';

const ProductCategory = () => (
  <div className="well">
    <h3>ProductCategory</h3>
    

  </div>
);

const mapStateToProps = state => ({
  // This should be broken up later
  state
});

export default connect(mapStateToProps)(ProductCategory);

