import Box from "@mui/system/Box";
import MemberDescription from "./MemberDescription";
import MemberContactInfo from "./MemberContactInfo";
import MemberCoreInfo from "./MemberCoreInfo";

export default function ProfileMember({member, setMember}){

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            <MemberCoreInfo
                member={member} 
                setMember={setMember} 
            />

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