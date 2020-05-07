import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CARD_DESCRIPTION } from '../../../graphql/mutations/card';
import Icon from '../Icon';

const DescriptionEditForm = ({ card, closeEdit }) => {
  const [description, setDescription] = useState(card.description);
  const ref = useRef(null);

  const [updateCardDescription, { loading, error }] = useMutation(
    UPDATE_CARD_DESCRIPTION,
    {
      variables: {
        cardId: card._id,
        input: { description },
      },
      onCompleted: ({ updateCard }) => {
        if (updateCard.success) {
          closeEdit();
        }
      },
      onError() {},
    },
  );

  useEffect(() => {
    if (ref && ref.current) {
      const docClick = function (e) {
        if (!ref.current.contains(e.target)) {
          updateCardDescription();
          closeEdit();
        }
      };
      document.addEventListener('click', docClick);
      return () => {
        document.removeEventListener('click', docClick);
      };
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCardDescription();
    closeEdit();
  };

  const formContent = (
    <div>
      <form onSubmit={handleSubmit} ref={ref} className="ml-8">
        <textarea
          placeholder="Add a more detailed description..."
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          className="w-full resize-none h-32 rounded border-primary-400
              border-2 border-solid p-3"
        />
        <input
          type="submit"
          value="Save"
          className="rounded bg-green-500 p-2 text-white mr-2 hover:bg-green-400 cursor-pointer"
        />
        <button onClick={closeEdit}>
          <Icon icon="times" className="text-xl font-hairline" />
        </button>
      </form>
    </div>
  );

  return formContent;
};

export default DescriptionEditForm;
