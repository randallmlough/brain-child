import React from 'react';
import { useState } from 'react';
import EditCardModal from '../ui/cardmodal/EditCardModal';

const Card = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { card } = props;
  return (
    <>
    {showModal ? (
      <div 
      className="fixed inset-0 justify-center less-transparent-black z-50 h-screen"
      >
        <EditCardModal 
          setShowModal={setShowModal}
          card={card}

        />
      </div>
    ) : null
    }
      <li>
        <div 
          className="px-2 py-1 bg-white rounded shadow-sm my-2 text-sm"
          onClick={() => setShowModal(true)}
        >
          {card.title}
        </div>
      </li>
    </>
  );
};

export default Card;
