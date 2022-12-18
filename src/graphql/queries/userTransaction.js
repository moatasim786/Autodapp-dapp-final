import { gql } from "@apollo/client";

export const USER_TRANSACTION = gql`
   query userTransaction($idUser : Int!) {
       userTransaction(idUser:$idUser) {
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
        }}
`