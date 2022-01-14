import { Box } from "@mui/system"
import MemberCard from "../components/cards/MemberCard"
import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import Auth from '../utils/AuthService';
import { useSelector, useDispatch } from 'react-redux'
import { saveMemberQuery } from "../redux/slices/memberSlice";
import { useEffect } from "react";
import { switchPage } from "../redux/slices/pageSlice";

export default function Search(){

    const dispatch = useDispatch();
    const members = useSelector(state => state.members.members);
    
    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS, {fetchPolicy: "network-only"});
    
    //update the members state once page completes render
    useEffect(() => {
        dispatch(switchPage('search'));
        if(!data) return null;
        return dispatch(saveMemberQuery(data.members))
    }, [data, dispatch])

    if(loading) return <Box>Loading...</Box>;

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {members.map( (member, i) => 
                //if the iterated member matches the logged in user, don't show their profile in the search
                Auth.getProfile()?.username !== member.username && <MemberCard member={member} key={i}/>
            )}
        </Box>
    )
}