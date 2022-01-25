import MemberCard from "../components/cards/MemberCard";
import Box from "@mui/system/Box";
import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import { useDispatch } from 'react-redux'
import { saveMemberQuery } from "../redux/slices/memberSlice";
import { useEffect } from "react";
import { switchPage } from "../redux/slices/pageSlice";
import HomeHeader from "../components/layout/HomeHeader";

export default function Home(){

    const dispatch = useDispatch();

    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS);

    useEffect(() => {
        if(data) dispatch(saveMemberQuery(data.members))

        //when arriving on the page set the current page state, mainly for logging out state functionality
        dispatch(switchPage("home"));
    })

    if(loading) return <Box>Loading...</Box>;

    return (
        <>
            <HomeHeader/>
            <Box sx={{py:6, display: 'flex', justifyContent: 'center'}}>
                <Box sx={{m:4, display: {xs: 'none', lg: 'block'}}}><MemberCard member={data.members[1]}/></Box>
                <Box sx={{m:4, transform: 'scale(1.2)'}}><MemberCard member={data.members[0]}/></Box>
                <Box sx={{m:4, display: {xs: 'none', lg: 'block'}}}><MemberCard member={data.members[2]}/></Box>
            </Box>
        </>
    )
}

