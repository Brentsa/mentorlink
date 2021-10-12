import {gql} from '@apollo/client';

export const QUERY_MEMBER = gql`
    query member($username: String!) {
        member(username: $username) {
            _id
            firstName
            lastName
            username
            description
        }
    }
`;