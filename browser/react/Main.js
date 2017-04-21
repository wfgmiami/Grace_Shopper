// This is the parent component used as the main route and contains other components as children

import React from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';

class Main extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
        <div style={{ marginTop: '65px' }}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

export default connect(mapStateToProps)(Main);
