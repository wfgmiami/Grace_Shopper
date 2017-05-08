import React from 'react';
import User from './User';
import { connect } from 'react-redux';

import { modifyOrder } from '../../redux/reducers/admin/orders';


const OrderItem = ({ order, onChangeStatus, status }) => (
  <li className="list-group-item">
    <p>
      <b>id:</b> { order.id }
    </p>
    <p className="form-inline">
      <b>status:</b>
      { ' ' }
      <select className="form-control" value={ status } onChange={ onChangeStatus }>
        <option value="">Select One:</option>
        <option>Pending</option>
        <option>Shipping</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>
    </p>
    <div>
      <User user={ order.user } />
    </div>
    <p>
      <b>Shipping Address:</b> { order.shippingAddress || 'None specified' }
    </p>
  </li>
);


class Order extends React.Component {
  constructor(props) {
    super();
    this.state = { status: props.order.status };
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeStatus(ev) {
    this.setState({ status: ev.target.value }, () => {
      this.props.modifyOrder(this.props.order, this.state.status);
    });
  }

  render() {
    return (
      <OrderItem status={ this.state.status } onChangeStatus={ this.onChangeStatus } order={ this.props.order } />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  modifyOrder: (order, status) => dispatch(modifyOrder(order, status))
});

export default connect(null, mapDispatchToProps)(Order);
