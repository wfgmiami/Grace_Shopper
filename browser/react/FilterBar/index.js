import React from 'react';
import { connect } from 'react-redux';
import Filtergroup from './Filtergroup';
import { changeFilter } from '../../redux/reducers/products';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: {} };
    this.modFilter = this.modFilter.bind(this);
  }

  modFilter({ name, value }) {
    let { filter } = this.state;
    if ( filter[name] ) {
      if (filter[name].indexOf(value) > -1 ) {
        filter[name] = filter[name].filter(val => val !== value);
      } else {
        filter[name].push(value);
      }
    } else {
      filter[name] = [value];
    }
    this.setState(filter);
    this.props.changeFilter(1, filter);
  }


  render() {
    const { categories: { color, shape, material, ideal_face_shape } } = this.props;
    return (
      <sidebar>
        <ul className="list-group">
          <Filtergroup category={ color } title="Color" catName="color" modFilter={ this.modFilter } />
          <Filtergroup category={ shape } title="Shape" catName="shape" modFilter={ this.modFilter } />
          <Filtergroup category={ material } title="Material" catName="material" modFilter={ this.modFilter } />
          <Filtergroup category={ ideal_face_shape } title="Ideal Face Shape" catName="ideal_face_shape" modFilter={ this.modFilter } />
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
