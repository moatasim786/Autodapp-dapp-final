import { gql } from "@apollo/client";

export const GET_USER_QUERY = gql`
    query getUser{
        getUser{
            id
            login 
            address
            email 
            partnerLogin
            idReferral
            role
            referralLink
            balance
        }
    }
`