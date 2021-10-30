import { Box } from "@mui/system"
import MemberCard from "../components/MemberCard"
import { QUERY_MEMBERS } from "../utils/queries"
import { useQuery } from "@apollo/client";

export default function Search(){
    //when search loads, query members to display
    const {data, loading} = useQuery(QUERY_MEMBERS);
    console.log(data);

    if(loading) return <Box>Loading...</Box>;

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            {data.members.map( member =><MemberCard member={member}/> )}
        </Box>
    )
}