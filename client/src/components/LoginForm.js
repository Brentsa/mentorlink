import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useMutation } from '@apollo/client';
import {LOGIN} from '../utils/mutations';
import Auth from '../utils/AuthService';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router';

export default function LoginForm(){

    //define history to redirect user using react router
    const history = useHistory();

    //define the mutation to login a user
    const [loginMutation, {error}] = useMutation(LOGIN);

    async function submitLoginForm(values){
        //destructure username and password from the form
        const {username, password} = values;
        
        try{
            //try calling the login mutation in the backend with the credentials entered by the user
            const loginResponse = await loginMutation({variables: {username, password}});

            //if there is success then peel the token off of the response
            const {token} = loginResponse.data.loginMember;
            
            //Call the login function from auth service to store the token in localStorage and redirect the user
            Auth.login(token);

            //Once logged in and token is stored, redirect user to the dashboard
            history.push(`/dashboard/${Auth.getProfile().username}`);
        }
        catch(error){
            console.log('Member login failed.');
        }
    }

    return (
        <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={Yup.object({
                username: Yup.string().required('username required').max(20, "cannot be more than 20 characters").trim(),
                password: Yup.string().required('password required').min(8, "password must be at least 8 characters").trim()
            })}
            onSubmit={submitLoginForm}
        >
            {formik => (
                <Box 
                    component="form"
                    onSubmit={formik.handleSubmit}
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
                >
                    <Typography variant="h5">Login to your account</Typography>
                    
                    <TextField
                        required
                        id="username"
                        label="Username"
                        variant="filled"
                        color="primary"
                        type="text"
                        {...formik.getFieldProps('username')}
                        error={formik.touched.username && formik.errors.username ? true : false}
                        helperText={formik.touched.username && formik.errors.username ? formik.errors.username : false}
                    />
        
                    <TextField
                        required
                        id="password"
                        label="Password"
                        variant="filled"
                        color="primary"
                        type="password"
                        {...formik.getFieldProps('password')}
                        error={formik.touched.password && formik.errors.password ? true : false}
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : false}
                    />
        
                    {error && <Typography color="secondary" sx={{mb: 1}}>{error.message}</Typography>}
        
                    <Button 
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Login
                    </Button>
                </Box>
            )}
        </Formik>
    )
}