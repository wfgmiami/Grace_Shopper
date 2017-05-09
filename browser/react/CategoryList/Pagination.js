import React from 'react';
import { connect } from 'react-redux';
import { loadProducts } from '../../redux/reducers/products';
import { pgStartEnd } from './pagLogic';

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

  const { start, end } = pgStartEnd( offset, count );

  for (let i = start; i <= end; i++) {
    pages.push((
      <li
        key={ i }
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
