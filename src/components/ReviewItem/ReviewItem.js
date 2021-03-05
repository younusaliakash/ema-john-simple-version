import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    // console.log(props.product)
    const {name,quantity, key,price} = props.product
    const handleRemoveItem = props.handleRemoveItem
    return (
        <div className="review-item">
            <h4>{name}</h4>
            <p>Quantity : {quantity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button onClick={ () => handleRemoveItem (key)} className="review-btn">Remove Item</button>
        </div>
    );
};

export default ReviewItem;