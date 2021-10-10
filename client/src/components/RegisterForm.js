import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/AuthService';

import { Formik } from 'formik';
import * as Yup from 'yup';

export default function RegisterForm(){

    //define a mutation that creates a new user in the back end
    const [addUser, {error}] = useMutation(ADD_USER);

    // async function formSubmit(event){
    //     event.preventDefault();
    //     try{
    //         const addUserResponse = await addUser({variables: {member: {username, firstName, lastName, password}}})
    //         const {token} = addUserResponse.data.addMember;
    //         return Auth.login(token);
    //     }
    //     catch{
    //         return console.log('Member not created.');
    //     }
    // }

    return (
        <Formik
            initialValues={{username: '', firstName: '', lastName: '', password: ''}}
            validationSchema={Yup.object({
                username: Yup.string().required('username required').max(20, "cannot be more than 20 characters").trim(),
                firstName: Yup.string().required('first name required').max(20, "cannot be more than 20 characters").trim(),
                lastName: Yup.string().required("last name required").max(20, "cannot be more than 20 characters").trim(),
                password: Yup.string().required('password required').min(8, "password must be at least 8 characters").trim()
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(()=>{
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400)
            }}
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
                        color="secondary"
                        type="text"
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username ? (<Box>{formik.errors.username}</Box>) : null}

                    <TextField
                        required
                        id='firstName'
                        label="First Name"
                        variant="filled"
                        color="secondary"
                        type="text"
                        {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (<Box>{formik.errors.firstName}</Box>) : null}

                    <TextField
                        required
                        id='lastName'
                        label="Last Name"
                        variant="filled"
                        color="secondary"
                        type="text"
                        {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (<Box>{formik.errors.lastName}</Box>) : null}

                    <TextField
                        required
                        id='password'
                        label="Password"
                        variant="filled"
                        color="secondary"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (<Box>{formik.errors.password}</Box>) : null}

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

// export default function RegisterForm(){

//     //set a state of crendentials that manage the registration form text fields
//     const [credentials, setCredentials] = useState({username: '', firstName: '', lastName: '', password: ''});
//     const {username, firstName, lastName, password} = credentials;

//     const [formError, setFormError] = useState('');

//     //define a mutation that creates a new user in the back end
//     const [addUser, {error}] = useMutation(ADD_USER);

//     function handleChange(event){
//         switch(event.target.id){
//             case 'username':
//                 setCredentials({...credentials, username: event.target.value});
//                 break;
//             case 'firstName':
//                 setCredentials({...credentials, firstName: event.target.value});
//                 break;
//             case 'lastName':
//                 setCredentials({...credentials, lastName: event.target.value});
//                 break;
//             case 'password':
//                 setCredentials({...credentials, password: event.target.value});
//                 break;
//             default:
//                 break;
//         }
//     }

//     function formValidation(){
//         if(!username || !firstName || !lastName || !password){
//             setFormError('Please fill out all fields to create a member');
//         }
//         else{
//             setFormError('');
//         }
//     }

//     async function formSubmit(event){
//         event.preventDefault();

//         if(formError) return console.log('Member not created. Must pass validation.');

//         console.log('did this happen?')

//         try{
//             const addUserResponse = await addUser({variables: {member: {username, firstName, lastName, password}}})
//             const {token} = addUserResponse.data.addMember;
//             return Auth.login(token);
//         }
//         catch{
//             return console.log('Member not created.');
//         }
//     }

//     useEffect(formValidation, [username, firstName, lastName, password]);

//     return (
//         <Box 
//             component="form" 
//             onSubmit={formSubmit}
//             sx={{
//                 m: 2,
//                 p: 2,
//                 '& .MuiTextField-root': { m: 2, width: '40ch' },
//                 minWidth: 360,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 borderRadius: 2,
//                 boxShadow: 3,
//             }}
//             noValidate
//             autoComplete="off"
//         >
//             <Typography variant="h5">Register an account</Typography>
                    
//             <TextField
//                 required
//                 id='username'
//                 label="Username"
//                 variant="filled"
//                 color="secondary"
//                 value={username}
//                 onChange={handleChange}
//             />

//             <TextField
//                 required
//                 id='firstName'
//                 label="First Name"
//                 variant="filled"
//                 color="secondary"
//                 value={firstName}
//                 onChange={handleChange}
//             />

//             <TextField
//                 required
//                 id='lastName'
//                 label="Last Name"
//                 variant="filled"
//                 color="secondary"
//                 value={lastName}
//                 onChange={handleChange}
//             />

//             <TextField
//                 required
//                 id='password'
//                 label="Password"
//                 variant="filled"
//                 color="secondary"
//                 type="password"
//                 value={password}
//                 onChange={handleChange}
//             />

//             {error && <Typography color="secondary" sx={{mb: 1}}>{error.message}</Typography>}
//             {formError && <Typography color="secondary" sx={{mb: 1}}>{formError}</Typography>}

//             <Button 
//                 variant="contained"
//                 color="secondary"
//                 type="submit"
//             >
//                 Register
//             </Button>
//         </Box>
//     )
// }