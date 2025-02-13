import React, { useState,useEffect } from 'react';



export default function Cart({ cartItems,removeFromCart }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {

        let newTotal = 0;
        cartItems.forEach(item => {
            newTotal += item.Price * item.quantity;
        });
        setTotal(newTotal);

    }, [cartItems]);
   
    return (
        <div className="col align-items-start w-100">
            <h2>Cart</h2>

            <div className="col-md-6 w-100">
                <ul className="list-group text-start">
                    {cartItems.length === 0 ? (
                        <p className="text-center">No Items in cart</p>
                    ) : (
                        
                            cartItems.map((item) => (
                            <li className="list-group-item d-flex flex-column justify-content-between align-items-center" key={item.id}>
                                <span>{item.item_title}</span>
                                <span className=""> Quantity: {item.quantity} Price: {item.Price.toFixed(2) * item.quantity}&euro;</span>
                                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </li>

                        ))
                    )}
                    <span className="text-center">Total Price: {total.toFixed(2)}&euro;</span>
                </ul>
            </div>
        </div>
    );
}
