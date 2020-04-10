import gql from 'graphql-tag';

export const GET_CARDS = gql`
  query Cards {
    cards {
      _id
      title
    }
  }
`;

export const GET_CARD = gql`
  query Card($cardId: ID!) {
    card(id: $cardId) {
      _id
      title
      description
      label
      dueDate
      list{
        _id
      }
    }
  }
`;
