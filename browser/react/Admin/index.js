import React from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';

function mapStateToProps(state) {
  return {

  };
}

export class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Admin</h1>
        <Nav />
        { this.props.children }
      </div>
    );
  }
}

export default connect(mapStateToProps)(Admin);
