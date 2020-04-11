import React from 'react';
import { useState, useRef, useEffect } from 'react';
import Card from '../cards/Card';
import CardCreateForm from '../cards/CardCreateForm';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const List = (props) => {
  const { listId, list } = props;

  const [createMode, setCreateMode] = useState(false);
  const ref = useRef(null);

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
              ? 'transparent-black text-black shadow-md p-2 mx-5 rounded list-min-width self-start'
              : 'bg-gray-300 shadow-md p-2 mx-5 rounded list-min-width self-start'
          }
          key={listId}
        >
          <h3>{list.name}</h3>
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
            <button onClick={(e) => handleClick(e)}>Add a Card</button>
          )}
        </div>
      )}
    </Droppable>
  );
};

export default List;
