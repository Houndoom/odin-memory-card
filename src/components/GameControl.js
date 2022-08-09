import React, { useState, useRef } from 'react';
import ScoreDisplay from './ScoreDisplay';
import Gameboard from './Gameboard';
import EndScreen from './EndScreen';

const GameControl = () => {

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [hideEnd, setHideEnd] = useState(true);
  const [endMessage, setEndMessage] = useState('');
  
  const scoreRef = useRef(score);
  scoreRef.current = score;

  const historyRef = useRef(history);
  historyRef.current = history;

  function _increaseScore() {
    setScore(score => score + 1);
    setMaxScore(maxScore => Math.max(maxScore, scoreRef.current));
  }
  
  const selectCard = (e) => {
    const id = parseInt(e.target.getAttribute('data-id'));
    if (!historyRef.current.includes(id) && (historyRef.current.length < 150)) {
      _increaseScore();
      setHistory(history => [...history, id]);
    } else if (!historyRef.current.includes(id)) {
      _increaseScore();
      setHideEnd(false);
      setEndMessage('YOU WIN!')
    } else {
      setHideEnd(false);
      setEndMessage('YOU LOSE')
    }
  }

  const restart = (e) => {
    setScore(0);
    setHistory([]);
    setHideEnd(true);
  }

  return (
    <div className="game-control">
      <EndScreen hide={hideEnd} restart={restart} message={endMessage} />
      <ScoreDisplay score={score} maxScore={maxScore} />
      <Gameboard selectCard={selectCard} />
    </div>
  )
};

export default GameControl;