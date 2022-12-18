import { gql } from "@apollo/client";

export const TRANSACTIONS_QUERY = gql`
    query listTransaction{
        listTransaction{
            id
            amount
            date
            details
            currency{
                name
            }
            chainId{
                name
            }
            type{
                id
                name
            }
            user{
                login
                id
            }
        }
    }
`