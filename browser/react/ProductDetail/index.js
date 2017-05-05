import React, {Component} from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/reducers/cart';

import axios from 'axios';

class ProductDetail extends Component{
  
  constructor(props){
    super(props);

    this.state={
      product:{},

    }
    this.keepShopping = this.keepShopping.bind(this)
  }

  componentDidMount() {
    
    axios.get(`/api/glasses/detail/${this.props.routeParams.productId}`)
      .then(res => res.data)
      .then( glass => {
        console.log('glass: ',glass)
        this.setState({product: glass})        
      })
  }

  keepShopping(evt) {
        evt.preventDefault();
        browserHistory.push('/');
    }


  render(){
    
    const glass = this.state.product;
    console.log('this.state of detail', this.state.product);

    //set scroll position to the top
    window.scrollTo(0,0);
   
    return(
      <div>
        <h5>{glass.name}</h5>

          {glass.price}

          <h3> Under construction - arum  </h3>
          <br />

          <button className='btn btn-danger' onClick={ () => this.props.addToCart( Object.assign( glass, { lineitems: { quantity: 1 } } ) ) }> Add To Cart</button>

          <br /><br />
          <button className='btn btn-primary' onClick={this.keepShopping}>Keep Shopping</button>
     
      </div>
    )
  }
  
};


const mapStateToProps = ({ products, cart }) => (
  { products, cart }
);

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
