import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Products = (props) => {
    // console.log(props)
    const {name,img,seller, stock, price,key} = props.products
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt=""/>
            </div>
            <div className="product-details">
                <h4><Link to={"/product/"+key}>{name}</Link></h4>
                <p>By: {seller}</p>
                <p>$ {price} </p>
                <p>Only {stock} left- Order Sooon</p>
                {props.showAddcartBtn && <button onClick={ () => props.handleAddClick(props.products)} key={key} className="add-cart-btn">
                    <FontAwesomeIcon icon={faShoppingCart}/> Add to cart</button>}
            </div>
        </div>
    );
};

export default Products;