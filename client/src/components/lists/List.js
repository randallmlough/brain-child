import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Card from '../cards/Card';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_LIST } from '../../graphql/mutations/list';
import CardCreateForm from '../cards/CardCreateForm';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from '../ui/Icon';
import { GET_BOARD } from '../../graphql/queries/board';

const List = (props) => {
  const { listId, list, boardId } = props;

  const [createMode, setCreateMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const ref = useRef(null);

  const [deleteList, { loading, error }] = useMutation(DELETE_LIST, {
    variables: {
      listId,
    },
    update(cache, { data: { deleteList } }) {
      if (!deleteList.success) setErrorMessage('List was not deleted');
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [
      {
        query: GET_BOARD,
        variables: {
          boardId,
        },
      },
    ],
  });

  useEffect(() => {
    if (ref && ref.current) {
      const documentClick = function (e) {
        if (!ref.current.contains(e.target)) {
          setCreateMode(false);
        }
      };
      document.addEventListener('click', documentClick);
      return () => {
        document.removeEventListener('click', documentClick);
      };
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (!createMode) {
      setCreateMode(true);
    }
  };

  return (
    <Droppable key={listId} droppableId={listId}>
      {(provided, snapshot) => (
        <div
          className={
            snapshot.isDraggingOver
              ? 'bg-success-800 transition duration-500 text-black shadow-md p-2 mx-2 rounded list-min-width self-start'
              : 'bg-gray-300 shadow-lg p-2 mx-2 rounded list-min-width self-start'
          }
          key={listId}
        >
          <div className="flex justify-between">
            <h3>{list.name}</h3>
            <Icon
              className="text-gray-500 text-sm"
              icon="times"
              onClick={() => deleteList()}
            />
          </div>
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-list-height"
          >
            {list.cards.map((card, index) => {
              return (
                <Draggable draggableId={card._id} key={card._id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      key={card._id}
                    >
                      <Card
                        card={card}
                        key={card._id}
                        isDragging={snapshot.isDragging}
                      />
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
          {createMode ? (
            <div ref={ref}>
              <CardCreateForm listId={listId} setCreateMode={setCreateMode} />
            </div>
          ) : (
            <button
              className="focus:outline-none"
              onClick={(e) => handleClick(e)}
            >
              <Icon icon="plus" className="text-sm text-gray-600 mx-1"></Icon>
              <span className="text-gray-600 text-sm">Add a Card</span>
            </button>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default List;
