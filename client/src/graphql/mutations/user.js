import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LogIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      _id
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      _id
      token
    }
  }
`;
