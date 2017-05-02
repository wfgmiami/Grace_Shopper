import React from 'react';
import { connect } from 'react-redux';
import { loadProducts } from '../../redux/reducers/products';

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

const mapDispatchToProps = dispatch => ({
  loadProducts: offset => dispatch(loadProducts(offset))
});

export const Pagination = ({ loadProducts, products }) => {
  let pages = [];
  const { count, offset } = products;
  products = products.products;

  let start = 1;
  let end = 10;
  const maxPossible = Math.ceil(count / (products.length || 15));

  if (offset >= 10) {
    start = offset - 5;
    end = offset + 5;
    if (offset > (maxPossible - 10)) {
      start = maxPossible - 10;
      end = maxPossible;
    }
  }


  for (let i = start; i <= end; i++) {
    pages.push((
      <li
        className={ offset === i && 'active' }
        onClick={ () => loadProducts( i ) }
      >
        <a>{i}</a>
      </li>
      ));
  }

  return (
    <ul className="pagination">
      { pages }
    </ul>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
