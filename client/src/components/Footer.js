import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Footer(){
    return (
        <Box sx={{flex: '0 1 auto', width: '100%', display: 'flex', justifyContent: 'center', bgcolor: 'primary.dark'}}>
            <Typography variant="h6" component="div">&reg; MentorLink</Typography>
        </Box>
    );
}
