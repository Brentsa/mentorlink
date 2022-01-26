import Box from "@mui/system/Box";
import MiniMemberCard from "../cards/MiniMemberCard";
import { useMutation } from '@apollo/client';
import { REMOVE_MENTEE_FROM_GROUP } from '../../utils/mutations';


export default function MemberGroup({mentees, mentorGroup, bIsUserProfile, setMember, member}){

    const [removeMenteeMutation] = useMutation(REMOVE_MENTEE_FROM_GROUP);

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 2}}>
                {mentees.map((mentee, i) => 
                        <MiniMemberCard
                            mentorGroup={mentorGroup} 
                            bIsUserProfile={bIsUserProfile}
                            removeMenteeMutation={removeMenteeMutation}
                            setMember={setMember}
                            member={mentee}
                            mentor={member}
                        />
                )}
        </Box>
    )
}