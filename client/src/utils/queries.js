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
            mentorGroup {
                _id
                mentor {
                    username
                    industry {
                        name
                    }
                    description
                }
                numMentees
                menteeCount
                mentees {
                    username
                }
            }
        }
    }
`;

export const QUERY_MEMBERS = gql`
    query Query {
        members {
            firstName
            lastName
            username
            description
            profilePicture
            industry {
                _id
                name
            }
            mentorGroup {
                _id
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

export const QUERY_GROUP = gql`
    query Query($_id: ID!) {
        mentorGroup(_id: $_id) {
            _id
            mentor {
                _id
                firstName
                lastName
                username
            }
            numMentees
            menteeCount
            industry {
                _id
                name
            }
        }
    }
`;