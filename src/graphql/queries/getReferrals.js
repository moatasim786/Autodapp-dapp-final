import { gql } from "@apollo/client";

export const GET_REFERRALS = gql`
    query getUserReferrals($id: Int!){
        getUserReferrals(id: $id){
            id
            idUser
            bonus
            totalReferral
        }
    }
`