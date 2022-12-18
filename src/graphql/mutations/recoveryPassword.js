import { gql } from "@apollo/client";

export const RECOVERY_PASSWORD_MUTATION = gql`
    mutation recoveryPassword($email: String!){
        recoveryPassword(email: $email){
            token
        }
    }
`