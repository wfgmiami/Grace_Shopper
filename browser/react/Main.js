// This is the parent component used as the main route and contains other components as children

import React from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';
import LoginForm from './LoginForm';
import FilterBar from './FilterBar';

class Main extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Nav />
        <div style={{ marginTop: '65px' }}>
          <div className="row">
            <div className="col-sm-2">
              <FilterBar />
            </div>
            <div className="col-sm-7">
              { this.props.children }
            </div>
            <div className="col-sm-3">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state
});

export default connect(mapStateToProps)(Main);
