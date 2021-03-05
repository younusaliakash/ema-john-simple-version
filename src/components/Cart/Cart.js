import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart= props.cart
    // console.log(cart)
    const total = cart.reduce((total , product) => total + product.price * product.quantity, 0)

    const newTotal = toDecimal(total)

    const shipptingCost = cart.reduce((total, product) => total + product.shipping, 0 )

    const newShipptingCost = toDecimal(shipptingCost)

    let vatTax = toDecimal((newTotal + newShipptingCost) *0.1);
    const grandTotal = toDecimal(( vatTax  + newShipptingCost + newTotal));

    function toDecimal (num){
        return (Math.round(num * 100) / 100);
    }


    return (
        <div className="cart">
            <h3>Order Summary</h3>
            <p>Ordered Items : {cart.length}</p>
            <table>
                <thead></thead>
                <tbody>
                <tr>
                    <td><small>Products Price:</small></td>
                    <td><small>${newTotal}</small></td>
                </tr>
                <tr>
                    <td><small>Shiping Cost:</small></td>
                    <td><small>${newShipptingCost}</small></td>
                </tr>
                <tr>
                    <td><small>Tax and VAT:</small></td>
                    <td><small>${vatTax}</small></td>
                </tr>
                <tr className="grand-total">
                    <td>Order Total: </td>
                    <td>${grandTotal}</td>
                </tr>
                </tbody>
                <tfoot></tfoot>
            </table>
            {
                props.children
            }
            

        </div>
    );
};

export default Cart;