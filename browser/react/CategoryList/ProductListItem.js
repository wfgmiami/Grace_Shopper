import React from 'react';

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

export default ProductListItem;
