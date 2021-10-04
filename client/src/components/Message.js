import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

export default function Message({bIsUserMessage}){
    return (
        <Grid container item>
            {bIsUserMessage ? (
                <>
                    <Grid item xs></Grid>
                    <Grid item xs='auto' maxWidth='45%'>
                        <Box sx={{bgcolor: 'tertiary.main', p:2, borderRadius: 2}}>
                            <Typography>Welcome to MentorLink!</Typography>
                        </Box>
                    </Grid>
                </>
                
            ) : (
                <>
                    <Grid item xs='auto' maxWidth='45%'>
                        <Box sx={{bgcolor: 'primary.dark', p:2, borderRadius: 2}}>
                            <Typography color='contrastText.main'>Welcome to MentorLink! Why thank you so much! What can we do here then? Oh wow this is huge. what the fuck bro....</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs></Grid>
                </>
            )}
        </Grid>
    )
}