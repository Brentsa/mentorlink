import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MiniMemberCard from '../cards/MiniMemberCard';
import { MemberChip } from '../cards/MemberChip';

export function ConversationHeader({group}){

    return (
        <Box display="flex">
            <Box marginX={1}>
                <Typography variant="h5">Mentor:</Typography>
                <MiniMemberCard member={group?.mentor} industry={group?.mentor?.industry?.name}/>
            </Box>
            <Box marginX={1}>
                <Typography variant="h5">Mentees:</Typography>
                <Box display="flex" flexWrap="wrap" maxHeight="8rem" maxWidth="28rem">
                    {group &&
                        group.mentees.map((mentee, id) => <MemberChip mentee={mentee} key={id}/>)
                    }
                </Box>
            </Box>
        </Box>
    )
}