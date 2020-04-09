import React from 'react';
import { useState } from 'react';

const Card = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { card, index } = props;
  return (
    <div className="px-2 py-1 bg-white rounded shadow-sm my-2 text-sm">
      {card.title}
    </div>
  );
};

export default Card;
