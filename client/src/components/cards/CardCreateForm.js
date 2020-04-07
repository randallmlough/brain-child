import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { GET_CARDS } from '../../graphql/queries/card';
import { CREATE_CARD } from '../../graphql/mutations/card';
import { GET_LIST } from '../../graphql/queries/list';

const CardCreateForm = ({ listId }) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [createCard, { loading, error }] = useMutation(CREATE_CARD, {
    variables: {
      title,
      list: listId,
    },
    update(cache, { data: { createCard } }) {
      if (createCard.success) {
        const data = cache.readQuery({
          query: GET_LIST,
          variables: {
            listId,
          },
        });
        const list = Object.assign({}, data.list);
        list.cards = list.cards.concat(createCard.card);
        cache.writeQuery({
          query: GET_LIST,
          variables: {
            listId,
          },
          data: {
            list,
          },
        });
      }
      if (!createCard.card) setErrorMessage('Card was not created');
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
            value={title}
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

export default CardCreateForm;
