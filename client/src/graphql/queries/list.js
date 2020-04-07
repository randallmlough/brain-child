import gql from 'graphql-tag';

export const GET_LISTS = gql`
  query Lists {
    lists {
      _id
      name
    }
  }
`;

export const GET_LIST = gql`
  query List($listId: ID!) {
    list(id: $listId) {
      _id
      name
      cards {
        _id
        title
      }
    }
  }
`;
