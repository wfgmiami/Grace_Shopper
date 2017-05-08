import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/reducers/cart';

import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';


class ProductDetail extends Component{

  constructor(props){
    super(props);

    this.state={
      glass:{ categories: []},
      reviews: [],
      images: '',
      description: '',
      inventory: '',
      price: ''
    };

    this.keepShopping = this.keepShopping.bind(this);
  }

  componentWillMount() {

    axios.get(`/api/glasses/detail/${this.props.routeParams.productId}`)
      .then(res => res.data)
      .then( glass => {
        this.setState({
          glass,
          reviews: glass.reviews,
          images: glass.images,
          description: glass.description,
          inventory: glass.inventory,
          price: glass.price
         });
        })
      .catch(err => console.log(err));
  }

  keepShopping(evt) {
        evt.preventDefault();
        browserHistory.push('/');
    }


  render(){
    //set scroll position to the top
    window.scrollTo(0, 0);

    const { glass } = this.state;

    const gender = glass.categories.filter(cat => cat.name === 'gender')[0];
    const shape = glass.categories.filter(cat => cat.name === 'shape')[0];
    const material = glass.categories.filter(cat => cat.name === 'material')[0];

    const cat = `${gender && gender.value} / ${shape && shape.value} / ${material && material.value}`;

    return (
      <div>
        <h5><i>{cat}</i></h5>
        <h3>{glass.name}</h3>

        <div className="row">
          <div className="col-xs-8">
          { this.state.images.length &&
            <div>
              <img src={this.state.images['0'].replace(/wid=300/, 'wid=800')} style={{ maxWidth: '100%' }} />
              <img src={this.state.images['1'].replace(/wid=300/, 'wid=800')} style={{ maxWidth: '100%' }} />
            </div>
          }

          </div>
          <div className="col-xs-4">
            <StarRatingComponent name="prior product rating" editing={false} starCount={5} value={+glass.reviewSummary} starColor={'orange'} emptyStarColor={'lightgray'}/> <text style={{color: 'grey', size:'5px'}}><i>({this.state.reviews.length} reviews)</i></text>

            <div>Price: <h4>${glass.price}</h4></div>
              <div>Decription: {glass.description}</div>
              <br />
              <button className='btn btn-danger' onClick={ () => this.props.addToCart( Object.assign( glass, { lineitems: { quantity: 1 } } ) ) }> Add To Cart</button> <br /><br />
              <button className='btn btn-primary' onClick={this.keepShopping}>Keep Shopping</button>
          </div>
        </div>

          <br />

          <div className="row">
            <h4>Customer Review</h4>
            {this.state.reviews.map((review, i) => (
                <b key={i} style={{padding: '5px',paddingLeft: '20px',marginBottom: '5px'}}>
                <StarRatingComponent name="prior product rating" editing={false} starCount={5} value={+review.rating} starColor={'orange'} emptyStarColor={'lightgray'}/>
                    <span>{review.createdAt}  {review.review_text} </span>
                <br /></b>
              )
            )}

          </div>

      </div>
    );
  }

}


const mapStateToProps = ({ products, cart }) => (
  { products, cart }
);

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);

