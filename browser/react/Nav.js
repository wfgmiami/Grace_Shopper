import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

class Nav extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let cart = typeof this.props.cart === 'string' ? JSON.parse(this.props.cart) : this.props.cart;
    const cartItems = cart.reduce((memo, item) => {
      return memo + item.lineitems.quantity * 1;
    }, 0);
    let token;
    if (this.props.user && this.props.user.isAdmin) {
      token = localStorage.getItem( 'token' );
    }
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
              <c className="navbar-brand"><Link to="/">Grace Shopper</Link></c>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <a href="#">
                    Cart { cartItems }
                  </a>
                </li>
                <li className="divider" />
                <li>
                  <a href="/github">Github</a>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {
                  token &&
                  <li className="">
                    <Link href={`/admin`}>
                      Admin
                    </Link>
                  </li>
                }
                <li className="">
                  <Link to="/signup">
                    <span className="glyphicon glyphicon-heart" />
                    { ' ' }
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, auth }) => ({
  cart,
  user: auth.user
});

export default connect(mapStateToProps)(Nav);
