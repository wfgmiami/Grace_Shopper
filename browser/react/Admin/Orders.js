import React from 'react';
import { connect } from 'react-redux';
import { getOrders } from '../../redux/reducers/admin/orders';

import Order from './Order';

const AdminOrders = ({ orders, getOrders }) => {
  return (
    <div className="container">
      <p className="text-center">
        <span className="btn-group">
          <button role="button" className="btn btn-default" onClick={ () => getOrders('all') }>Get All</button>
          <button role="button" className="btn btn-primary" onClick={ () => getOrders('pending') }>Get Pending</button>
          <button role="button" className="btn btn-success" onClick={ () => getOrders('delivered') }>Get Delivered</button>
          <button role="button" className="btn btn-danger" onClick={ () => getOrders('cancelled') }>Get Cancelled</button>
        </span>
      </p>
      <h3>Admin Orders</h3>
      { !orders.length && (<h4>No orders to display</h4>) }
      <ul className="list-group">
        { orders.map(order => <Order key={order.id} order={order} />) }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ adminOrders }) => ({
  orders: adminOrders
});

const mapDispatchToProps = dispatch => ({
  getOrders: scope => dispatch(getOrders(scope))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrders);
