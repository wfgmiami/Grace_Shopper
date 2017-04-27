import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addToCart, removeFromCart } from '../../redux/reducers/cart';
import Pagination from './Pagination';

const ProductListItem = ({ product, addToCart, removeFromCart }) => (
  <div className="col-xs-4">
    <div style={{ maxwidth: '300px', margin: 'auto', marginBottom: '10%' }}>
      <img style={{ marginBottom: '0' }} className="img-responsive" src={ product.images[0] } />
      <div id = 'product details'> 
        <div id = 'product name' style={{maxwidth: '80%'}}>
        { product.name } 
        </div>
        <span className="pull-right">
          <span style={{ paddingRight: '15px' }}>
            ${ product.price }
          </span>
          <button className="glyphicon glyphicon-shopping-cart pull-right" onClick={ () => addToCart( Object.assign( product, { lineitems: { quantity: 1 } } ) ) } />
        </span>
      </div>
    </div>
  </div>
);

const CategoryList = ({ products, addToCart, removeFromCart }) => {
  console.log(products);
  return (
    <div>
      <div className="row">
        { products.products.map( product => (
        <ProductListItem key={ product.id } product={ product } addToCart={ addToCart } removeFromCart={ removeFromCart } /> )
        ) }
      </div>
      <Pagination />
    </div>
  );
};

const mapStateToProps = ({ products, cart }) => (
  { products, cart }
);

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item)),
  removeFromCart: item => dispatch(removeFromCart(addToCart(item)))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
