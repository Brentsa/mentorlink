import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useMutation } from "@apollo/client";
import { UPDATE_MEMBER } from "../utils/mutations";
import Auth from "../utils/AuthService";

export default function MemberDescription({member, setMember, bIsUserProfile}){

    //set the editing state of the description field
    const [bIsEditing, setIsEditing] = useState(false);

    //define the mutation to update the member
    const [updateMember] = useMutation(UPDATE_MEMBER);

    //toggle the description editing state
    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    //submit the description 
    function submitDescriptionForm(values){
        if(bIsEditing){
            toggleEdit();

            //update the member's description in the descripton field
            updateMember({variables: {id: Auth.getProfile()._id, member:{description: values.description}}});

            //update the state of the member in the profile to match
            return setMember({...member, description: values.description});
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
                            <Typography variant="body2" sx={{whiteSpace: "pre-line"}}>
                                {formik.values.description}
                            </Typography>    
                        }
                    </Box>
                )}
            </Formik>
        </Box>
    )
}