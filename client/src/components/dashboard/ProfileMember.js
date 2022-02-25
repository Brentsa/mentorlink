import Box from "@mui/system/Box";
import MemberDescription from "./MemberDescription";
import MemberContactInfo from "./MemberContactInfo";
import { Chip } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import MemberDetails from "./MemberDetails";

export default function ProfileMember({member, setMember}){

    //return true if the user is a mentor
    function isUserMentor(){
        return member.username === member?.mentorGroup?.mentor?.username;
    }

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            <Box display='flex'>
                <Box sx={{ width: '200px', height: '200px', borderRadius: '50%', border: 1, overflow: 'hidden', m: 2}} flexShrink={0}>
                    {isUserMentor() && <Chip label="Mentor" variant="filled" color="secondary" sx={{m:1, position: 'absolute'}}/>}
                    <CardMedia
                        component="img"
                        image={member.profilePicture ?? `https://i.pravatar.cc/200?u=${member.username}`}
                        alt="member"
                        sx={{width: 200, height: 200, borderRadius: '50%'}}
                    />
                </Box>
                
                <MemberDetails 
                    member={member} 
                    setMember={setMember} 
                />
            </Box>

            <MemberContactInfo  
                member={member} 
                setMember={setMember} 
            />

            <MemberDescription  
                member={member} 
                setMember={setMember}
            />
        </Box>
    )
}