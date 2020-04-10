import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CARD_DESCRIPTION } from '../../../graphql/mutations/card';


const DescriptionEditForm = ( { card, closeEdit } ) => {
  const [description, setDescription] = useState(card.description);
  const ref = useRef(null);

  const [updateCardDescription, {loading, error}] = useMutation(UPDATE_CARD_DESCRIPTION,{
    variables: {
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
          closeEdit();
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
    closeEdit();
  }

  const formContent = (
    <div>
      <form onSubmit={handleSubmit} ref={ref}>
            <textarea 
              placeholder="Add a more detailed description..."
              value={description} 
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
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