import MemberCard from "../components/cards/MemberCard";
import Box from "@mui/system/Box";
import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import { useDispatch } from 'react-redux'
import { saveMemberQuery } from "../redux/slices/memberSlice";
import { useEffect } from "react";
import { switchPage } from "../redux/slices/pageSlice";
import HomeHeader from "../components/layout/HomeHeader";
import { randNumBetween } from "../utils/helpers";

export default function Home(){

    const dispatch = useDispatch();

    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS);

    useEffect(() => {
        if(data) dispatch(saveMemberQuery(data.members))

        //when arriving on the page set the current page state, mainly for logging out state functionality
        dispatch(switchPage("home"));
    })

    //return a random member
    function randomMember(membersArr){
        return membersArr[randNumBetween(0, membersArr.length-1)]
    }

    if(loading) return <Box>Loading...</Box>;

    return (
        <>
            <HomeHeader/>
            <Box sx={{py:6, display: 'flex', justifyContent: 'center'}}>
                <Box sx={{m:4, display: {xs: 'none', lg: 'block'}}}><MemberCard member={randomMember(data.members)}/></Box>
                <Box sx={{m:4, transform: 'scale(1.2)'}}><MemberCard member={randomMember(data.members)}/></Box>
                <Box sx={{m:4, display: {xs: 'none', lg: 'block'}}}><MemberCard member={randomMember(data.members)}/></Box>
            </Box>
        </>
    )
}

