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
