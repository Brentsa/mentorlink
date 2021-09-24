import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginForm(){
    return (
        <Box 
            component="form" 
            sx={{
                m: 2,
                p: 2,
                '& .MuiTextField-root': { m: 2, width: '40ch' },
                width: '20%',
                minWidth: 340,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: 'lightBlue.main'
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h5">Login to your account</Typography>
            
            <TextField
                required
                label="Username"
                variant="filled"
                color="secondary"
            />

            <TextField
                required
                label="Password"
                variant="filled"
                color="secondary"
                type="password"
            />

            <Button 
                variant="contained"
                color="secondary"
            >
                Login
            </Button>
        </Box>
    )
}