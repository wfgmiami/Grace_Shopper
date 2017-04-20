import React from 'react';
import { connect } from 'react-redux';

const Home = () => (
  <div className="well">
    <h3>Home</h3>
  </div>
);

const mapStateToProps = state => ({
  // This should be broken up later
  state
});

export default connect(mapStateToProps)(Home);

