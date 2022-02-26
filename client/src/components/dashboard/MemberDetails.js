import Box from "@mui/system/Box";
import { isUserProfile } from "../../utils/helpers";
import Typography from "@mui/material/Typography";
import FadeModal from "../misc/FadeModal";
import MemberIndustry from "./MemberIndustry";

export default function MemberDetails({member, setMember}){

    return (
        <Box 
            m={2}
            display='flex'
            flexDirection='column' 
            justifyContent='space-evenly' 
            alignItems={{xs: 'center', sm: 'flex-start'}}
        >
            <Typography marginY={0.5} variant="h4">{member.username}</Typography>

            <Typography marginY={0.5} variant="h5">{isUserProfile(member.username) ? "Welcome, " : ''}{member.firstName} {member.lastName}</Typography>
            
            <MemberIndustry marginY={0.5} member={member} setMember={setMember}/>
        </Box>
    )
}