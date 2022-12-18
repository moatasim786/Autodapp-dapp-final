import { gql } from "@apollo/client";

export const CONFIRM_MUTATION = gql`
    mutation confirmMail($confirmCode: Int!){
        confirmMail(confirmCode: $confirmCode ){
            id
        }
    }
`