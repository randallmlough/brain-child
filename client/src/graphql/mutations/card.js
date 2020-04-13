import gql from 'graphql-tag';

export const CREATE_CARD = gql`
  mutation CreateCard($title: String!, $list: ID!) {
    createCard(title: $title, list: $list) {
      success
      message
      card {
        _id
        title
      }
    }
  }
`;

export const UPDATE_CARD_TITLE = gql`
  mutation UpdateCardTitle($cardId: ID!, $input: updateCardInput!){
    updateCard(id: $cardId, input: $input){
      success
      message
      card {
        _id
        title
      }
    }
  }
`;

export const UPDATE_CARD_DESCRIPTION = gql`
  mutation UpdateCardDescription($cardId: ID!, $input: updateCardInput!){
    updateCard(id: $cardId, input: $input){
      success
      message
      card {
        _id
        description
      }
    }
  }
`;

export const UPDATE_CARD_LABEL = gql`
  mutation UpdateCardLabel($cardId: ID!, $input: updateCardInput!){
    updateCard(id: $cardId, input: $input){
      success
      message
      card {
        _id
        label
      }
    }
  }
`;

export const UPDATE_CARD_DUEDATE = gql`
  mutation UpdateCardDueDate($cardId: ID!, $input: updateCardInput!){
    updateCard(id: $cardId, input: $input){
      success
      message
      card {
        _id
        dueDate
      }
    }
  }
`;
