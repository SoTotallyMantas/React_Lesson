import React, { use, useState } from 'react';
import GuessForm from "./GuessForm";
import Message from "./Message";

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}



export default function () {
    const [Guess, setGuess] = useState(getRandomInt(1,100));
    const [GuessCount, setGuessCount] = useState(1);
    const [Feedback, setFeedback] = useState("");
    const [GuessFeedback, setGuessFeedback] = useState("");
    const [GameStatus, setGameStatus] = useState("Playing");

    const ResetGame = () => {
        window.location.reload();
    }
    const TryGuess = (FormNumber) => {


        
        if (FormNumber == Guess) {
            setGuessCount(0);
            setFeedback("You Win correct number was " + Guess); 
            setGameStatus("Won");
        }
        else {
            setGuessCount(GuessCount + 1);

            FormNumber > Guess ? setFeedback("Lower") : setFeedback("Higher");
            setGuessFeedback("Attempted Tries: " + GuessCount);
            setGameStatus("Playing");
        }

    }
    
    


    return (
        <div className="row align-items-start">
            <h2>Guessing Game</h2>
            <GuessForm onSetPlayerGuess={TryGuess} />
            <div className="col-md-6 offset-md-3">
                <div>
                    <Message onfeedback={Feedback} />
                </div>
                <div>
                <Message onfeedback={GuessFeedback} />
            </div>
            </div>
            {GameStatus == "Playing" ? null : <button onClick={ResetGame}> Reset</button> }
        </div>
    );
}