import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { formatDateTime } from '../../utils/helpers';

export default function Message({bIsUserMessage, message}){
    const {text, creator, createdAt} = message;

    return (
        <Grid container item>
            {bIsUserMessage ? (
                <>
                    <Grid item xs></Grid>
                    <Grid item xs='auto' maxWidth='45%' display="flex" flexDirection="column" alignItems="end">
                        <Box sx={{bgcolor: 'tertiary.main', p:1, px:2, borderRadius: 4, borderBottomRightRadius: 0}}>
                            <Typography>{text}</Typography>
                        </Box>
                        <Typography variant='body2'>{formatDateTime(createdAt)}</Typography>
                    </Grid>
                </>
            ) : (
                <>
                    <Grid item xs='auto' maxWidth='45%'>
                        <Typography sx={{ml:2, fontSize: 12}} fontWeight="bold" variant='body2'>{creator.username}</Typography>
                        <Box sx={{bgcolor: 'primary.dark', p:1, px:2, borderRadius: 4, borderBottomLeftRadius: 0}}>
                            <Typography color='contrastText.main'>{text}</Typography>
                        </Box>                            
                        <Typography variant='body2'>{formatDateTime(createdAt)}</Typography>
                    </Grid>
                    <Grid item xs></Grid>
                </>
            )}
        </Grid>
    )
}