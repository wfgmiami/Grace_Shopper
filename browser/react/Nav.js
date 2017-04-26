import React from 'react';
import { connect } from 'react-redux';

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const cartItems = Object.keys(this.props.cart).reduce((memo, item) => {
      return memo + this.props.cart[item] * 1;
    }, 0);
    return (
      <div>
        <nav id="mainNavbar" className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand">Grace Shopper</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li className="dropdown
                active">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    <span className="glyphicon glyphicon-search" />
                    { ' ' }
                    Search
                  </a>
                </li>
                <li className="dropdown
                active">
                  <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                    Cart { cartItems }
                  </a>
                </li>
                <li className="divider" />
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="">
                  <a href="/user/settings/">
                    <span className="glyphicon glyphicon-user" />
                    { ' ' }
                    Sign In
                  </a>
                </li>
                <li className="">
                  <a href="/user/feedback/">
                    <span className="glyphicon glyphicon-heart"></span>
                    { ' ' }
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => ({
  cart
});

export default connect(mapStateToProps)(Nav);
