// This is the parent component used as the main route and contains other components as children

import React from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';
import LoginForm from './LoginForm';
import FilterBar from './FilterBar';
import Cart from './Cart';

class Main extends React.Component {
  constructor(props) {
    super();
    console.log(props);
  }

  render() {
    var seedData = [{name: "this"}, {name: "other this"}];
    return (
      <div className="container-fluid">
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
              <Cart />
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
