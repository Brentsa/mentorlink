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
import { TextField, Typography } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Slider from '@mui/material/Slider';

export default function Search(){

    const dispatch = useDispatch();
    const members = useSelector(state => state.members.members);

    //switch the page tab to search
    dispatch(switchPage('search'));
    
    //search input state
    const [searchInput, setSearchInput] = useState('');
    const [filteredMembers, setFilteredMembers] = useState(members);

    //states for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage, setMembersPerPage] = useState(6);
    const [pageCount, setPageCount] = useState(0)

    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS, {fetchPolicy: "network-only"});

    //handle search input change by setting the search input state
    function handleChange(e){
        return setSearchInput(e.target.value);
    }

    function perPageChange(e){
        if(e.target.value < 4 || e.target.value > 20) return; 
        return setMembersPerPage(e.target.value);
    }

    //called when the search input is submitted
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

    //function for pagination, change the displayed pagination change
    function paginationChange(e, page){
        return setCurrentPage(page);
    }
    
    //update the members state once page completes render
    useEffect(() => {
        if(data){
            dispatch(saveMemberQuery(data.members));
            setFilteredMembers(data.members.filter(member => Auth.getProfile()?.username !== member.username));
        }
    }, [data, dispatch])

    useEffect(()=>{
        setCurrentPage(1);
        setPageCount(Math.ceil(filteredMembers.length/membersPerPage));
    }, [filteredMembers, membersPerPage])

    if(loading) return <Box>Loading...</Box>;

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Box 
                component="form"
                display='flex'
                onSubmit={onSubmit}
                width={{xs: "94vw", sm: "60vw", md:"30vw"}}
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

            <Box display="flex" flexDirection="column" alignItems="center" marginY={1.5}>
                <Typography variant='body2'>Members Per Page: {membersPerPage}</Typography>
                <Slider
                    defaultValue={6}
                    step={1}
                    onChange={perPageChange}
                    marks
                    min={2}
                    max={20}
                    sx={{width: '300px'}}
                />
            </Box>
            
            <Pagination count={pageCount} page={currentPage} color='secondary' onChange={paginationChange}/>
            
            <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", mt: 2}}>
                { filteredMembers.length > 0 ?
                    filteredMembers
                        .slice((currentPage - 1) * membersPerPage, ((currentPage - 1) * membersPerPage) + membersPerPage)
                        .map((member, i) => <MemberCard member={member} key={i}/>)
                    :
                    "No members found"
                }
            </Box>
        </Box>
    )
}