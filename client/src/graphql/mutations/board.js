import gql from 'graphql-tag';

export const CREATE_BOARD = gql`
  mutation CreateBoard($name: String!, $user: ID!) {
    createBoard(name: $name, user: $user) {
      success
      message
      board {
        _id
        name
        user {
          _id
        }
      }
    }
  }
`;

export const EDIT_BOARD_NAME = gql`
  mutation UpdateBoardName($boardId: ID!, $input: updateBoardInput!) {
    updateBoard(id: $boardId, input: $input) {
      success
      message
      board {
        _id
        name
      }
    }
  }
`;
