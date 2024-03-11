import React, { useState } from "react";
import words from "./words.json";

function getRandomWord(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

export default function Hangman() {
	const [wordToGuess, setWordToGuess] = useState(getRandomWord(words));
	const [guessedLetters, setGuessedLetters] = useState([]);
	const incorrectLetters = guessedLetters.filter(
		(letter) => !wordToGuess.includes(letter)
	);

	const isLoser = incorrectLetters.length >= 6;
	const isWinner = wordToGuess
		.split("")
		.every((letter) => guessedLetters.includes(letter));

	const addGuessedLetter = (letter) => {
		if (!guessedLetters.includes(letter)) {
			setGuessedLetters((currentLetters) => [...currentLetters, letter]);
		}
	};

	const restartGame = () => {
		setWordToGuess(getRandomWord(words));
		setGuessedLetters([]);
	};

	const displayWord = () => {
		return wordToGuess
			.split("")
			.map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
			.join(" ");
	};

	return (
		<div className="flex flex-col max-w-full justify-center items-center  py-20 mx-80 border-solid border-2 border-black">
	
			<h1>Hangman</h1>
			<p>{displayWord()}</p>
			<p>Incorrect Letters: {incorrectLetters.join(", ")}</p>
			{!isLoser && (
				<input
				type="text"
				value={""} // bind this to a state if you want to capture user input
				onChange={(e) => addGuessedLetter(e.target.value)}
				maxLength={1}
				/>
			)}
			{isWinner && <p>YOU ARE A WINNER</p>}
			{isLoser && <p>YOU ARE A LOSER <br />. The word to be guessed was {wordToGuess} </p>}

			<button onClick={restartGame}>Restart Game</button>

		</div>
	);
}
