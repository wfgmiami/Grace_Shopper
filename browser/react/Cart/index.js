import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart, decreaseQuantity } from '../../redux/reducers/cart';

class Cart extends Component{
  constructor(props){
    super();
  }

  render() {
    var items = this.props.cart || [{name: 'this', price: 1.99, quantity: 2}, {name: 'other this', price: 2.99, quantity: 1}];
    if (typeof items === 'string'){
      items = JSON.parse(items);
    }
    return (
      <div>
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { items.map(item => (
              <tr key={item.id}>
                <td data-th="Product" className="text-center">{ item.name }</td>
                <td data-th="Price" className="text-center">${ item.lineitems.price }</td>
                <td data-th="Quantity" className="text-center">
                  <button className = "glyphicon glyphicon-upload" onClick={ () => this.props.addToCart(item)}/>
                    <br/>
                      { item.lineitems.quantity } 
                    <br/>
                  <button className = "glyphicon glyphicon-download" onClick={ () => this.props.decreaseQuantity(item)}/>
                </td>
                <td data-th="Subtotal" className="text-center">{ item.lineitems.price * item.lineitems.quantity }</td>
                <td className="actions" data-th="">
                  <button className="btn btn-danger btn-xs" onClick={ () => this.props.removeFromCart(item) }>
                    <span className="glyphicon glyphicon-trash" /> Remove
                  </button>
                </td>
              </tr>
            )) }
          </tbody>
          <tfoot>
      <tr>
        <td />
        <td />
        <td />
        <td className="hidden-xs text-center">
          <strong>
            Total ${items.reduce((sum, item) => ( sum + ((item.lineitems.price * 1) * (item.lineitems.quantity * 1)) ), 0).toString().substring(0, 4)}
          </strong>
        </td>
        <td>
          <a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a>
        </td>
      </tr>
     </tfoot>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ cart }) => (
 { cart }
);

const mapDispatchToProps = dispatch => ({
 addToCart: item => dispatch(addToCart(item)),
 removeFromCart: item => dispatch(removeFromCart(item)),
 decreaseQuantity : item => dispatch(decreaseQuantity(item))

});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
