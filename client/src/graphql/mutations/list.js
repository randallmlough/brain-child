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

export const DELETE_LIST = gql`
  mutation Delete_List($listId: ID!) {
    deleteList(id: $listId) {
      success
      message
    }
  }
`;

export const UPDATE_LIST_CARDS = gql`
  mutation UpdateListCards($listId: ID!, $input: updateListInput!) {
    updateList(id: $listId, input: $input) {
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
