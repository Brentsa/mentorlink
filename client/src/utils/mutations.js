import {gql} from '@apollo/client';

export const LOGIN = gql`
    mutation loginMember($username: String!, $password: String!) {
        loginMember(username: $username, password: $password) {
            token
            member {
                _id
                firstName
                lastName
                username
                description
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addMember($member: minMemberContent!) {
        addMember(member: $member) {
            token
            member {
                _id
                firstName
                lastName
                username
            }
        }
    }
`;