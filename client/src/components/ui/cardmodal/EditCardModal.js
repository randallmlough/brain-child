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
    },
  });
  if (loading) return 'loading';
  if (error) return 'there is an error';

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'America/Los_Angeles',
  };

  card = data.card;

  const content = (
    <div className="flex justify-center mt-24">
      <div className="flex flex-col p-4 bg-gray-100 rounded-sm w-8/12">
        {/* header container */}
        <div className="flex justify-between">
          <div className="flex w-11/12">
            <Icon icon="window-maximize" className="text-xl mr-2 self-center" />
            {showTitleEdit ? (
              <TitleEditForm card={card} closeTitleEdit={closeTitleEdit} />
            ) : (
              <div onClick={openTitleEdit} className="text-2xl font-medium p-1">
                {card.title}
              </div>
            )}
          </div>
          <button onClick={closeModal}>
            <Icon icon="times" className="text-xl" />
          </button>
        </div>
        {/* main content container */}
        <div className="flex justify-between">
          {/* main column container */}
          <div className="w-9/12 px-2">
            <div className="flex ml-8">
              {card.label ? (
                <div className="mr-1 pr-2">
                  <h3 className="uppercase">Labels</h3>
                  <div
                    onClick={() => setShowLabelsModal(true)}
                    className="bg-gray-300 hover:bg-black-100 rounded-sm box-border cursor-pointer p-1 text-center"
                  >
                    {card.label}
                  </div>
                </div>
              ) : null}
              {card.dueDate ? (
                <div className="ml-1">
                  <h3 className="uppercase">Due Date</h3>
                  <div
                    onClick={() => setShowDatePicker(true)}
                    className="bg-gray-300 hover:bg-black-100 rounded-sm box-border cursor-pointer p-1"
                  >
                    {new Intl.DateTimeFormat('en-Us', options).format(
                      card.dueDate,
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex">
              <Icon icon="bars" className="text-xl self-center mr-2" />
              <h2 className="text-xl font-medium p-1">Description</h2>
            </div>
            <div>
              {showEdit ? (
                <DescriptionEditForm card={card} closeEdit={closeEdit} />
              ) : card.description ? (
                <p onClick={openEdit} className="ml-8 cursor-pointer">
                  {card.description}
                </p>
              ) : (
                <p onClick={openEdit} className="ml-8 cursor-pointer">
                  Add a more detailed description...
                </p>
              )}
            </div>
          </div>
          {/* sidebar column container */}
          <div className="flex flex-col w-3/12 px-2">
            {showLabelsModal ? (
              <div className="fixed inset-0 justify-center z-50 h-screen shadow-lg p-2">
                <Labels card={card} setShowLabelsModal={setShowLabelsModal} />
              </div>
            ) : null}
            <div
              onClick={() => setShowLabelsModal(true)}
              className="bg-gray-300 hover:bg-black-100 rounded p-2 mb-1 cursor-pointer"
            >
              <Icon icon="tag" className="mx-2 text-white" />
              Labels
            </div>
            {showDatePicker ? (
              <div className="fixed inset-0 justify-center z-50 h-screen">
                <DueDate card={card} setShowDatePicker={setShowDatePicker} />
              </div>
            ) : null}
            <div
              onClick={() => setShowDatePicker(true)}
              className="bg-gray-300 rounded p-2 mt-1 hover:bg-black-100 cursor-pointer"
            >
              <Icon icon="clock" className="text-white mx-2" />
              Due Date
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
};

export default EditCardModal;
