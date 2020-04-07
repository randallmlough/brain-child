import React from 'react';
import Navbar from '../components/navigation/Navbar';
import Board from '../components/boards/Board';

const BoardDisplay = (props) => {
  const { boardId } = props.match.params;

  return (
    <div className="w-full h-full min-h-screen bg-green-500">
      <div className="w-full transparent-black px-1 py-1">
        <Navbar />
      </div>
      <Board boardId={boardId} />
    </div>
  );
};

export default BoardDisplay;
