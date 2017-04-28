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
    const categories = [
      { name: 'color', title: 'Color', category: color },
      { name: 'material', title: 'Material', category: material },
      { name: 'shape', title: 'Shape', category: shape },
      { name: 'ideal_face_shape', title: 'Ideal Face Shape', category: ideal_face_shape }
    ];
    return (
      <sidebar>
        <ul className="list-group">
          { categories.map((cat, idx) => (
            <Filtergroup
              key={ idx }
              category={ cat.category }
              title={ cat.title }
              catName={ cat.name }
              modFilter={ this.modFilter }
              filter={this.state.filter}
            />
            )) }
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
