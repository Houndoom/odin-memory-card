import React, { useState, useRef } from 'react';
import ScoreDisplay from './ScoreDisplay';
import Gameboard from './Gameboard';
import Overlay from './Overlay';

const GameControl = () => {

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [history, setHistory] = useState([]); // Array of selected pokemon
  const [hideEnd, setHideEnd] = useState(true); // Show/hide end screen
  const [endScreen, setEndScreen] = useState(); // Win/lose message
  
  // To obtain updated references of state
  const scoreRef = useRef(score);
  scoreRef.current = score;

  const historyRef = useRef(history);
  historyRef.current = history;

  function _increaseScore() {
    const currScore = scoreRef.current;
    setScore(score => score + 1);
    setMaxScore(maxScore => Math.max(maxScore, currScore + 1));
  }
  
  const setEndMessage = (msg) => {
    setEndScreen([
      <div className='end-message'>{msg}</div>, 
      <button onClick={restart}>Play Again</button>
    ])
  }

  const selectCard = (e) => {
    const id = parseInt(e.target.getAttribute('data-id'));
    if (!historyRef.current.includes(id) && (historyRef.current.length < 150)) { // Success, if the history doesn't contain the selected Pokemon, and not all have been selected
      _increaseScore();
      setHistory(history => [...history, id]);
    } else if (!historyRef.current.includes(id)) { // win: length = 150
      _increaseScore();
      setHideEnd(false);
      setEndMessage('YOU WIN');
    } else { // lose, if the history already contains the selected Pokemon
      setHideEnd(false);
      setEndMessage('YOU LOSE');
    }
  }

  // Restart button event
  const restart = (e) => {
    setScore(0);
    setHistory([]);
    setHideEnd(true);
  }

  return (
    <div className="game-control">
      <Overlay hide={hideEnd} content={endScreen} />
      <ScoreDisplay score={score} maxScore={maxScore} />
      <Gameboard selectCard={selectCard} />
    </div>
  )
};

export default GameControl;