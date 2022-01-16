import { useState } from 'react';
import { Box } from "@mui/system"
import MemberCard from "../components/cards/MemberCard"
import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import Auth from '../utils/AuthService';
import { useSelector, useDispatch } from 'react-redux'
import { saveMemberQuery } from "../redux/slices/memberSlice";
import { useEffect } from "react";
import { switchPage } from "../redux/slices/pageSlice";
import { TextField } from '@mui/material';

export default function Search(){

    const dispatch = useDispatch();
    const members = useSelector(state => state.members.members);

    //switch the page tab to search
    dispatch(switchPage('search'));
    
    //search input state
    const [searchInput, setSearchInput] = useState('');
    const [filteredMembers, setFilteredMembers] = useState(members);

    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS, {fetchPolicy: "network-only"});

    //handle search input change by setting the search input state
    function handleChange(e){
        return setSearchInput(e.target.value);
    }

    function onSubmit(e){
        e.preventDefault();

        //set the filtered members by filtering their name and industry name with the search input from the user
        setFilteredMembers(members.filter(member =>
            member.username.toLowerCase().includes(searchInput.toLowerCase()) || 
            member?.industry?.name.toLowerCase().includes(searchInput.toLowerCase())
        ));

        //remove focus from the active search input
        return document.activeElement.blur();
    }
    
    //update the members state once page completes render
    useEffect(() => {
        if(data){
            dispatch(saveMemberQuery(data.members))
            setFilteredMembers(data.members.filter(member => Auth.getProfile()?.username !== member.username));
        }
    }, [data, dispatch])

    if(loading) return <Box>Loading...</Box>;

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Box 
                component="form"
                onSubmit={onSubmit}
                width={{xs: "90vw", sm: "60vw", md:"30vw"}}
                my={1}
            >
                <TextField 
                    id="search-input" 
                    label="Search Members" 
                    type="search" 
                    fullWidth
                    value={searchInput}
                    onChange={handleChange}
                />
            </Box>

            <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 2}}>
                { filteredMembers.length > 0 ?
                    filteredMembers.map((member, i) => <MemberCard member={member} key={i}/>)
                    :
                    "No members found"
                }
            </Box>
        </Box>
    )
}