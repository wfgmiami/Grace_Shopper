import React from 'react';

const ProductListItem = ({ product, addToCart, removeFromCart }) => (
  <div className="col-lg-4 col-md-6 col-sm-12">
    <div className="panel panel-default" style={{ width: '100%', margin: 'auto', marginBottom: '10%' }}>
      <div className="panel-body">
        <span className="pull-right">
          <span>
            <button className="btn btn-default btn-xs" onClick={ () => addToCart( Object.assign( product, { lineitems: { quantity: 1 } } ) ) }>
              ${ product.price + ' ' }
              <span className="glyphicon glyphicon-shopping-cart" />
            </button>
          </span>
        </span>
        <img style={{ width: '100%', marginBottom: '0' }} className="img-responsive" src={ product.images[0] } />
      </div>
      <div className="panel-footer"> <b>{ product.name }</b>
      </div>
    </div>
  </div>
);

export default ProductListItem;
