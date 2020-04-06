import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import BoardIndexItem from './BoardIndexItem';
import Loading from '../ui/Loading';

const BoardIndex = () => {
  const { data, loading, error } = useQuery(GET_BOARDS);

  if (!data.boards || error) return <h1>Boards not found</h1>;
  if (loading) return <Loading />;

  return (
    <ul>
      {data.boards &&
        data.boards.map((board) => {
          return <BoardIndexItem board={board} />;
        })}
    </ul>
  );
};

export default BoardIndex;
