import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import orderPlaceImg from '../../images/giphy.gif'

const Order = () => {
    const [cart, setCart] = useState([])
    const [orderPlaced, setaOrderPlaced] = useState(false)

    const handlePlaceOrder = () =>{
        setCart([]);
        setaOrderPlaced(true)
        processOrder();
    }

    const handleRemoveItem = (productKey) =>{
        const newCart = cart.filter(eachProduct => eachProduct.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    //cart
    useEffect(() =>{
     const savedCart = getDatabaseCart()
     
     const productKeys = Object.keys(savedCart)
     const cartProduct = productKeys.map( key => {
         const product = fakeData.find(pd => pd.key === key)
         product.quantity = savedCart[key]
         return product;
     })
     setCart(cartProduct)
    },[])

    let placeImage;
    if(orderPlaced){
        placeImage = <img src={orderPlaceImg} alt="" srcset=""/>
    }

    return (
        <div className="shop">
            <div className="products-container">
            {/* <h1>Order items: {cart.length}</h1> */}
            {
                cart.map(eachProduct => <ReviewItem handleRemoveItem={handleRemoveItem} product={eachProduct}></ReviewItem>)
            }
            {
                placeImage
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="review-btn" onClick={handlePlaceOrder} >Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Order;