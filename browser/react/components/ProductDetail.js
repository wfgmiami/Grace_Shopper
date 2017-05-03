import React from 'react';
import { connect } from 'react-redux';

const ProductDetail = () => (
  <div className="well">
    <h3>ProductDetail</h3>
    

  </div>
);

const mapStateToProps = state => ({
  // This should be broken up later
  state
});

export default connect(mapStateToProps)(ProductDetail);

