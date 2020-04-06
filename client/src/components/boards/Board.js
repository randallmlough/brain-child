import React from 'react';
import { useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../ui/Loading';
import List from '../lists/List';
import ListCreateForm from '../lists/ListCreateForm';

const Board = (props) => {
  const boardId = props.boardId;

  const [createMode, setCreateMode] = useState(false);
  const ref = useRef(null);

  const { data, loading, error } = useQuery(GET_BOARD, {
    variables: {
      boardId,
    },
  });

  if (!data.board || error) return <h1>Board does not exist</h1>;
  if (loading) return <Loading />;

  const handleClick = (e) => {
    e.preventDefault();
    if (!createMode) {
      setCreateMode(true);
    }

    const documentClick = function (e) {
      if (!this.ref.current.contains(e.target)) {
        setCreateMode(false);
        document.removeEventListener('click', documentClick);
      }
    };

    document.addEventListener('click', documentClick);
  };

  return (
    <ul>
      {data.board.lists &&
        data.board.lists.map((list) => {
          return <List listId={list._id} />;
        })}
      <li>
        {createMode ? (
          <ListCreateForm ref={ref} />
        ) : (
          <button onClick={(e) => handleClick(e)}>Add Another List</button>
        )}
      </li>
    </ul>
  );
};

export default Board;
