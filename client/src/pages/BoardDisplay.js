import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Board from '../components/boards/Board';

const BoardDisplay = (props) => {
  const { boardId } = props.match.params;

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Board boardId={boardId} />
    </div>
  );
};

export default BoardDisplay;
