import Box from "@mui/system/Box";
import { isUserProfile } from "../../utils/helpers";
import Typography from "@mui/material/Typography";
import FadeModal from "../misc/FadeModal";
import MemberIndustry from "./MemberIndustry";

export default function MemberDetails({member, setMember}){

    return (
        <Box display='flex' alignContent='center' flexWrap="wrap">
            <Box sx={{m:1}} flexBasis="100%">
                <Typography variant="h4">{member.username}</Typography>
            </Box>

            <Box sx={{m:1}} flexBasis="100%">
                <Typography variant="h5">{isUserProfile(member.username) ? "Welcome, " : ''}{member.firstName} {member.lastName}</Typography>
            </Box>
            
            <Box flexBasis="100%">
                <MemberIndustry
                    member={member} 
                    setMember={setMember}
                />
            </Box>

            {isUserProfile(member.username) && 
                <FadeModal member={member} setMember={setMember}/>
            }
        </Box>
    )
}