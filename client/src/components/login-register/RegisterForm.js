import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/AuthService';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../redux/slices/memberSlice';

export default function RegisterForm(){

    const dispatch = useDispatch();

    //define history with react router for redirecting user
    const history = useHistory();

    //define a mutation that creates a new user in the back end
    const [addUser] = useMutation(ADD_USER);

    async function formSubmit(values){
        //peel the member credentials off of the values object
        const {username, firstName, lastName, password} = values;

        try{
            //try adding the user via muation, save the token, and then call the front end login function to save token to localstorage
            const addUserResponse = await addUser({variables: {member: {username, firstName, lastName, password}}})
            const {token} = addUserResponse.data.addMember;
            Auth.login(token);

            //set global logged in state to true
            dispatch(setLoggedIn(true));

            //after user has been added and token stored, redirect user to their dashboard
            return history.push(`/dashboard/${Auth.getProfile().username}`);
        }
        catch{
            return console.log('Member not created.');
        }
    }

    return (
        <Formik
            initialValues={{username: '', firstName: '', lastName: '', password: ''}}
            validationSchema={Yup.object({
                username: Yup.string().required('username required').max(20, "cannot be more than 20 characters").trim(),
                firstName: Yup.string().required('first name required').max(20, "cannot be more than 20 characters").trim(),
                lastName: Yup.string().required("last name required").max(20, "cannot be more than 20 characters").trim(),
                password: Yup.string().required('password required').min(8, "password must be at least 8 characters").trim()
            })}
            onSubmit={formSubmit}
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
                    <Typography variant="h5">Register an account</Typography>
                    
                    <TextField
                        required
                        id='username'
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
                        id='firstName'
                        label="First Name"
                        variant="filled"
                        color="primary"
                        type="text"
                        {...formik.getFieldProps('firstName')}
                        error={formik.touched.firstName && formik.errors.firstName ? true : false}
                        helperText={formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : false}
                    />

                    <TextField
                        required
                        id='lastName'
                        label="Last Name"
                        variant="filled"
                        color="primary"
                        type="text"
                        {...formik.getFieldProps('lastName')}
                        error={formik.touched.lastName && formik.errors.lastName ? true : false}
                        helperText={formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : false}
                    />

                    <TextField
                        required
                        id='password'
                        label="Password"
                        variant="filled"
                        color="primary"
                        type="password"
                        autoComplete='new-password'
                        {...formik.getFieldProps('password')}
                        error={formik.touched.password && formik.errors.password ? true : false}
                        helperText={formik.touched.password && formik.errors.password ? formik.errors.password : false}
                    />

                    <Button 
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Register
                    </Button>
                </Box>                 
            )}
        </Formik>
    )
}
