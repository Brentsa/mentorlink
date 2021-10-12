import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import MemberDescription from "./MemberDescription";
import MemberContactInfo from "./MemberContactInfo";

export default function ProfileMember({member}){
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            <Box sx={{ width: '200px', height: '200px', borderRadius: '50%', border: 1, overflow: 'hidden', m: 2}}>
                <img src="http://placehold.it/200" alt='member' width='100%' height='100%'/>  
            </Box>

            <Box sx={{m:2}}>
                <Typography variant="h4">Welcome, {member.firstName} {member.lastName}</Typography>
            </Box>

            <Box sx={{m:2}}>
                <Typography variant="h4">Industry</Typography>
            </Box>

            <MemberContactInfo/>

            <MemberDescription description={member.description}/>
        </Box>
    )
}