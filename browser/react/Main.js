import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

export class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}



export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Main)
