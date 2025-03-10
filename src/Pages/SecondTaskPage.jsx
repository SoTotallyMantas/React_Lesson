import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import Cart from '../Components/Cart'
import ProductList from '../Components/ProductList'
function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (itemIndex !== -1) {

            const updatedCart = [...cartItems];
            updatedCart[itemIndex].quantity += 1;
            setCartItems(updatedCart);
        }
        else {

            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {

        const updatedCart = cartItems
            .map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            })
            .filter(item => item.quantity > 0);

        setCartItems(updatedCart);
        
    }


    return (
        <>
            <main className="container mt-5 text-center">
                <div className="row">
                    <h1>Shopping System</h1>
                    <ProductList addToCart={addToCart} />
                    
                    <Cart cartItems={cartItems} removeFromCart={removeFromCart }/>
                </div>
            </main>
        </>
    )
}

export default App
