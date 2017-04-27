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
                <h2>Cart</h2>
                <div>
                    <ul>
                    {items.map(item => (<li>{item.name}</li>))}
                    </ul>
                </div>
            </div>
        )
    }
}