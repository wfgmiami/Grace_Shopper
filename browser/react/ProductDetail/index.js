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
      glass:{},
      color: '',
      gender: '',
      material: '',
      shape: '',
      reviews: [],
      images: '',
      description: '',
      inventory: '',
      orders: [],
      price: ''
    }
    

    this.keepShopping = this.keepShopping.bind(this)
  }

  componentWillMount() {
    
    axios.get(`/api/glasses/detail/${this.props.routeParams.productId}`)
      .then(res => res.data)
      .then( glass => {
        // console.log('glass: ',glass);
        // console.log('colorr',glass.color[0].value)
        this.setState({
          glass, 
          color: glass.color[0].value,
          gender: glass.gender[2].value,
          material: glass.material[1].value,
          shape: glass.shape[3].value,
          reviews: glass.reviews,
          images: glass.images,
          description: glass.description,
          inventory: glass.inventory,
          orders: glass.orders,
          price: glass.price
         })
        })
      .then( ()=> console.log('state', typeof this.state.images,'imgg', this.state.images['0']  ) )
      .catch(err => console.log(err))
  }

  keepShopping(evt) {
        evt.preventDefault();
        browserHistory.push('/');
    }


  render(){
    //set scroll position to the top
    window.scrollTo(0,0);

    const glass = this.state.glass;

    const cat = `${this.state.gender} / ${this.state.shape} / ${this.state.material}`

    console.log('*******', glass, '###', typeof this.state)
 
   
    return(
      <div>
        <h5><i>{cat}</i></h5>
        <h3>{glass.name}</h3>
        
        <div className="row">
          <div className="col-xs-8">
            
            <img src={this.state.images['0']} />
            <img src={this.state.images['1']} />

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
                          <br /></b>  ))}
              
          </div>
      
      </div >
    )
  }
  
};


const mapStateToProps = ({ products, cart }) => (
  { products, cart }
);

const mapDispatchToProps = dispatch => ({
  addToCart: item => dispatch(addToCart(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);



