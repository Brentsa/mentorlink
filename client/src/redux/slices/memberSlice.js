import { createSlice } from "@reduxjs/toolkit";

//manage the global state of members to show around the website
export const memberSlice = createSlice({
    name: 'members',
    initialState: {
        currentUser: {},
        loggedIn: false,
        members: []
    },
    reducers: {
        //logged in reducer
        setLoggedIn: (state, action) => {
            //set logged in by giving true or false
            state.loggedIn = action.payload;
        },

        //current user
        loginUser: (state, action) => {
            //save the given user to the payload
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            //delete the user from state
            state.currentUser = {};
        },
        addMenteeGroup: (state, action) => {
            //update the mentorGroup state
            state.currentUser.mentorGroup.mentees = action.payload.mentees;
            state.currentUser.mentorGroup.menteeCount++;
        },
        addMentorGroup: (state, action) => {
            state.currentUser.mentorGroup = action.payload;
        },
        removeMentorGroup: (state) => {
            //remove mentor group from state
            state.currentUser.mentorGroup = null;
        },
        
        //members reducers
        saveMemberQuery: (state, action) => {
            //save the queried members to global state
            state.members = action.payload;
        }
    }
})

export const {
    loginUser, 
    logoutUser,
    addMenteeGroup, 
    setLoggedIn, 
    saveMemberQuery,
    addMentorGroup,
    removeMentorGroup
} = memberSlice.actions;

export default memberSlice.reducer;