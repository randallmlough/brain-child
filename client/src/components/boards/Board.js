import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../ui/Loading';
import List from '../lists/List';
import ListCreateForm from '../lists/ListCreateForm';
import { GET_BOARD } from '../../graphql/queries/board';
import { GET_LIST } from '../../graphql/queries/list';
import { DragDropContext } from 'react-beautiful-dnd';
import { UPDATE_LIST_CARDS } from '../../graphql/mutations/list';

const Board = (props) => {
  const { boardId } = props;

  const [createMode, setCreateMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
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

  const { data, loading, error } = useQuery(GET_BOARD, {
    variables: {
      boardId,
    },
  });

  const [updateListCards, { loadingMut, errorMut }] = useMutation(
    UPDATE_LIST_CARDS,
  );

  if (loading) return <Loading />;
  if (!data.board || error) return <h1>Board does not exist</h1>;

  const handleClick = (e) => {
    e.preventDefault();
    if (!createMode) {
      setCreateMode(true);
    }
  };

  const mutateOptions = (listId, cards) => ({
    variables: {
      listId,
      input: {
        cards: cards.map((card) => card._id),
      },
    },
    update(cache, { data: { updateList } }) {
      if (updateList.success) {
        const data = cache.readQuery({
          query: GET_LIST,
          variables: {
            listId,
          },
        });

        const list = Object.assign({}, data.list);
        list.cards = updateList.list.cards;
        cache.writeQuery({
          query: GET_LIST,
          variables: {
            listId,
          },
          data: {
            list,
          },
        });
      }
      if (!updateList.success) setErrorMessage('Cards not reordered');
    },
    onError() {
      setErrorMessage('Something went wrong');
    },
  });

  const move = (lists, source, destination) => {
    const srcListClone = lists.find((list) => list._id === source.droppableId);
    const destListClone =
      source.droppableId === destination.droppableId
        ? srcListClone
        : lists.find((list) => list._id === destination.droppableId);

    const [movedElement] = srcListClone.cards.splice(source.index, 1);
    destListClone.cards.splice(destination.index, 0, movedElement);

    if (source.droppableId === destination.droppableId) {
      return destListClone.cards;
    } else {
      return [srcListClone.cards, destListClone.cards];
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const moveArray = move(data.board.lists, source, destination);
    console.log(moveArray);
    if (source.droppableId === destination.droppableId) {
      const cards = moveArray;
      updateListCards(mutateOptions(source.droppableId, cards));
    } else {
      const srcCards = moveArray[0];
      const destCards = moveArray[1];
      updateListCards(mutateOptions(source.droppableId, srcCards));
      updateListCards(mutateOptions(destination.droppableId, destCards));
    }
  };

  return (
    <>
      {errorMessage}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex align-baseline">
          <ul className="flex mt-10">
            {data.board.lists &&
              data.board.lists.map((list, index) => {
                return (
                  <List
                    key={list._id}
                    list={list}
                    listId={list._id}
                    index={index}
                  />
                );
              })}
          </ul>
          {createMode ? (
            <div className="mx-5 mt-10" ref={ref}>
              <ListCreateForm
                boardId={data.board._id}
                setCreateMode={setCreateMode}
              />
            </div>
          ) : (
            <button
              className="transparent-black py-5 px-20 rounded hover add-list-button mx-5 mt-10"
              onClick={(e) => handleClick(e)}
            >
              Add a List
            </button>
          )}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
