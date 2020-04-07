import React from 'react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATE_BOARD } from '../../graphql/mutations/board';
import { CURRENT_USER } from '../../graphql/queries/user';
import Icon from '../ui/Icon';

const BoardCreateFormModal = (props) => {
  const { setShowModal, userId } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');

  const [createBoard, { loading, error }] = useMutation(CREATE_BOARD, {
    variables: {
      name,
      user: userId,
    },
    update(cache, { data: { createBoard } }) {
      if (!createBoard.success) setErrorMessage('Board was not created');
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [{ query: CURRENT_USER }],
  });

  return (
    <div className="mt-24">
      <div className="">
        <div className="flex justify-end mb-2">
          <button
            className="focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <Icon icon="times" className="text-white text-xl" />
          </button>
        </div>
        {errorMessage}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createBoard();
            setShowModal(false);
          }}
        >
          <div className="mb-3">
            <label className="sr-only" htmlFor="inputName">
              Name
            </label>
            <input
              id="inputName"
              className="rounded p-5"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter board title..."
            />
          </div>
          <div>
            <button
              className="text-white bg-success-600 rounded p-2 hover:bg-success-400 transition-all duration-100"
              type="submit"
              disabled={loading}
            >
              Add Board
            </button>
          </div>
        </form>
      </div>
      {/* <div class="less-transparent-black absolute inset-0 z-30"></div> */}
    </div>
  );
};

export default BoardCreateFormModal;
