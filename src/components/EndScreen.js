import React from 'react';

const EndScreen = (props) => {
  return (
    <div className={'end-screen ' + (props.hide ? 'hidden' : 'visible')}>
      <div className="end-message">{props.message}</div>
      <button className="restart" onClick={props.restart}>Play again</button>
    </div>
  )
}

export default EndScreen;