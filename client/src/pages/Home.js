import MemberCard from "../components/MemberCard";
import Box from "@mui/system/Box";
import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from 'react-redux'
import { saveMemberQuery } from "../redux/slices/memberSlice";
import { useEffect } from "react";
import { switchPage } from "../redux/slices/pageSlice";

export default function Home(){

    const dispatch = useDispatch();
    const members = useSelector(state => state.members.members);
    console.log(members);

    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS);

    useEffect(() => {
        if(data) dispatch(saveMemberQuery(data.members))
        
        //when arriving on the page set the current page state, mainly for logging out state functionality
        dispatch(switchPage("home"));
    })

    if(loading) return <Box>Loading...</Box>;

    return (
        <Box sx={{py:6, display: 'flex', justifyContent: 'center'}}>
            <Box sx={{m:4, display: {xs: 'none', lg: 'block'}}}><MemberCard member={data.members[1]}/></Box>
            <Box sx={{m:4, transform: 'scale(1.2)'}}><MemberCard member={data.members[0]}/></Box>
            <Box sx={{m:4, display: {xs: 'none', lg: 'block'}}}><MemberCard member={data.members[2]}/></Box>
        </Box>
    )
}

