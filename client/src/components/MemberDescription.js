import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';

export default function MemberDescription({member, setMember, bIsUserProfile}){

    const [bIsEditing, setIsEditing] = useState(false);

    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    function submitDescriptionForm(values){
        if(bIsEditing){
            toggleEdit();
            return alert(JSON.stringify(values, null, 2));
        }
        else{
            return toggleEdit();
        }
    }

    return (
        <Box sx={{m:2}}>

            <Formik
                initialValues={{description: member.description}}
                validationSchema={Yup.object({description: Yup.string().max(200, "Description cannot be more than 200 characters")})}
                onSubmit={submitDescriptionForm}
            >
                {formik => (
                    <Box
                        component="form"
                        onSubmit={(e)=>{
                            e.preventDefault()
                            formik.handleSubmit();
                        }}
                    >
                        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                            <Typography variant="h5">Description</Typography>
                            {bIsUserProfile ? <Button color="secondary" size="small" sx={{mx: 2}} type="submit">{!bIsEditing ? 'edit' : 'save'}</Button> : null}
                        </Box>
                        {bIsEditing ? 
                            <TextField
                                id="description"
                                label="Description"
                                multiline
                                fullWidth
                                {...formik.getFieldProps("description")}
                                error={formik.touched.description && formik.errors.description ? true : false}
                                helperText={formik.touched.description && formik.errors.description ? formik.errors.description : false}
                            />
                            : 
                            <Typography variant="body2">
                                {formik.values.description}
                            </Typography>    
                        }
                    </Box>
                )}
            </Formik>
        </Box>
    )
}