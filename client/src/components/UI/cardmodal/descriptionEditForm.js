import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CARD_DESCRIPTION } from '../../../graphql/mutations/card';


const DescriptionEditForm = ( { closeEdit, card } ) => {
  const [description, setDescription] = useState(card.description);
  const ref = useRef(null);

  const [updateCardDescription, {loading, error}] = useMutation(UPDATE_CARD_DESCRIPTION,{
    variable: {
      cardId: card._id,
      input: { description }
    },
    onCompleted: ({ updateCard }) => {
      if(updateCard.success){
        closeEdit();
      }
    },
    onError(){}
  });

  useEffect(() => {
    if(ref && ref.current){
      const docClick = function (e) {
        if (!ref.current.contains(e.target)) {
          updateCardDescription();
        }
      };
      document.addEventListener('click', docClick);
      return () => {
        document.removeEventListener('click',docClick);
      };
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateCardDescription();
  }

  const formContent = (
    <div>
      <form onSubmit={handleSubmit} ref={ref}>
        {
          card.description ? 
            <textarea 
              value={card.description} 
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          :
            <textarea
              placeholder="Add a more detailed description..."//whatever is passed in from editCardModal
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
        }
        <input
          type="submit"
          value="Save"
        />
      </form>
      <button onClick={closeEdit}>
        X
      </button>
    </div>
  )

  return formContent;
}

export default DescriptionEditForm;