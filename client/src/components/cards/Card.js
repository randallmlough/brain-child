import React from 'react';
import { useState } from 'react';

const Card = (props) => {
  const { card, isDragging } = props;
  return (
    <div
      className={
        isDragging
          ? 'px-2 py-1 bg-yellow-300 rounded shadow-lg my-2 text-sm'
          : 'px-2 py-1 bg-white rounded shadow-sm my-2 text-sm'
      }
    >
      {card.title}
    </div>
  );
};

export default Card;
