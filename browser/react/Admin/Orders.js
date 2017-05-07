import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../redux/reducers/admin/orders';

import Order from './Order';

class AdminOrders extends React.Component {
  constructor() {
    super();
    this.state = { filter: 'all' };
    this.onGetOrders = this.onGetOrders.bind(this);
  }

  onGetOrders(filter) {
    this.setState( { filter } );
    this.props.getOrders(filter);
  }

  render() {
    const { orders, getOrders } = this.props;
    const { filter } = this.state;
    return (
      <div className="container">
        <p className="text-center">
          Filter: { ' ' }
          <span className="btn-group">
            <button role="button" className={`btn btn-default ${ filter === 'all' && 'active' }`} onClick={ () => this.onGetOrders('all') }>
              All
            </button>
            <button role="button" className={`btn btn-default ${ filter === 'pending' && 'active' }`} onClick={ () => this.onGetOrders('pending') }>
              Pending
            </button>
            <button role="button" className={`btn btn-default ${ filter === 'shipping' && 'active' }`} onClick={ () => this.onGetOrders('shipping') }>
              Shipping
            </button>
            <button role="button" className={`btn btn-default ${ filter === 'delivered' && 'active' }`} onClick={ () => this.onGetOrders('delivered') }>
              Delivered
            </button>
            <button role="button" className={`btn btn-default ${ filter === 'cancelled' && 'active' }`} onClick={ () => this.onGetOrders('cancelled') }>
              Cancelled
            </button>
          </span>
        </p>
        <h3>Admin Orders</h3>
        { !orders.length && (<h4>No orders to display</h4>) }
        <ul className="list-group">
          { orders.map(order => <Order key={order.id} order={order} />) }
        </ul>
      </div>
    );

  }
}


const mapStateToProps = ({ adminOrders }) => ({
  orders: adminOrders
});

const mapDispatchToProps = dispatch => ({
  getOrders: scope => dispatch(getOrders(scope))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
