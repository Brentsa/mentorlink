import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import MemberCard from "./MemberCard";
import MemberGroup from "./MemberGroup";

export default function ProfileMentor({member, setMember, bIsUserProfile}){

    console.log(member?.mentorGroup);
    const group = member?.mentorGroup;

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
            {group ? 
                <>
                    <Box sx={{m:3, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h5">Your Mentor:</Typography>
                        <Box sx={{p:2}}>
                            <MemberCard member={group.mentor}/> 
                        </Box>
                    </Box>
                    <Box sx={{m:3, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h5">Current Mentees:</Typography>
                        <MemberGroup/>    
                    </Box> 
                </>
            : 
                <Box>No Group</Box>
            }
        </Box>
    )
}