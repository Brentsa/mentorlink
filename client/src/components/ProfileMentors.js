import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import MemberCard from "./MemberCard";
import MemberGroup from "./MemberGroup";
import Auth from "../utils/AuthService";
import { Button } from "@mui/material";

export default function ProfileMentor({member, setMember, bIsUserProfile}){

    const group = member?.mentorGroup;
    console.log(group);

    function disbandGroup(){
        return console.log("group disbanded");
    }

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
            {group ? 
                <>
                    {group.mentor.username === Auth.getProfile().username ? 
                        <Button color="secondary" variant="contained" margin="normal" onClick={disbandGroup} sx={{my: 2}}>Disband Your Mentor Group</Button>
                        : 
                        <Box sx={{m:3, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h5">Your Mentor:</Typography>
                            <Box sx={{p:2}}>
                                <MemberCard member={group.mentor}/> 
                            </Box>
                        </Box>
                    }
                    <Box sx={{m:3, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h5">Current Mentees - {group.menteeCount}/{group.numMentees} </Typography>
                        {group.menteeCount > 0 ? 
                            <MemberGroup mentees={group.mentees}/> 
                            :
                            <Box>Add mentees to your mentor group!</Box>
                        }
                    </Box> 
                </>
            : 
                <Box>No Group</Box>
            }
        </Box>
    )
}