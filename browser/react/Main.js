// This is the parent component used as the main route and contains other components as children

import React from 'react';
import { connect } from 'react-redux';

import Nav from './Nav';
import LoginForm from './LoginForm';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import Cart from './Cart';

class Main extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    var seedData = [{name: "this"}, {name: "other this"}];
    console.log('this.props.children********',this.props)
    return (
      <div className="container-fluid">
        <Nav />
        <div style={{ marginTop: '65px' }}>
          <div className="row">
          <SearchBar/>
            <div className="col-sm-2">
              <FilterBar />
            </div>
            <div className="col-sm-7">
              { this.props.children }
            </div>
            <div className="col-sm-3">
              <LoginForm />
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
