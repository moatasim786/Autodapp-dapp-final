import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
    mutation signUp($fields: UserInput!){
        signUp(fields: $fields){
            id
            login
            address
            email
            partnerLogin
            idReferral
            role
            password
            token
            referralLink
        }
    }
`