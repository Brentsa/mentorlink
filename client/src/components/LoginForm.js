import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {LOGIN} from '../utils/mutations';


export default function LoginForm(){

    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [loginMutation, {loading, error}] = useMutation(LOGIN);

    function textFieldOnChange(event){
        switch(event.target.id){
            case "username":
                setCredentials({...credentials, username: event.target.value});
                break;
            case "password":
                setCredentials({...credentials, password: event.target.value});
                break;
            default:
                break;
        }
        return;
    }

    async function submitLoginForm(event){
        event.preventDefault();
        console.log(credentials);
        try{
            const loginResponse = await loginMutation({variables: {username: credentials.username, password: credentials.password}});
            console.log(loginResponse.data);
        }
        catch(error){
            console.log(error);
        }
    }

    if(loading) return "Loading..."
    if(error) return "Error..."

    return (
        <Box 
            component="form"
            onSubmit={submitLoginForm}
            sx={{
                m: 2,
                p: 2,
                '& .MuiTextField-root': { m: 2, width: '40ch' },
                minWidth: 360,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: 2,
                boxShadow: 3,
            }}
            noValidate
            autoComplete="off"
        >
            <Typography variant="h5">Login to your account</Typography>
            
            <TextField
                required
                id="username"
                label="Username"
                variant="filled"
                color="secondary"
                value={credentials.username}
                onChange={textFieldOnChange}
            />

            <TextField
                required
                id="password"
                label="Password"
                variant="filled"
                color="secondary"
                type="password"
                value={credentials.password}
                onChange={textFieldOnChange}
            />

            <Button 
                variant="contained"
                color="secondary"
                type="submit"
            >
                Login
            </Button>
        </Box>
    )
}