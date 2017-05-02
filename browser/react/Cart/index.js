import React, { Component } from 'react';
import { connect } from 'react-redux';

// const Cart = ({} =>{

// })

export default class Cart extends Component{
    constructor(){
        super();
    };
    render(){
        var items = this.props.items || [];
        return (
            <div>
                <table id="cart" className="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-th='Product'>Product Name</td>
                            <td data-th="Price">$1.99</td>
                            <td data-th="Quatntity">
                            </td>
                            <td data-th="Subtotal" className="text-center">1.99</td>
                            <td className="actions" data-th="">
								<button className="btn btn-primary btn-xs"><span className="glyphicon glyphicon-refresh"></span> Refresh</button>
								<button className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-trash"></span> Trash</button>								
							</td>
                        </tr>
                    </tbody>
                    <tfoot>
						<tr>
                            <td></td>
                            <td></td>
                            <td></td>
							<td className="hidden-xs text-center"><strong>Total $1.99</strong></td>
							<td><a href="#" className="btn btn-success btn-block">Checkout <i className="fa fa-angle-right"></i></a></td>
						</tr>
					</tfoot>
                </table>
                 <div>
                    <ul>
                    {items.map(item => (<li>{item.name}</li>))}
                    </ul>
                </div>
            </div>
        )
    }
}