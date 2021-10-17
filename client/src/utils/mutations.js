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
    mutation addContactInfo($addContactInfoId: ID!, $addContactInfoContactInfo: contactInfoContent!) {
        addContactInfo(_id: $addContactInfoId, contactInfo: $addContactInfoContactInfo) {
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