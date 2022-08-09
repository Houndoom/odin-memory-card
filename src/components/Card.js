import React, { useEffect, useState } from 'react';

const Card = (props) => {

  const img = props.img;
  return (
    <div className="card" data-id={props.num} onClick={props.click}>
      <img src={img} alt={props.name} data-id={props.num} />
      <div className="name" data-id={props.num}>{props.name}</div>
    </div>
  )
}

export default Card;