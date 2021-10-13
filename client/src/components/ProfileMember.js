import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import MemberDescription from "./MemberDescription";
import MemberContactInfo from "./MemberContactInfo";
import MemberIndustry from "./MemberIndustry";

export default function ProfileMember({member, bIsUserProfile}){

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            <Box sx={{ width: '200px', height: '200px', borderRadius: '50%', border: 1, overflow: 'hidden', m: 2}}>
                <img src="http://placehold.it/200" alt='member' width='100%' height='100%'/>  
            </Box>

            <Box sx={{m:2}}>
                <Typography variant="h4">{bIsUserProfile ? "Welcome, " : ''}{member.firstName} {member.lastName}</Typography>
            </Box>

            <MemberIndustry industry={member.industry.name} bIsUserProfile={bIsUserProfile}/>

            <MemberContactInfo bIsUserProfile={bIsUserProfile}/>

            <MemberDescription description={member?.description} bIsUserProfile={bIsUserProfile}/>
        </Box>
    )
}