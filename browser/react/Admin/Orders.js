import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../redux/reducers/admin/orders';

import Order from './Order';

const AdminOrders = ( { orders: { orders, scope }, getOrders } ) => (

<div className="container">
  <p className="text-center">
    Filter: { ' ' }
    <span className="btn-group">
      <button role="button" className={`btn btn-default ${ (scope === 'all' || !scope) && 'active' }`} onClick={ () => getOrders('all') }>
        All
      </button>
      <button role="button" className={`btn btn-default ${ scope === 'pending' && 'active' }`} onClick={ () => getOrders('pending') }>
        Pending
      </button>
      <button role="button" className={`btn btn-default ${ scope === 'shipping' && 'active' }`} onClick={ () => getOrders('shipping') }>
        Shipping
      </button>
      <button role="button" className={`btn btn-default ${ scope === 'delivered' && 'active' }`} onClick={ () => getOrders('delivered') }>
        Delivered
      </button>
      <button role="button" className={`btn btn-default ${ scope === 'cancelled' && 'active' }`} onClick={ () => getOrders('cancelled') }>
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


const mapStateToProps = ({ adminOrders }) => ({
  orders: adminOrders
});

const mapDispatchToProps = dispatch => ({
  getOrders: scope => dispatch(getOrders(scope))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
