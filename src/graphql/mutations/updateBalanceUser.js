import { gql } from "@apollo/client";

export const UPDATE_USER_BALANCE = gql`
    mutation updateBalance($balance: Int!){
        updateBalance(balance: $balance){
            id
        }
    }
`