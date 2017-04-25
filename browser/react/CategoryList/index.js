import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { addToCart, removeFromCart } from '../../redux/reducers/cart';

const ProductListItem = ({ product, addToCart, removeFromCart }) => (
  <div className="col-xs-4">
    <div style={{ width: '300px', margin: 'auto', marginBottom: '10%' }}>
      <img style={{ marginBottom: '0' }} className="thumbnail" src={ product.images[0] } />
      <div> { product.name }
        <span className="pull-right">
          <span style={{ paddingRight: '15px' }}>
            ${ product.price }
          </span>
          <button className="glyphicon glyphicon-shopping-cart pull-right" onClick={ () => addToCart({name: product.name, quantity: 1}) } />
        </span>
      </div>
    </div>
  </div>
);

const CategoryList = ({ products, addToCart, removeFromCart }) => {
  console.log(products);
  return (
  <div className="row">
    { products.map( product => (
    <ProductListItem key={ product.id } product={ product } addToCart={ addToCart } removeFromCart={ removeFromCart } /> )
    ) }
  </div>
)};

const mapStateToProps = ({ products, cart }) => (
  { products, cart }
);

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item)),
  removeFromCart: item => dispatch(removeFromCart(addToCart(item)))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
