export const CREATE_BOARD = gql`
  mutation CreateBoard($name: String!, $user: ID!) {
    createBoard(name: $name, user: $user) {
      success
      message
      board {
        _id
        name
        user
      }
    }
  }
`;
