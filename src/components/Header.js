import React, { useState } from 'react';
import Overlay from './Overlay';

const Header = () => {

  const [hideEnd, setHideEnd] = useState(true); // Show/hide end screen

  const showInstructions = () => {
    setHideEnd(false);
  }

  // Close button event
  const close = (e) => {
    setHideEnd(true);
  }

  const instructions = ([
    <div className="instructions-text">
      <h1>Instructions</h1>
      <ol>
        <li>The gameboard has cards displaying different Pokémon.</li>
        <li>Each round requires you to select one card, that you have not previously selected.</li>
        <li>The cards will be randomly shuffled each time you select a card.</li>
        <li>If you select a card that you previously selected, you lose the game.</li>
        <li>If you manage to select all the Pokémon without repeating, you win the game.</li>
      </ol>
    </div>,
    <button onClick={close}>Close</button>
  ])

  return (
    <div className="header">
      Pokemon Memory Cards
      <button className="instructions" onClick={showInstructions}>
        Show instructions
      </button>
      <Overlay hide={hideEnd} content={instructions} />
    </div>
  )
}

export default Header;