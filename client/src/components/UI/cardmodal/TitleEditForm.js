import React, { useRef, useEffect, useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CARD_TITLE } from '../../../graphql/mutations/card';

const TitleEditForm = ( { card, closeTitleEdit } ) => {
  const [title, setTitle] = useState(card.title)
  const ref = useRef(null);
  
  const [updateCardTitle, { loading, error }] = useMutation(UPDATE_CARD_TITLE,
    {
      variables: {
        cardId: card._id,
        input: { title }
      },
      onCompleted: ({ updateCard }) => {
        if (updateCard.success) {
          closeTitleEdit();
        }
      },
      onError(){
        closeTitleEdit();
      }
    });

  useEffect(() => {
    if(ref && ref.current){
      const docClick = function (e) {
        if(!ref.current.contains(e.target)){
          updateCardTitle();
        }
      };
      document.addEventListener('click', docClick);
      return () => {
        document.removeEventListener('click', docClick);
      };
    }
  });

  return(
    <form onSubmit={(e) => {
      e.preventDefault();
      updateCardTitle();
    }}>
      <input
        ref={ref} 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      /> 
    </form>
  );
}

export default TitleEditForm;