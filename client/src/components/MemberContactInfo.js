import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import {Formik, useField} from 'formik';
import * as Yup from 'yup';

function TextInput({label, bIsEditing, ...props}){
    const [field, meta] = useField(props);

    return (
        <>
            <TextField 
                label={label}
                color="primary"
                variant="standard"
                margin="dense"
                InputProps={!bIsEditing ? {readOnly: true} : {}}
                {...props}
                {...field}
                error={meta.touched && meta.error ? true : false}
                helperText={meta.touched && meta.error ? meta.error: false}
            />
        </>
    );
};

export default function MemberContactInfo({member, setMember, bIsUserProfile}){

    const [bIsEditing, setIsEditing] = useState(false);

    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    return (
        <Box sx={{m:2}}>
            <Box sx={{display: 'flex', alignItems: 'center', mb:1}}>
                <Typography variant="h5">Contact Info</Typography>
                {bIsUserProfile ? <Button color="secondary" size="small" sx={{mx: 2}} onClick={toggleEdit}>{!bIsEditing ? 'edit' : 'save'}</Button> : null}
            </Box>

            <Formik
                initialValues={{
                    phoneNumber: '9054671111',
                    email: 'test@live.ca', 
                    streetNumber: '',
                    streetName: '', 
                    suiteNumber: '', 
                    city: '',
                    province: '',
                    country: '',
                    postalCode: ''
                }}
                validationSchema={Yup.object({
                    phoneNumber: Yup.string().max(10, 'Cannot be more than 10 numbers.').min(9, 'Cannot be less than 9 numbers.'),
                    email: Yup.string().email('Invalid email address.'), 
                    streetNumber: Yup.string(),
                    streetName: Yup.string(), 
                    suiteNumber: Yup.string(), 
                    city: Yup.string(),
                    province: Yup.string(),
                    country: Yup.string().oneOf(['Canada', 'USA']),
                    postalCode: Yup.string().max(6, 'Cannot be more than 10 characters.').min(5, 'Cannot be less than 5 characters.')
                })}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(()=>{
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400)
                }}
            >
                <Box
                    component='form'
                    sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
                >
                    <TextInput 
                        label="Phone Number"
                        name="phoneNumber"
                        type="text"
                        bIsEditing={bIsEditing}
                    />

                    <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        bIsEditing={bIsEditing}
                    />
                </Box>
            </Formik>
        </Box>
    )
}