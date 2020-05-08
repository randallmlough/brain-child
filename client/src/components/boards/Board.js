import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Loading from '../ui/Loading';
import List from '../lists/List';
import ListCreateForm from '../lists/ListCreateForm';
import BoardNameEditForm from './BoardNameEditForm';
import { GET_BOARD } from '../../graphql/queries/board';
import { GET_LIST } from '../../graphql/queries/list';
import { DragDropContext } from 'react-beautiful-dnd';
import { UPDATE_LIST_CARDS } from '../../graphql/mutations/list';

const Board = (props) => {
  const { boardId } = props;

  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
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

  const [updateListCards2, { loadingMut2, errorMut2 }] = useMutation(
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
    onError() {
      setErrorMessage('Something went wrong');
    },
    refetchQueries: [{ query: GET_LIST, variables: { listId } }],
  });

  const move = (lists, source, destination) => {
    const srcListClone = lists.find((list) => list._id === source.droppableId);
    const destListClone = lists.find(
      (list) => list._id === destination.droppableId,
    );

    const [movedElement] = srcListClone.cards.splice(source.index, 1);
    destListClone.cards.splice(destination.index, 0, movedElement);

    return [srcListClone.cards, destListClone.cards];
  };

  const reorder = (lists, source, destination) => {
    const listClone = lists.find((list) => list._id === source.droppableId);
    const [movedElement] = listClone.cards.splice(source.index, 1);
    listClone.cards.splice(destination.index, 0, movedElement);

    return listClone.cards;
  };

  const onDragEnd = async (result) => {
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

    if (destination.droppableId === source.droppableId) {
      const cards = reorder(data.board.lists, source, destination);
      await updateListCards(mutateOptions(source.droppableId, cards));
    } else {
      const moveArray = move(data.board.lists, source, destination);
      const srcCards = moveArray[0];
      const destCards = moveArray[1];
      await updateListCards(mutateOptions(source.droppableId, srcCards));
      await updateListCards2(mutateOptions(destination.droppableId, destCards));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="mt-4 mx-5 text-white text-xl w-full">
          {editMode ? (
            <BoardNameEditForm
              boardId={data.board._id}
              boardName={data.board.name}
              setEditMode={setEditMode}
            />
          ) : (
            <h3 onClick={() => setEditMode(true)}>{data.board.name}</h3>
          )}
        </div>
        <div className="flex align-baseline">
          <ul className="flex mt-8">
            {data.board.lists.map((list, index) => {
              return (
                <List
                  key={list._id}
                  boardId={data.board._id}
                  list={list}
                  listId={list._id}
                  index={index}
                />
              );
            })}
          </ul>
          <div className="mr-5 mt-8">
            {createMode ? (
              <div className="mx-2" ref={ref}>
                <ListCreateForm
                  boardId={data.board._id}
                  setCreateMode={setCreateMode}
                />
              </div>
            ) : (
              <button
                className="transparent-black py-5 px-10 rounded hover list-min-width add-list-button mx-2 focus:outline-none"
                onClick={(e) => handleClick(e)}
              >
                Add a List
              </button>
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
