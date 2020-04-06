import React from 'react';
import { useApolloClient } from '@apollo/react-hooks';

export default (props) => {
  const client = useApolloClient();
  return (
    <button
      className={props.className}
      onClick={() => {
        client.resetStore();
      }}
    >
      Log Out
    </button>
  );
};
