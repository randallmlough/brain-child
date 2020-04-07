import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import BoardIndexItem from './BoardIndexItem';
import Loading from '../ui/Loading';
import { CURRENT_USER } from '../../graphql/queries/user';

const BoardIndex = () => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  if (loading) return <Loading />;
  if (!data.me.boards || error) return <h1>Boards not found</h1>;

  return (
    <ul>
      {data.me.boards &&
        data.me.boards.map((board) => {
          return <BoardIndexItem board={board} />;
        })}
      <li>
        <button className="py-8 px-10 bg-gray-200 rounded">
          Create new board
        </button>
      </li>
    </ul>
  );
};

export default BoardIndex;
