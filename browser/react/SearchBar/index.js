import React from 'react';
import { connect } from 'react-redux';
import { searchFilter } from '../../redux/reducers/products';
import axios from 'axios';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
    this.changeSearch = this.changeSearch.bind(this);
    this.doSearch = this.doSearch.bind(this);
  }


  changeSearch(evt){
  	this.setState({input:evt.target.value});
  }

  doSearch(evt){
  	evt.preventDefault();

  	const { input } = this.state;
  	axios.get('/api/glasses/search', {params : {name:input.toUpperCase()}})
  		.then((glasses)=>{
  			console.log('doSearch',glasses.data);
  			return glasses.data;
  		})
  		.then( res => this.props.searchFilter(res)
  		)
  		.catch(err => console.log(err));
  }

  render() {
    
    //console.log('search result', this.props);
    console.log('search input', this.state)
    return (
    	<div>     	
	      
	      <form className="navbar-form" onSubmit={ 
	      	this.doSearch }>
		    
		    <div className="input-group add-on">
		      
		    	<input className="form-control" placeholder="Search" type="text" value={this.state.input} onChange={this.changeSearch}/>
		    			      
		      <div className="input-group-btn">

		       		<button className="btn btn-default" type="submit">
		        	<i className="glyphicon glyphicon-search" />
		        	</button>
		      	</div>
		    </div>
		 
		  </form>
     </div>
    );
  }
}

const mapStateToProps = state => ({
  	products: state.products
  
});

const mapDispatchToProps = dispatch => ({

  searchFilter: (input) => dispatch(searchFilter(input))

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
