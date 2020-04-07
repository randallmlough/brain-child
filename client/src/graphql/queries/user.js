import gql from 'graphql-tag';

export const CURRENT_USER = gql`
  query CurrentUser {
    me {
      _id
      email
      boards {
        _id
        name
      }
    }
  }
`;

export const IS_LOGGED_IN = gql`
  query IsLoggedIn {
    isLoggedIn @client
  }
`;
