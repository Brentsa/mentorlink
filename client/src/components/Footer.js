import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function Footer(){
    return (
        <AppBar position="fixed" color="tertiary" sx={{ top: 'auto', bottom: 0}}>
            <Toolbar>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" component="div">&reg; MentorLink</Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}