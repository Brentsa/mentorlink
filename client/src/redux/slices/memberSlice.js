import { createSlice } from "@reduxjs/toolkit";

//manage the global state of members to show around the website
export const memberSlice = createSlice({
    name: 'members',
    initialState: {
        members: []
    },
    reducers: {
        saveMemberQuery: (state, action) => {
            //save the queried members to global state
            state.members = action.payload;
        }
    }
})

export const {saveMemberQuery} = memberSlice.actions;

export default memberSlice.reducer;