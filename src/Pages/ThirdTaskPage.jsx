import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import GuessGame from '../Components/GuessGame'
function App() {




    return (
        <>
            <main className="container mt-5 text-center">
                <div className="row gx-5">
                    <h1>Guess The Number</h1>
                       <GuessGame/>
                    
                </div>
            </main>
        </>
    )
}

export default App
