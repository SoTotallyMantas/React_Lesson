import React, { useState } from 'react';
import ProductItem from './ProductItem';


export default function ProductList({ addToCart }) {

    const [items, setItems] = useState([
        { id: 0, item_title: 'Preke 1', Price: 370.99, quantity: 1},
        { id: 1, item_title: 'Preke 2', Price: 430.55, quantity: 1 },
        { id: 2, item_title: 'Preke 3', Price: 520.21, quantity: 1 },
        { id: 3, item_title: 'Preke 4', Price: 350.61, quantity: 1 },
        { id: 4, item_title: 'Preke 5', Price: 460.58, quantity: 1 },
        { id: 5, item_title: 'Preke 6', Price: 520.26, quantity: 1 }
    ]);


    return (
        <div className="col align-items-start w-100">
            <h2>Product List</h2>
            
            <div className="col-md-6 w-100">
                <ul className="list-group text-start">
                    {items.length === 0 && <p>No Products</p>}
                    {items.map((item) => (
                        <ProductItem
                            key={item.id}
                            item={item}
                            addToCart={addToCart}
                            
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
