import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0,12)
    const [products, setProducts] = useState(first10)
    const [cart , setCart] = useState([])

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(pdkey =>{
            const product = fakeData.find(pd => pdkey === pd.key)
            product.quantity = savedCart[pdkey]
            return product;
        })
        setCart(previousCart)
    },[])

    const handleAddClick = (product) => {
        const sameProduct = cart.find( pd => pd.key === product.key)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter( pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart)
        addToDatabaseCart(product.key, count )
    }
    return (
        <div className="shop">
            <div className="products-container">
                {
                    products.map((product => <Product showAddcartBtn={true} 
                        key={product.key} handleAddClick={handleAddClick} products={product}></Product>))
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/Order">
                        <button className="review-btn">Review your Order</button>
                    </Link>
                </Cart>

            </div>
        </div>
    );
};

export default Shop;