import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/reducers/cart';

// const Cart = ({} =>{

// })
class Cart extends Component{
  constructor(props){
    super();
  }

  render(){
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td data-th='Product' className="text-center">{item.name}</td>
                <td data-th="Price" className="text-center">${item.price}</td>
                <td data-th="Quatntity" className="text-center">{item.lineitems.quantity}</td>
                <td data-th="Subtotal" className="text-center" className="text-center">{item.price * item.lineitems.quantity}</td>
                <td className="actions" data-th="">
                  <button className="btn btn-danger btn-xs" onClick={()=>this.props.removeFromCart(item)}><span className="glyphicon glyphicon-trash"></span> Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td className="hidden-xs text-center">
          <strong>
            Total ${items.reduce(function(sum,item){return (sum+(item.price*item.lineitems.quantity))},0).toString().substring(0,4)}
          </strong>
        </td>
        <td>
          <a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a>
        </td>
      </tr>
     </tfoot>
        </table>
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => (
 { cart }
);

const mapDispatchToProps = dispatch => ({
 addToCart: item => dispatch(addToCart(item)),
 removeFromCart: item => dispatch(removeFromCart(item))
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
