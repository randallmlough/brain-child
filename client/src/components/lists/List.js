import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useState, useRef, useEffect } from 'react';
import Loading from '../ui/Loading';
import Card from '../cards/Card';
import { GET_LIST } from '../../graphql/queries/list';
import CardCreateForm from '../cards/CardCreateForm';

const List = (props) => {
  const { listId } = props;

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

  const [createMode, setCreateMode] = useState(false);
  const ref = useRef(null);

  const { data, loading, error } = useQuery(GET_LIST, {
    variables: {
      listId,
    },
  });

  if (loading) return <Loading />;
  if (!data.list || error) return <h1>List does not exist</h1>;

  const handleClick = (e) => {
    e.preventDefault();
    if (!createMode) {
      setCreateMode(true);
    }
  };

  return (
    <ul className="bg-gray-400 shadow-md p-2 mx-5 rounded list-min-width self-start">
      <li className="word-wrap">{data.list.name}</li>
      {data.list.cards &&
        data.list.cards.map((card) => {
          return <Card card={card} />;
        })}
      <li>
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
      </li>
    </ul>
  );
};

export default List;
