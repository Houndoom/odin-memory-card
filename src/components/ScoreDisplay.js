import React from 'react';

const ScoreDisplay = (props) => {
  return (
    <div className="score-display">
      <div className="score">
        Score: {props.score}
      </div>
      <div className="score">
        Max score: {props.maxScore}
      </div>
    </div>
  )
}

export default ScoreDisplay;