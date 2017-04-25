import React from 'react';
import { connect } from 'react-redux';

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <sidebar>
        <ul className="list-group">
          <li className="list-group-item">
            <p>Filter by Color:</p>
            { this.props.categories.color.map((cat, idx) => (
              <p key={idx}>
                <label>
                  <input type="checkbox" /> { cat }
                </label>
              </p>
            )) }
          </li>
          <li className="list-group-item">
            <p>Filter by Shape:</p>
            { this.props.categories.shape.map((cat, idx) => (
              <p key={idx}>
                <label>
                  <input type="checkbox" /> { cat }
                </label>
              </p>
            )) }
          </li>
          <li className="list-group-item">
            <p>Filter by Material:</p>
            { this.props.categories.material.map((cat, idx) => (
              <p key={idx}>
                <label>
                  <input type="checkbox" /> { cat }
                </label>
              </p>
            )) }
          </li>
          <li className="list-group-item">
            <p>Filter by Ideal Face Shape:</p>
            { this.props.categories.ideal_face_shape.map((cat, idx) => (
              <p key={idx}>
                <label>
                  <input type="checkbox" /> { cat }
                </label>
              </p>
            )) }
          </li>
        </ul>
      </sidebar>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(mapStateToProps)(FilterBar);
