import { gql } from "@apollo/client";

export const VERIFY_CONTRACT = gql`
    mutation verifyContract($data: JSON!) {
        verifyContract(data: $data) {
            id,
        }
    }
`