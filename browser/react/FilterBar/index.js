import React from 'react';
import { connect } from 'react-redux';
import Filtergroup from './Filtergroup';
import { changeFilter } from '../../redux/reducers/products';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { categories: { color, shape, material, ideal_face_shape } } = this.props;
    return (
      <sidebar>
        <ul className="list-group">
          <Filtergroup category={ color } title="Color" />
          <Filtergroup category={ shape } title="Shape" />
          <Filtergroup category={ material } title="Material" />
          <Filtergroup category={ ideal_face_shape } title="Ideal Face Shape" />
        </ul>
      </sidebar>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  offset: state.products.offset
});

const mapDispatchToProps = dispatch => ({
  changeFilter: (offset, filter) => dispatch(changeFilter(offset, filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
