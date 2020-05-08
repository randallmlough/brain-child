import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import BoardIndexItem from './BoardIndexItem';
import Loading from '../ui/Loading';
import { CURRENT_USER } from '../../graphql/queries/user';
import BoardCreateFormModal from './BoardCreateFormModal';

const BoardIndex = () => {
  const [showModal, setShowModal] = useState(false);

  const { data, loading, error } = useQuery(CURRENT_USER, {
    fetchPolicy: 'network-only',
  });
  if (loading) return <Loading />;
  if (!data.me.boards || error) return <h1>Boards not found</h1>;

  return (
    <>
      {showModal ? (
        <div className="fixed flex inset-0 justify-center less-transparent-black z-50 h-screen">
          <BoardCreateFormModal
            setShowModal={setShowModal}
            userId={data.me._id}
          />
        </div>
      ) : null}
      <div className="overflow-y-auto h-screen">
        <ul className="flex-wrap content-center items-center mt-8">
          <li className="text-center text-2xl mb-5">Your Boards:</li>
          {data.me.boards &&
            data.me.boards.map((board) => {
              return <BoardIndexItem key={board._id} board={board} />;
            })}
          <li className="flex justify-center my-5">
            <button
              className="py-8 px-10 bg-gray-200 rounded w-2/3 mb-10 focus:outline-none"
              onClick={() => setShowModal(true)}
            >
              Create new board
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default BoardIndex;
