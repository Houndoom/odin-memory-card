import React from 'react';

const Overlay = (props) => {
  return (
    <div className={'overlay ' + (props.hide ? 'hidden' : 'visible')}>
      {props.content}
      <button onClick={props.buttonFunc}>{props.buttonText}</button>
    </div>
  )
}

export default Overlay;