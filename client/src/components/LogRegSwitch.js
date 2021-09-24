import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function LogRegSwitch(){

    //check for the path name so that we can render the content differently depending on login or register
    const [page] = useState(window.location.pathname.substring(1))

    return(
        <Box 
            component="div" 
            sx={{
                m: 2,
                mt: 4,
                p: 2,
                width: '20%',
                minWidth: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'darkBlue.main'
            }}
        >
            { page === 'login' ? 
                (<Typography variant="h6" color="tertiary.main">New to MentorLink? Register an account</Typography>):
                (<Typography variant="h6" color="tertiary.main">Already have an account? Login</Typography>)
            }
            
            <Button 
                variant="contained"
                color="secondary"
                component={Link}
                to={page === 'login' ? '/register' : '/login'}
                sx={{mt: 1.5}}
            >
                {page === 'login' ? 'Register' : 'Login'}
            </Button>
        </Box>
    )
}