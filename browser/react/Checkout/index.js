import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getCart, addToCart, removeFromCart} from '../../redux/reducers/cart';
import axios from 'axios';


class Checkout extends React.Component{

  constructor(props){
    super(props);
    this.state={ 
      cardType: 'Credit',
      cardVendor: '',
      expiration: '',
      name: '',
      billingAddress: '',
      user: this.props.user || { name: 'NOOOOOO' }
    }

    this.submitOrder = this.submitOrder.bind(this);
    this.changeCardType = this.changeCardType.bind(this);
    this.changeCardVendor = this.changeCardVendor.bind(this);
    this.changeExpiration = this.changeExpiration.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.keepShopping = this.keepShopping.bind(this);
  }

  submitOrder(evt){
    evt.preventDefault();
 
    const _this=this;
      console.log('THIS IS:', this.props.cart)
    // if (_this) {
    // }
    // else {
    //   console.log('no cart!')
    // }
     axios.post('/api/order/checkout',{
      cart: this.props.cart,
      payment: {
        cardType: this.state.cardType,
        cardVendor: this.state.cardVendor,
        expiration: this.state.expiration,
        name: this.state.name,
        billingAddress: this.state.billingAddress,
      },
      userId: this.props.user.id
    })
    .then(()=> browserHistory.push('/'))
    .catch(err => console.log(err))
  }

  changeCardType(evt){
    this.setState({ cardType: evt.target.value })
  }

  changeCardVendor(evt){
    this.setState({ cardVendor: evt.target.value })
  }

  changeExpiration(evt){
    this.setState({ expiration: evt.target.value })
  }

  changeName(evt){
    this.setState({ name: evt.target.value })
  }

  changeAddress(evt){
    this.setState({ billingAddress: evt.target.value })
    console.log(this.state)
  }

  keepShopping(evt) {
        evt.preventDefault();
        browserHistory.push('/');
  }

  render(){
    console.log('*****the',this.props.id);

    const { cardType, cardVendor, expiration, billingAddress, name } = this.state;

    const { user } = this.props;

    const na = (!user) ?  '' : user.name;

    var items = this.props.cart ;
    if (typeof items === 'string'){
      items = JSON.parse(items);}
      // console.log('items',items)

      const co = (items) => items.length == 0 ? <h2>The cart is Empty</h2> :  <h2> Checkout <i>({items.length})</i>Item </h2> ;
      
      //this.setState({user: this.props.auth.user})
    
    return(
      <div className ='col-xs-12'>
      <div className='row' style={{align: 'center'}}>{co(items)}</div>

      <div>
        <table id="cart" className="table table-hover table-condensed">
          <thead>
            <tr>
              <th>Product</th> <th>Price</th> <th>Quantity</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            { items.map(item => (
              <tr key={item.id}>
                <td data-th="Product" className="text-center">{ item.name }</td>
                <td data-th="Price" className="text-center">${ item.lineitems.price }</td>
                <td data-th="Quatntity" className="text-center">{ item.lineitems.quantity }</td>
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
        <td /> 
        
      </tr>
     </tfoot>
        </table>
      </div>

      <br /><br />
      <div className="container col-xs-9"   >
       <h4><u> Payment Information </u></h4>
        <form onSubmit={ this.submitOrder }>
          
          <div className="form-group">
            <label>Card Type: </label>
              <select className="form-control" onChange={ this.changeCardType } defaultValue="Credit" >
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
              </select>
            </div>
          
          <div className="form-group">
            <label>Card Vender: </label>
            <input type="text" className="form-control" value={ cardVendor } onChange={ this.changeCardVendor } />
          </div>
          
          <div className="form-group">
            <label>Expiration Date: </label>
            <input type="date" min="2017-5-9" className="form-control" value={ expiration } onChange={ this.changeExpiration } />
          </div>
          
          <div className="form-group">
            <label>Name: </label>
            <input type="text" className="form-control" defaultValue={ na } onChange={ this.changeName } >
              
            </input>
          </div>
          
          <div className="form-group">
            <label>Billing Address: </label>
            <input type="text" className="form-control" value={ billingAddress } onChange={ this.changeAddress } />
          </div>
          
          { 
            items.length == 0 ? <button className='btn'> Add Your Item </button> : 
            <div className="form-group">
            <button type="submit" className="btn btn-warning">Place Your Order</button>
          </div>
          }
          
          <div>
           
          </div>
        </form>

        <br/>
      <button className='btn btn-primary' onClick={this.keepShopping}>Keep Shopping</button>
      </div>

      </div>
      )
  }

}

const mapStateToProps = ({ cart, auth: {user} }) => (
  { cart, user }
);

const mapDispatchToProps = dispatch => ({
 getCart: () => dispatch(getCart()),
 removeFromCart: item => dispatch(removeFromCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);


