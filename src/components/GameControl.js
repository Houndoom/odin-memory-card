import React, { useEffect, useState, useRef } from 'react';
import ScoreDisplay from './ScoreDisplay';
import Gameboard from './Gameboard';

const GameControl = () => {

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [history, setHistory] = useState([]);
  
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
    if (!historyRef.current.includes(id)) {
      console.log('plus');
      _increaseScore();
      setHistory(history => [...history, id]);
    } else {
      console.log('Clear');
      setScore(0);
      setHistory([]);
    }
  }

  return (
    <div className="game-control">
      <ScoreDisplay score={score} maxScore={maxScore}/>
      <Gameboard selectCard={selectCard} />
    </div>
  )
};

export default GameControl;