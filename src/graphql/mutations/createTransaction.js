import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation createTransaction($fields:TransactionInput!) {
        createTransaction(fields:$fields) {
             id,
    amount,
    date,
    details,
    idCurrency,
    idChainId,
    idUser,
    idType,
        }
    }
`