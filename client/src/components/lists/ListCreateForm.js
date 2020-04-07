import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { CREATE_LIST } from '../../graphql/mutations/list';
import { GET_LISTS } from '../../graphql/queries/list';

const ListCreateForm = ({ boardId }) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createList, { loading, error }] = useMutation(CREATE_LIST, {
    variables: {
      title,
      board: boardId,
    },
    update(cache, { data }) {
      console.log(data);
      // if (!list) setErrorMessage('List was not created');
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [{ query: GET_LISTS }],
  });

  return (
    <>
      {errorMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createList();
        }}
      >
        <div className="mb-3">
          <label className="sr-only" htmlFor="inputTitle">
            Title
          </label>
          <input
            id="inputTitle"
            className=""
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title..."
          />
        </div>
        <div>
          <button className="" type="submit" disabled={loading}>
            Add List
          </button>
        </div>
      </form>
    </>
  );
};

export default ListCreateForm;
