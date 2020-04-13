import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { CREATE_LIST } from '../../graphql/mutations/list';
import { GET_BOARD } from '../../graphql/queries/board';

const ListCreateForm = ({ boardId, setCreateMode }) => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createList, { loading, error }] = useMutation(CREATE_LIST, {
    variables: {
      name,
      board: boardId,
    },
    update(cache, { data: { createList } }) {
      if (createList.success) {
        const data = cache.readQuery({
          query: GET_BOARD,
          variables: {
            boardId,
          },
        });

        const board = Object.assign({}, data.board);
        board.lists = board.lists.concat(createList.list);
        cache.writeQuery({
          query: GET_BOARD,
          variables: {
            boardId,
          },
          data: {
            board,
          },
        });
      }
      if (!createList.success) setErrorMessage('List was not created');
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
  });

  return (
    <>
      {errorMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createList();
          setCreateMode(false);
        }}
      >
        <div className="p-2 bg-gray-400 rounded shadow-md list-min-width">
          <div className="mb-3">
            <label className="sr-only" htmlFor="inputName">
              Name
            </label>
            <input
              id="inputName"
              className="w-full rounded p-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter list title..."
            />
          </div>
          <div>
            <button
              className="text-white bg-success-600 rounded p-2 hover:bg-success-400 transition-all duration-100"
              type="submit"
              disabled={loading}
            >
              Add List
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ListCreateForm;
