import React, { useState } from 'react';
import Hangman from '../games/Hangman';
import CardGame from '../games/CardGame';

export default function GamesList() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleSelectHangman = () => {
    setSelectedGame('hangman');
  };

  const handleSelectCardGame = () => {
    setSelectedGame('cardGame');
  };

  return (
    <div>
      <div>
        <button onClick={handleSelectHangman}>Hangman Game</button>
        <button onClick={handleSelectCardGame}>Card Game</button>
      </div>

      <div>
        {selectedGame === 'hangman' && <Hangman />}
        {selectedGame === 'cardGame' && <CardGame />}
      </div>
    </div>
  );
}
