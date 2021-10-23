import { Box } from "@mui/system"
import MemberCard from "../components/MemberCard"

export default function Search(){
    return (
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
            <MemberCard/>
            <MemberCard/>
            <MemberCard/>
            <MemberCard/>
            <MemberCard/>
            <MemberCard/>
        </Box>
    )
}