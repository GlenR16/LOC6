import React, { useState } from 'react';
import Hangman from '../games/Hangman';
import CardGame from '../games/CardGame';
import TicTacToe from '../games/TicTacToe';

export default function GamesList() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectHangman = () => {
    setSelectedGame('hangman');
  };

  const handleSelectCardGame = () => {
    setSelectedGame('cardGame');
  };
  
  const handleSelectTicTacToeGame = () => {
    setSelectedGame('tictactoe');
  };

  return (
    <div>
      <div>
        <button onClick={handleSelectHangman}>Hangman Game</button>
        <button onClick={handleSelectCardGame}>Card Game</button>
        <button onClick={handleSelectTicTacToeGame}>Tic Tac Toe Game</button>
      </div>

      <div>
        {selectedGame === 'hangman' && <Hangman />}
        {selectedGame === 'cardGame' && <CardGame />}
        {selectedGame === 'tictactoe' && <TicTacToe />}
        {}
      </div>
    </div>
  );
}
