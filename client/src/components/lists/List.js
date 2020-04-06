import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useState, useRef } from 'react';
import Loading from '../ui/Loading';
import Card from '../cards/Card';
import CardCreateForm from '../cards/CardCreateForm';

const List = (props) => {
  const { listId } = props.listId;

  const [createMode, setCreateMode] = useState(false);
  const ref = useRef(null);

  const { data, loading, error } = useQuery(GET_LIST, {
    variables: {
      listId,
    },
  });

  if (!data.list || error) return <h1>List does not exist</h1>;
  if (loading) return <Loading />;

  const handleClick = (e) => {
    e.preventDefault();
    if (!createMode) {
      setCreateMode(true);
    }

    const documentClick = function (e) {
      if (!this.ref.current.contains(e.target)) {
        setCreateMode(false);
        document.removeEventListener('click', documentClick);
      }
    };

    document.addEventListener('click', documentClick);
  };

  return (
    <ul>
      {data.list.cards &&
        data.list.cards.map((card) => {
          return <Card card={card} />;
        })}
      <li>
        {createMode ? (
          <CardCreateForm ref={ref} />
        ) : (
          <button onClick={(e) => handleClick(e)}>Add Another List</button>
        )}
      </li>
    </ul>
  );
};

export default List;
