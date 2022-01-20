import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import MemberDescription from "./MemberDescription";
import MemberContactInfo from "./MemberContactInfo";
import MemberIndustry from "./MemberIndustry";
import { Chip } from "@mui/material";
import { isUserProfile } from "../../utils/helpers";
import ImageUploader from "../forms/ImageUploader";

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
                    <img 
                        src={member.profilePicture ?? `https://i.pravatar.cc/100?u=${member.username}`} 
                        alt='member' 
                        width='auto' 
                        height='200px'
                    />  
                </Box>

                <Box display='flex' alignContent='center' flexWrap="wrap">
                    <Box sx={{m:1}} flexBasis="100%">
                        <Typography variant="h4">{isUserProfile(member.username) ? "Welcome, " : ''}{member.firstName} {member.lastName}</Typography>
                    </Box>
                    
                    <Box flexBasis="100%">
                        <MemberIndustry
                            member={member} 
                            setMember={setMember}
                        />
                    </Box>

                    <ImageUploader member={member}/>
                </Box>
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