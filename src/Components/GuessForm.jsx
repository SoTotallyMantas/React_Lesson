import { useState } from 'react'
import React from 'react';

export default function GuessForm({ onSetPlayerGuess }) {

    const [NewPlayerGuess, setNewPlayerGuess] = useState('');
    const [Error, setError] = useState('');

    const handleSumbit = (e) => {
        e.preventDefault()
        const guessNumber = Number(NewPlayerGuess);
        
        

        if (isNaN(guessNumber)) {
            setError("Please enter a valid number.");
            return;
        }
        if (guessNumber <= 0) {
            setError("Number must be greater than 0.");
            return;
        }
        if (guessNumber >= 100) {
            setError("Number must be less than 100.");
            return;
        }

        setError('');
        onSetPlayerGuess(guessNumber);
        setNewPlayerGuess('');
    };

    return (
        <form onSubmit={handleSumbit}>
            <div className=" col-md-9 offset-md-4 row mb-3">
            <div className="col-4">
                <input className="form-control"
                    type="number"
                    placeholder="Number..."
                    value={NewPlayerGuess}
                    onChange={(e) => setNewPlayerGuess(e.target.value)}
                />
            </div>
            <div className="col-auto">
                <button className=" btn btn-primary  " type="submit">Guess</button>
                </div>
            </div>
            {Error && <p className="text-danger text-center mt-2">{Error}</p>}
        </form>
    );
}
