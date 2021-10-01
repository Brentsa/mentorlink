import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Message from '../components/Message';
import MiniMemberCard from '../components/MiniMemberCard';

export default function Conversation(){
    return (
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
            <Typography variant="h5">Mentor:</Typography>
            <MiniMemberCard/>
            <Grid container  rowSpacing={2} sx={{my: 4, p: 2, maxHeight: '60vh', bgcolor:'primary.light', overflowY: 'auto', '::-webkit-scrollbar': {display: 'none'}}}>
                <Message bIsUserMessage={true}/>
                <Message bIsUserMessage={false}/>
                <Message bIsUserMessage={true}/>
                <Message bIsUserMessage={false}/>
                <Message bIsUserMessage={true}/>
                <Message bIsUserMessage={false}/>
                <Message bIsUserMessage={true}/>
                <Message bIsUserMessage={false}/>
                <Message bIsUserMessage={false}/>
                <Message bIsUserMessage={false}/>
                <Message bIsUserMessage={true}/>
                <Message bIsUserMessage={true}/>
                <Message bIsUserMessage={true}/>
                <Message bIsUserMessage={true}/>
                <Message bIsUserMessage={true}/>
            </Grid>
        </Box>
    )
}