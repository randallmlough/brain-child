import React, { useState, useEffect } from 'react';
import DescriptionEditForm from './descriptionEditForm';
import Labels from './labels';

const EditCardModal = ({ showModal, setShowModal, cardName, cardDescription }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [cardName, setCardName] = useState(cardName);
  const closeModal = () => setShowModal(false);
  const openEdit = () => setShowEdit(true);
  const closeEdit = () => setShowEdit(false);

  const content = (
    <>
      <div>
        <input 
          type="text" 
          value={cardName}
          onChange={(e) => setCardName(e.currentTarget.value)}
        />
        <button onClick={closeModal}>X</button>
        <Labels />
        <h2>Description</h2>
        <div>
          {
            showEdit ? (
              <DescriptionEditForm 
                closeEdit={closeEdit}
                cardDescription={cardDescription}
              /> 
            ) : cardDescription ? <p onClick={openEdit}>{cardDescription}</p> :
            <p onClick={openEdit}>Add a more detailed description...</p>
          }
        </div>
      </div>
    </>

  )

  return content;

}

export default EditCardModal;