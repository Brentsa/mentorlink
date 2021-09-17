const typeDef = `
    type ContactInfo{
        _id: ID
        phoneNumber: String
        email: String
        streetNumber: String
        streetName: String
        suiteNumber: String
        city: String
        province: String
        country: String
        postalCode: String
    }

    type Member{
        _id: ID
        firstName: String
        lastName: String
        username: String
        password: String
        description: String
        profilePicture: String
        industry: Industry
        mentorGroup: MentorGroup
        contactInfo: ContactInfo
    }

    type AuthMember{
        token: ID!
        member: Member
    }

    type MemberAndMentorGroup{
        mentor: Member
        group: MentorGroup
    }

    input minMemberContent{
        firstName: String
        lastName: String
        username: String
        password: String
        description: String
        profilePicture: String
    }

    input contactInfoContent{
        phoneNumber: String
        email: String
        streetNumber: String
        streetName: String
        suiteNumber: String
        city: String
        province: String
        country: String
        postalCode: String
    }
`

module.exports = typeDef