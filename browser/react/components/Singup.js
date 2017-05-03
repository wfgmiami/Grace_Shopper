import React from 'react';
import { connect } from 'react-redux';

const Signup = () => (
  <div className="well">
  
    <h3>Signup</h3>
    

  </div>
);

const mapStateToProps = state => ({
  // This should be broken up later
  state
});

export default connect(mapStateToProps)(Signup);

