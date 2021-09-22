import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function LoginForm(){
    return (
        <Box 
            component="form" 
            sx={{
                m: 1,
                p: 2,
                '& .MuiTextField-root': { m: 2, width: '40ch' },
                width: '20%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                border: 1,
                borderColor: 'primary.dark'
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h6">Login</Typography>
            
            <TextField
                required
                id="filled-required"
                label="Username"
                variant="filled"
                color="secondary"
            />

            <TextField
                required
                id="filled-required"
                label="Password"
                variant="filled"
                color="secondary"
                type="password"
            />

            <Button 
                variant="contained"
                color="lightBlue"
            >
                Login
            </Button>
        </Box>
    )
}