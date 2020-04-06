import React from 'react';
import { useState } from 'react';

const Card = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { card } = props;
  return (
    <li>
      <div>{card.title}</div>
    </li>
  );
};

export default Card;
