import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import MemberCard from "./MemberCard";
import MemberGroup from "./MemberGroup";

export default function ProfileMentor(){
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
            <Box sx={{m:3}}>
                <Typography variant="h5">Your Mentor:</Typography>
                <MemberCard/> 
            </Box>
            
            <Box sx={{m:3}}>
                <Typography variant="h5">Current Mentees:</Typography>
                <MemberGroup/>    
            </Box>
            
        </Box>
    )
}