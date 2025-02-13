import React from 'react';

export default function ProductItem({ item, addToCart}) {

    return (

        <li className=" list-group-item d-flex justify-content-between align-items-center">
            <span>{item.item_title}</span>
            <p className="text-gray-600 mb-2">{item.Price.toFixed(2)}&euro;</p>
            <div className="d-flex gap-2">
                <button className="btn btn-success btn-fixed w-100 " onClick={() => addToCart(item)}>
                Add to Cart
                </button>
                
            </div>
        </li>

    );
}
