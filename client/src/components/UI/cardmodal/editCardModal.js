import React, { useState, useEffect } from 'react';
import DescriptionEditForm from './DescriptionEditForm';
import { useQuery } from '@apollo/react-hooks';
import Labels from './Labels';
import DueDate from './DueDate';
import Icon from '../Icon';
import TitleEditForm from './TitleEditForm';
import { GET_CARD } from '../../../graphql/queries/card';

const EditCardModal = ({ setShowModal, card }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showTitleEdit, setShowTitleEdit] = useState(false);
  const [showLabelsModal, setShowLabelsModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const closeModal = () => setShowModal(false);
  const openEdit = () => setShowEdit(true);
  const closeEdit = () => setShowEdit(false);
  const openTitleEdit = () => setShowTitleEdit(true);
  const closeTitleEdit = () => setShowTitleEdit(false);

  const cardId = card._id;
  const { data, loading, error } = useQuery(GET_CARD, {
    variables: {
      cardId,
    }
  })
  if(loading) return "loading";
  if(error) return "there is an error";

  card = data.card;

  const content = (
    <>
      <div className="flex justify-center mt-24">
        <div className="flex flex-col w-11/12 p-4 md:max-w-md mx-auto bg-black-100">
          {/* header container */}
          <div className="flex justify-between">
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
                      card={card}
                      closeEdit={closeEdit}
                    /> 
                  ) : card.description ? <p onClick={openEdit}>{card.description}</p> :
                  <p onClick={openEdit}>Add a more detailed description...</p>
                }
              </div>
            </div>
            {/* sidebar column container */}
            <div className="flex flex-col">
              {
                showLabelsModal ? (
                  <div
                    className="fixed inset-0 justify-center z-50 h-screen"
                  >
                    <Labels
                      card={card}
                      setShowLabelsModal={setShowLabelsModal}
                    />
                  </div>
                ) : null
              }
              <div
                onClick={() => setShowLabelsModal(true)}
              >
                Labels
              </div>
              {
                showDatePicker ? (
                  <div
                    className="fixed inset-0 justify-center z-50 h-screen"
                  >
                    <DueDate 
                      card={card}
                      setShowDatePicker={setShowDatePicker}
                    />
                  </div>
                ) : null
              }
              <div
                onClick={() => setShowDatePicker(true)}
              >
                Due Date
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )

  return content;

}

export default EditCardModal;