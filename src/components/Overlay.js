import React from 'react';

const Overlay = (props) => {
  return (
    <div className={'overlay ' + (props.hide ? 'hidden' : 'visible')}>
      {props.content}
    </div>
  )
}

export default Overlay;