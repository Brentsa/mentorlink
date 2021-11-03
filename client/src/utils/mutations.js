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

export const ADD_INDUSTRY_TO_MEMBER = gql`
    mutation addIndustryToMember($memberId: ID!, $industryId: ID!) {
        addIndustryToMember(memberId: $memberId, industryId: $industryId) {
            _id
            firstName
            lastName
            industry {
                _id
                name
            }
        }
    }
`; 

export const ADD_CONTACT_INFO_TO_MEMBER = gql`
    mutation addContactInfo($_id: ID!, $contactInfo: contactInfoContent!) {
        addContactInfo(_id: $_id, contactInfo: $contactInfo) {
            _id
            username
            contactInfo {
                phoneNumber
                email
                streetNumber
                streetName
                suiteNumber
                city
                province
                country
                postalCode
            }
        }
    }
`;

export const UPDATE_MEMBER = gql`
    mutation Mutation($id: ID!, $member: minMemberContent!) {
        updateMember(_id: $id, member: $member) {
            _id
            firstName
            lastName
            username
            description
        }
    }
`;

export const DELETE_MENTOR_GROUP = gql`
    mutation deleteMentorGroup($groupId: ID!) {
        deleteMentorGroup(groupId: $groupId) {
            mentor {
                _id
                firstName
                lastName
            }
            group {
                _id
            }
        }
    }
`;

export const CREATE_MENTOR_GROUP = gql`
    mutation addMentorGroup($mentorId: ID!, $numMentees: Int!, $industryId: ID!){
        addMentorGroup(mentorId: $mentorId, numMentees: $numMentees, industryId: $industryId){
            mentor {
                _id
            }
            group {
                _id
                mentor {
                    _id
                }
                numMentees
                industry {
                    _id
                    name
                }
            }
        }
    }
`;

export const ADD_MENTEE_TO_GROUP = gql`
    mutation AddMenteeToGroupMutation($groupId: ID!, $menteeId: ID!) {
        addMenteeToGroup(groupId: $groupId, menteeId: $menteeId) {
            _id
            mentor {
                _id
            }
            mentees {
                _id
            }
        }
    }
`;