import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Loading from '../ui/Loading';
import List from '../lists/List';
import ListCreateForm from '../lists/ListCreateForm';
import { GET_BOARD } from '../../graphql/queries/board';

const Board = (props) => {
  const { boardId } = props;

  useEffect(() => {
    if (ref && ref.current) {
      const documentClick = function (e) {
        if (!ref.current.contains(e.target)) {
          setCreateMode(false);
        }
      };
      document.addEventListener('click', documentClick);
      return () => {
        document.removeEventListener('click', documentClick);
      };
    }
  });

  const [createMode, setCreateMode] = useState(false);
  const ref = useRef(null);

  const { data, loading, error } = useQuery(GET_BOARD, {
    variables: {
      boardId,
    },
  });

  if (loading) return <Loading />;
  if (!data.board || error) return <h1>Board does not exist</h1>;

  const handleClick = (e) => {
    e.preventDefault();
    if (!createMode) {
      setCreateMode(true);
    }
  };

  return (
    <ul className="flex mt-10">
      {data.board.lists &&
        data.board.lists.map((list) => {
          return <List listId={list._id} />;
        })}
      <li className="w-1/4">
        {createMode ? (
          <div className="mx-5" ref={ref}>
            <ListCreateForm
              boardId={data.board._id}
              setCreateMode={setCreateMode}
            />
          </div>
        ) : (
          <button
            className="transparent-black py-5 px-20 rounded hover add-list-button mx-5"
            onClick={(e) => handleClick(e)}
          >
            Add a List
          </button>
        )}
      </li>
    </ul>
  );
};

export default Board;
