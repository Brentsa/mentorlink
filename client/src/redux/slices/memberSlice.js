import { createSlice } from "@reduxjs/toolkit";

//manage the global state of members to show around the website
export const memberSlice = createSlice({
    name: 'members',
    initialState: {
        currentUser: {},
        members: []
    },
    reducers: {
        //current user reducers
        loginUser: (state, action) => {
            //save the given user to the payload
            state.currentUser = action.payload;
        },
        logoutUser: (state) => {
            //delete the user from state
            state.currentUser = {};
        },
        //members reducers
        saveMemberQuery: (state, action) => {
            //save the queried members to global state
            state.members = action.payload;
        }
    }
})

export const {loginUser, logoutUser, saveMemberQuery} = memberSlice.actions;

export default memberSlice.reducer;