import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

export default function Message({bIsUserMessage, text}){
    return (
        <Grid container item>
            {bIsUserMessage ? (
                <>
                    <Grid item xs></Grid>
                    <Grid item xs='auto' maxWidth='45%'>
                        <Box sx={{bgcolor: 'tertiary.main', p:2, borderRadius: 2, borderBottomRightRadius: 0}}>
                            <Typography>{text}</Typography>
                        </Box>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid item xs='auto' maxWidth='45%'>
                        <Box sx={{bgcolor: 'primary.dark', p:2, borderRadius: 2, borderBottomLeftRadius: 0}}>
                            <Typography color='contrastText.main'>{text}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs></Grid>
                </>
            )}
        </Grid>
    )
}