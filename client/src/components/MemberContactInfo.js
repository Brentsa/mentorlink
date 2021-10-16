import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import {Formik} from 'formik';
import * as Yup from 'yup';

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
                {formik => (
                    <Box
                        component='form'
                        onSubmit={formik.handleSubmit}
                        sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}}
                    >
                        <TextField 
                            id="phoneNumber"
                            label="Phone Number"
                            color="primary"
                            variant="standard"
                            type="text"
                            margin="dense"
                            InputProps={!bIsEditing ? {readOnly: true} : {}}
                            {...formik.getFieldProps("phoneNumber")}
                            error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ? formik.errors.phoneNumber : false}
                        />

                        <TextField 
                            id="email"
                            label="Email"
                            color="primary"
                            variant="standard"
                            type="email"
                            margin="dense"
                            InputProps={!bIsEditing ? {readOnly: true} : {}}
                            {...formik.getFieldProps("email")}
                            error={formik.touched.email && formik.errors.email ? true : false}
                            helperText={formik.touched.email && formik.errors.email ? formik.errors.email : false}
                        />
                    </Box>
                )}
            </Formik>
        </Box>
    )
}