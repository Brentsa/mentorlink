import {gql} from '@apollo/client';

const LOGIN = gql`
    mutation LoginMemberMutation($loginMemberUsername: String!, $loginMemberPassword: String!) {
        loginMember(username: $loginMemberUsername, password: $loginMemberPassword) {
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

export default {LOGIN};