import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CARD_LABEL } from '../../../graphql/mutations/card';

const Labels = ({ card, setShowLabelsModal }) => {
  const [label, setLabel] = useState(card.label);
  const ref = useRef(null);

  const [updateCardLabel, { loading, error }] = useMutation(UPDATE_CARD_LABEL,
    {
      variables: {
        cardId: card._id,
        input: { label }
      }, 
    });

  useEffect(() => {
    if(ref && ref.current){
      const docClick = function (e) {
        if(!ref.current.contains(e.target)){
          setShowLabelsModal(false);
        }
      };
      document.addEventListener('click', docClick);
      return () => {
        document.removeEventListener('click', docClick);
      };
    }
  });

  return(
    <div className="flex justify-center mt-32">
      <div className="w-3/12 bg-black-100" ref={ref}>
        <button onClick={() => {setShowLabelsModal(false)}}>X</button>
        <br />
        <div onClick={() => {
          setLabel('High');
          updateCardLabel();
        }}>High</div>
        <br />
        <div onClick={() => {
          setLabel('Medium');
          updateCardLabel();
        }}
        >Medium</div>
        <br />
        <div onClick={() => {
          setLabel('Low');
          updateCardLabel();
        }}>Low</div>
      </div>
    </div>
  )

}

export default Labels;