import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import MemberDescription from "./MemberDescription";
import MemberContactInfo from "./MemberContactInfo";
import MemberIndustry from "./MemberIndustry";

export default function ProfileMember({member, setMember, bIsUserProfile}){

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            <Box display='flex'>
                <Box sx={{ width: '200px', height: '200px', borderRadius: '50%', border: 1, overflow: 'hidden', m: 2}}>
                    <img src={`https://i.pravatar.cc/100?u=${member.username}`} alt='member' width='100%' height='100%'/>  
                </Box>

                <Box display='flex' alignItems='center' flexWrap="wrap">
                    <Box sx={{m:2}} flexBasis="100%">
                        <Typography variant="h3">{bIsUserProfile ? "Welcome, " : ''}{member.firstName} {member.lastName}</Typography>
                    </Box>

                    <Box flexBasis="100%">
                        <MemberIndustry
                            member={member} 
                            setMember={setMember} 
                            bIsUserProfile={bIsUserProfile}
                        />
                    </Box>
                </Box>
                
            </Box>
           

            <MemberContactInfo  
                member={member} 
                setMember={setMember} 
                bIsUserProfile={bIsUserProfile}
            />

            <MemberDescription  
                member={member} 
                setMember={setMember} 
                bIsUserProfile={bIsUserProfile}
            />
        </Box>
    )
}