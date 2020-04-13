import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useState, useEffect, useRef } from 'react';
import { GET_BOARD } from '../../graphql/queries/board';
import { EDIT_BOARD_NAME } from '../../graphql/mutations/board';

const BoardNameEditForm = ({ boardId, boardName, setEditMode }) => {
  const [name, setName] = useState(boardName);
  const [errorMessage, setErrorMessage] = useState('');
  const ref = useRef(null);

  const [editBoardName, { loading, error }] = useMutation(EDIT_BOARD_NAME, {
    variables: {
      boardId,
      input: {
        name: name,
      },
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [{ query: GET_BOARD, variables: { boardId } }],
  });

  useEffect(() => {
    if (ref && ref.current) {
      const documentClick = function (e) {
        if (!ref.current.contains(e.target)) {
          setEditMode(false);
          if (boardName !== name) {
            editBoardName();
          }
        }
      };
      document.addEventListener('click', documentClick);
      return () => {
        document.removeEventListener('click', documentClick);
      };
    }
  });

  return (
    <>
      {errorMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (boardName !== name) {
            editBoardName();
          }
          setEditMode(false);
        }}
      >
        <div className="mb-3">
          <label className="sr-only" htmlFor="inputName">
            Name
          </label>
          <input
            id="inputName"
            className="border-2 focus:border-primary-300 focus:outline-none text-black"
            type="text"
            value={name}
            ref={ref}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </form>
    </>
  );
};

export default BoardNameEditForm;
