import Box from "@mui/system/Box";
import MiniMemberCard from "../cards/MiniMemberCard";
import Grid from '@mui/material/Grid';
import { useMutation } from '@apollo/client';
import { REMOVE_MENTEE_FROM_GROUP } from '../../utils/mutations';


export default function MemberGroup({mentees, mentorGroup, bIsUserProfile, setMember, member}){

    const [removeMenteeMutation] = useMutation(REMOVE_MENTEE_FROM_GROUP);

    console.log(mentees)
    
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 2}}>
            <Grid container spacing={2}>
                {mentees.map((mentee, i) => 
                    <Grid item xs={12} md={6} key={i}>
                        <MiniMemberCard 
                            mentorGroup={mentorGroup} 
                            bIsUserProfile={bIsUserProfile}
                            removeMenteeMutation={removeMenteeMutation}
                            setMember={setMember}
                            member={mentee}
                            mentor={member}
                        />
                    </Grid> 
                )}
            </Grid>
        </Box>
    )
}