import React from 'react';
import User from './User';

const Order = ({ order }) => (
  <li className="list-group-item">
    <p>
      <b>id:</b> { order.id }
    </p>
    <p>
      <b>status:</b> { order.status }
    </p>
    <div>
      <User user={order.user} />
    </div>
  </li>
);

export default Order;
