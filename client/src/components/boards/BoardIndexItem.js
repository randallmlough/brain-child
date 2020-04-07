import React from 'react';
import { Link } from 'react-router-dom';

const BoardIndexItem = (props) => {
  const { board } = props;
  return (
    <li className="flex justify-center">
      <Link className="text-white w-2/3" to={`/boards/${board._id}`}>
        <div className="text-center my-2 bg-primary-200 p-8 hover:bg-primary-100 transition-all duration-150 rounded">
          {board.name}
        </div>
      </Link>
    </li>
  );
};

export default BoardIndexItem;
