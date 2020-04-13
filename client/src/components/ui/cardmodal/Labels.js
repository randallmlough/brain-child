import React, { useState, useRef, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_CARD_LABEL } from '../../../graphql/mutations/card';
import Icon from '../Icon';

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
      <div className="w-3/12 bg-white rounded" ref={ref}>
        <div className="flex justify-between mx-4 border-b">
          <div></div>
          <h3 className="text-center p-3">
            Labels
          </h3>
          <button 
            onClick={() => {setShowLabelsModal(false)}}
            className="p-3"
          >
            <Icon icon="times" />
          </button>
        </div>
        <div>
          <div className="uppercase p-2 m-2">Labels</div>
          <div onClick={() => {
            setLabel('High');
            updateCardLabel();
          }}
          className="p-2 w-10/12 rounded text-white font-semibold bg-red-500 m-2 text-center cursor-pointer hover:bg-red-400"
          >
            High
          </div>
          <div onClick={() => {
            setLabel('Medium');
            updateCardLabel();
          }}
          className="bg-yellow-400 p-2 w-10/12 rounded font-semibold m-2 text-center text-white cursor-pointer hover:bg-yellow-300"
          >
            Medium
          </div>
          <div onClick={() => {
            setLabel('Low');
            updateCardLabel();
          }}
          className="text-center bg-blue-500 text-white rounded p-2 m-2 w-10/12 font-semibold cursor-pointer hover:bg-blue-400"
          >
            Low
          </div>
        </div>
      </div>
    </div>
  )

}

export default Labels;