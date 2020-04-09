import React, { useState, useEffect } from 'react';
import DescriptionEditForm from './DescriptionEditForm';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Labels from './Labels';
import DueDate from './DueDate';
import Icon from '../Icon';
import { UPDATE_CARD } from '../../../graphql/mutations/card';
import TitleEditForm from './TitleEditForm';

const EditCardModal = ({ setShowModal, card }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const closeModal = () => setShowModal(false);
  const openEdit = () => setShowEdit(true);
  const closeEdit = () => setShowEdit(false);
  const openTitleEdit = () => setShowTitleEdit(true);
  const closeTitleEdit = () => setShowTitleEdit(false);

  const content = (
    <>
      <div className="flex justify-center mt-24">
        <div className="flex flex-col w-11/12 p-4 md:max-w-md mx-auto bg-black-100">
          {/* header container */}
          <div className="flex justify-between">
            {/* <input 
              type="text" 
              value={cardTitle}
              onChange={(e) => setCardTitle(e.currentTarget.value)}
            /> */}
            {
              showTitleEdit ? (
                <TitleEditForm
                  card={card}
                  closeTitleEdit={closeTitleEdit}
                />
              ) : <span onClick={openTitleEdit}>{card.title}</span>
            }
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
                      card={card}
                    /> 
                  ) : card.description ? <p onClick={openEdit}>{card.description}</p> :
                  <p onClick={openEdit}>Add a more detailed description...</p>
                }
              </div>
            </div>
            {/* sidebar column container */}
            <div className="flex flex-col">
              <div>Labels</div>
              <div>Due Date</div>
              {/* <Labels />
              <DueDate /> */}
            </div>
          </div>
        </div>
      </div>
    </>

  )

  return content;

}

export default EditCardModal;