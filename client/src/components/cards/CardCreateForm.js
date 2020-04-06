import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';

export default () => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createCard, { loading, error }] = useMutation(CREATE_CARD, {
    variables: {
      title,
    },
    update(cache, { data: { card } }) {
      if (!card) setErrorMessage('Card was not created');
      // perhaps rewrite cache?
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [{ query: GET_CARDS }],
  });

  return (
    <>
      {errorMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCard();
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
            value={email}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this card..."
          />
        </div>
        <div>
          <button className="" type="submit" disabled={loading}>
            Add Card
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateCardForm;
