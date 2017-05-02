import React from 'react';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/reducers/cart';
import Pagination from './Pagination';
import ProductListItem from './ProductListItem';

const CategoryList = ({ products, addToCart, removeFromCart }) => {
  return (
    <div>
      <div className="row">
        { products.products.map( product => (
          <ProductListItem
            key={ product.id }
            product={ product }
            addToCart={ addToCart }
            removeFromCart={ removeFromCart }
          /> )
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
