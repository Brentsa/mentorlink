import { Box } from "@mui/system"
import MemberCard from "../components/cards/MemberCard"
import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import Auth from '../utils/AuthService';
import { useSelector, useDispatch } from 'react-redux'
import { saveMemberQuery } from "../redux/slices/memberSlice";
import { useEffect } from "react";

export default function Search(){

    const dispatch = useDispatch();
    const members = useSelector(state => state.members.members);
    
    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS);
    
    //update the members state once page completes render
    useEffect(() => {
        if(!data) return null
        dispatch(saveMemberQuery(data.members))
    }, [data, dispatch])

    if(loading) return <Box>Loading...</Box>;

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {members.map( (member, i) => 
                //if the iterated member matches the logged in user, don't show their profile in the search
                Auth.getProfile()?.username !== member.username ? <MemberCard member={member} key={i}/> : null 
            )}
        </Box>
    )
}