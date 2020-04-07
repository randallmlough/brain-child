import gql from 'graphql-tag';

export const CREATE_LIST = gql`
  mutation CreateList($name: String!, $board: ID!) {
    createList(name: $name, board: $board) {
      success
      message
      list {
        _id
        name
        cards {
          _id
          title
        }
      }
    }
  }
`;
