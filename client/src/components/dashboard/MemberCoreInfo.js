import Box from "@mui/system/Box";
import { Chip, Paper } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import MemberDetails from "./MemberDetails";
import FadeModal from "../misc/FadeModal";
import { isUserProfile } from "../../utils/helpers";

export default function MemberCoreInfo({member, setMember}){

    //return true if the user is a mentor
    function isUserMentor(){
        return member.username === member?.mentorGroup?.mentor?.username;
    }

    return (
        <Paper 
            elevation={2} 
            component={Box} 
            display='flex' 
            justifyContent={{xs: 'center', sm: 'flex-start'}}
            flexWrap='wrap'
            sx={{bgcolor: 'tertiary.main'}}
            width={{ xs: '100%', sm: 'max-content'}}
        >
            <Box position='relative' sx={{ width: '200px', height: '200px', borderRadius: '50%', border: 1, m: 2}} flexShrink={0}>
                {isUserMentor() && <Chip label="Mentor" variant="filled" color="primary" sx={{position: 'absolute', top: '0px'}}/>}
                {isUserProfile(member.username) && <Box sx={{position: 'absolute', bottom: '0px'}}><FadeModal member={member} setMember={setMember}/></Box>}
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
        </Paper>
    );
}