import {gql} from '@apollo/client';

export const QUERY_MEMBER = gql`
    query member($username: String!) {
        member(username: $username) {
            _id
            firstName
            lastName
            username
            description
            profilePicture
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
                    profilePicture
                }
                numMentees
                menteeCount
                mentees {
                    _id
                    username
                    industry {
                        name
                    }
                }
            }
        }
    }
`;

export const QUERY_MEMBERS = gql`
    query Query {
        members {
            _id
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
                profilePicture
            }
            mentees {
                _id
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

export const QUERY_MENTOR_GROUP_CONVO = gql`
    query MentorGroup($id: ID!) {
        mentorGroup(_id: $id) {
            _id
            mentor {
                _id
                username
                industry{
                    name
                }
                profilePicture
            }
            numMentees
            menteeCount
            mentees {
                _id
                username
                profilePicture
            }
            conversation {
                text
                _id
                creator {
                    username
                    _id
                }
                createdAt
            }
            convoLength
        }
    }
`;