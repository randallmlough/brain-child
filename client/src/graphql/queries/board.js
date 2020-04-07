import gql from 'graphql-tag';

export const GET_BOARDS = gql`
  query Boards {
    boards {
      _id
      name
    }
  }
`;

export const GET_BOARD = gql`
  query Board($boardId: ID!) {
    board(id: $boardId) {
      _id
      name
      lists {
        _id
        name
      }
    }
  }
`;
