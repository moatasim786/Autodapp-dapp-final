import { gql } from "@apollo/client";

export const SIGN_IN_MUTATION = gql`
    mutation signIn($password: String!, $login: String!){
        signIn(password: $password, login: $login){
            token
        }
    }
`