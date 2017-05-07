import React from 'react';
import User from './User';

class Order extends React.Component {

  render() {
    const { order } = this.props;
    return (
      <li className="list-group-item">
        <p>
          <b>id:</b> { order.id }
        </p>
        <p>
          <b>status:</b> { order.status }
        </p>
        <div>
          <User user={ order.user } />
        </div>
      </li>
    );
  }
}

export default Order;
