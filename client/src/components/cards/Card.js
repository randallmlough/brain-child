import React from 'react';

const Card = (props) => {
  const { card } = props;
  return (
    <li>
      <div>{card.title}</div>
    </li>
  );
};

export default Card;
