import { Box } from "@mui/system"
import MemberCard from "../components/MemberCard"
import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";
import Auth from '../utils/AuthService';

export default function Search(){
    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS);
    console.log(data);

    if(loading) return <Box>Loading...</Box>;

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {data.members.map( (member, i) => 
                //if the iterated member matches the logged in user, don't show their profile in the search
                Auth.getProfile()?.username !== member.username ? <MemberCard member={member} key={i}/> : null 
            )}
        </Box>
    )
}