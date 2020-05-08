import React from 'react';
import { useState } from 'react';
import EditCardModal from '../ui/cardmodal/EditCardModal';

const Card = (props) => {
  const { card, isDragging } = props;

  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 justify-center less-transparent-black z-20 h-screen">
          <EditCardModal setShowModal={setShowModal} card={card} />
        </div>
      ) : null}
      <div
        className={
          isDragging

            ? 'px-2 py-1 bg-yellow-300 rounded shadow-lg my-2 text-sm grab-pointer transform rotate-10'
            : 'px-2 py-1 bg-white rounded shadow my-2 text-sm'
        }
        onClick={() => setShowModal(true)}
      >
        {card.title}
      </div>
    </>
  );
};

export default Card;
