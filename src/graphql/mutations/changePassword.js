import { gql } from "@apollo/client";

export const CHANGE_PASSWORD_MUTATION = gql`
    mutation changePassword($token: Int!, $newPassword: String!){
        changePassword(token: $token, newPassword: $newPassword ){
            token
        }
    }
`