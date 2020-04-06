import React from 'react';
import { Link } from 'react-router-dom';

const BoardIndexItem = (props) => {
  const { board } = props;
  return (
    <li>
      <Link to={`/boards/${board._id}`}>{board.name}</Link>
    </li>
  );
};

export default BoardIndexItem;
