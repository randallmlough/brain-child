import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { CREATE_CARD } from '../../graphql/mutations/card';
import { GET_LIST } from '../../graphql/queries/list';

const CardCreateForm = ({ listId, setCreateMode }) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createCard, { loading, error }] = useMutation(CREATE_CARD, {
    variables: {
      title,
      list: listId,
    },
<<<<<<< HEAD
=======
    // update(cache, { data: { createCard } }) {
    //   if (createCard.success) {
    //     const data = cache.readQuery({
    //       query: GET_LIST,
    //       variables: {
    //         listId,
    //       },
    //     });
    //     const list = Object.assign({}, data.list);
    //     list.cards = list.cards.concat(createCard.card);
    //     cache.writeQuery({
    //       query: GET_LIST,
    //       variables: {
    //         listId,
    //       },
    //       data: {
    //         list,
    //       },
    //     });
    //   }
    //   if (!createCard.card) setErrorMessage('Card was not created');
    // },
>>>>>>> master
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [{ query: GET_LIST, variables: { listId } }],
  });

  return (
    <>
      {errorMessage}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCard();
          setCreateMode(false);
        }}
      >
        <div className="mb-3">
          <label className="sr-only" htmlFor="inputTitle">
            Title
          </label>
          <input
            id="inputTitle"
            className="w-full rounded p-2"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this card..."
          />
        </div>
        <div>
          <button
            className="text-white bg-success-600 rounded p-2 hover:bg-success-400 transition-all duration-100"
            type="submit"
            disabled={loading}
          >
            Add Card
          </button>
        </div>
      </form>
    </>
  );
};

export default CardCreateForm;
