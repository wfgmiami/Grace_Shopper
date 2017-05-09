import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Orders = ({ orders }) => {
  return (
    <div className="container">
      <h1>Orders</h1>
      <ul className="list-group">
        { orders.map(order => (
          <li key={ order.id } className="list-group-item">
          <div>
            <p>
              <b>Order ID:</b> { order.id }
            </p>
            <p>
              <b>Status:</b> { order.status }
            </p>
            <div>
              <b>Items:</b>
              <table className="table table-condensed">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                {
                  order.glasses.map((glass, idx) => <tr key={ idx }>
                    <td>
                      <Link to={`/detail/${glass.id}`}>{ glass.name }</Link>
                    </td>
                    <td>${ glass.lineitems.price }</td>
                    <td>x{glass.lineitems.quantity}</td>
                  </tr>)
                }
                <tr>
                  <td />
                  <td colSpan="2" className="text-center">
                    Order Total: $
                    {
                      order.glasses.reduce((memo, glass) => memo + glass.lineitems.quantity * glass.lineitems.price, 0)
                    }
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div></li>
          )
        ) }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ orders: { list } }) => ({
  orders: list
});

export default connect(mapStateToProps)(Orders);
