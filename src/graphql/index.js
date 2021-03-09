import { gql } from "@apollo/client";

export const consult = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;
