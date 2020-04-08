import React, { useState, useEffect } from 'react';
import DescriptionEditForm from './descriptionEditForm';
import Labels from './labels';
import DueDate from './dueDate';
import Icon from '../Icon';

const EditCardModal = ({ showModal, setShowModal, cardName, cardDescription }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [cardTitle, setCardTitle] = useState(cardName);
  const closeModal = () => setShowModal(false);
  const openEdit = () => setShowEdit(true);
  const closeEdit = () => setShowEdit(false);

  const content = (
    <>
      <div className="flex justify-center mt-24">
        <div className="flex flex-col w-11/12 p-4 md:max-w-md mx-auto bg-black-100">
          {/* header container */}
          <div className="flex justify-between">
            <input 
              type="text" 
              value={cardTitle}
              onChange={(e) => setCardTitle(e.currentTarget.value)}
            />
            <button onClick={closeModal}>
              <Icon icon="times" className="text-xl" />
            </button>
          </div>
          {/* main content container */}
          <div className="flex justify-between">
            {/* main column container */}
            <div>
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
            {/* sidebar column container */}
            <div className="flex flex-col">
              <Labels />
              <DueDate />
            </div>
          </div>
        </div>
      </div>
    </>

  )

  return content;

}

export default EditCardModal;