import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_USER } from '../../graphql/queries/user';

const useCurrentUser = (props) => {
  const { data, loading, error } = useQuery(CURRENT_USER);
  let user;
  if (!data || !data.me) {
    user = null;
  } else {
    user = data.me;
  }
  return [user, loading, error];
};

export default useCurrentUser;
