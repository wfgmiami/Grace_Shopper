import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const ProductListItem = ({ product }) => (
  <div className="col-xs-6">
    <div style={{ width: '300px', margin: 'auto' }}>
      <img style={{ marginBottom: '0', marginTop: '10%' }} className="thumbnail" src={ product.images[1] } />
      <div> { product.name }
        <Link className="glyphicon glyphicon-shopping-cart pull-right" />
        <span className="pull-right"> ${ product.price }{ ' | '}</span>
      </div>
    </div>
  </div>
);

const CategoryList = ( props ) => {
  let filteredProducts;
  if (props.route.path === '/eyeglasses'){
    filteredProducts = props.products.filter( product => product.categoryId === 1 );
  } else {
    filteredProducts = props.products.filter( product => product.categoryId === 2 );
  }
  return (
    <div className = "row">
      { props.products.map( product => (
      <ProductListItem key={ product.id } product={ product } /> )
      ) }
    </div>
  );
};

const mapStateToProps = ({ products }) => (
  { products }
);

export default connect(mapStateToProps)(CategoryList);
