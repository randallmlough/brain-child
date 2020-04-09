import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState, useRef, useEffect } from 'react';
import Loading from '../ui/Loading';
import Card from '../cards/Card';
import { GET_LIST } from '../../graphql/queries/list';
import CardCreateForm from '../cards/CardCreateForm';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { UPDATE_LIST_CARDS } from '../../graphql/mutations/list';

const List = (props) => {
  const { listId, listName } = props;

  const [createMode, setCreateMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let [cardOrder, setCardOrder] = useState([]);
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

  const { data, loading, error } = useQuery(GET_LIST, {
    variables: {
      listId,
    },
  });

  const mutateOptions = (cards) => ({
    variables: {
      listId,
      input: {
        cards: cards.map((card) => card._id),
      },
    },
    update(cache, { data: { updateList } }) {
      if (!updateList.success) setErrorMessage('Cards not reordered');
      console.log(updateList.list);
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: () => [
      {
        query: GET_LIST,
        variables: {
          listId,
        },
      },
    ],
  });

  const [updateListCards, { loadingMut, errorMut }] = useMutation(
    UPDATE_LIST_CARDS,
  );

  useEffect(() => {
    if (!loading) {
      if (data.list.cards) {
        setCardOrder(data.list.cards);
      }
    }
  });

  if (loading) return <Loading />;
  if (!data.list || error) return <h1>List does not exist</h1>;

  const handleClick = (e) => {
    e.preventDefault();
    if (!createMode) {
      setCreateMode(true);
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    let result = Array.from(list);
    let [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const cards = reorder(
      cardOrder,
      result.source.index,
      result.destination.index,
    );

    setCardOrder(cards);
    updateListCards(mutateOptions(cards));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={listId}>
        {(provided) => (
          <div className="bg-gray-400 shadow-md p-2 mx-5 rounded list-min-width self-start">
            {provided.placeholder}
            <h3>{data.list.name}</h3>
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {cardOrder.map((card, index) => {
                return (
                  <Draggable
                    draggableId={card._id}
                    key={card._id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        key={card._id}
                      >
                        <Card card={card} index={index} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
            </ul>
            {createMode ? (
              <div ref={ref}>
                <CardCreateForm
                  listId={data.list._id}
                  setCreateMode={setCreateMode}
                />
              </div>
            ) : (
              <button onClick={(e) => handleClick(e)}>Add a Card</button>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
