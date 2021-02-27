import React, { useState } from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0,12)
    const [products, setProducts] = useState(first10)
    const [cart , setCart] = useState([])

    const handleAddClick = (product) => {
        const newCart = [...cart , product];
        setCart(newCart)
    }
    return (
        <div className="shop">
            <div className="products-container">
                {
                    products.map((product => <Product 
                        handleAddClick={handleAddClick}products={product}></Product>))
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>

            </div>
        </div>
    );
};

export default Shop;