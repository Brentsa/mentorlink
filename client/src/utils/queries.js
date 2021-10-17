import {gql} from '@apollo/client';

export const QUERY_MEMBER = gql`
    query member($username: String!) {
        member(username: $username) {
            _id
            firstName
            lastName
            username
            description
            industry {
                _id
                name
            }
            contactInfo {
                _id
                streetNumber
                email
                phoneNumber
                postalCode
                country
                province
                city
                suiteNumber
                streetName
            }
        }
    }
`;

export const QUERY_INDUSTRIES = gql`
    query industries {
        industries {
            _id
            name
        }
    }
`;