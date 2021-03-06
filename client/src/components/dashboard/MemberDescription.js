import Box from "@mui/system/Box";
import { useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useMutation } from "@apollo/client";
import { UPDATE_MEMBER } from "../../utils/mutations";
import Auth from "../../utils/AuthService";
import EditSaveButton from "../forms/EditSaveButton";
import TextInput from "../forms/TextInput";
import { isUserProfile } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { openAndSetMessage } from "../../redux/slices/snackbarSlice";
import { Paper } from "@mui/material";


export default function MemberDescription({member, setMember}){

    const dispatch = useDispatch();

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
            updateDatabaseAndState(values);
        }
        else{
            return toggleEdit();
        }
    }

    //call mutation to update the database and then update the member's state
    function updateDatabaseAndState(values){
        //update the member's description in the descripton field
        updateMember({variables: {id: Auth.getProfile()._id, member:{description: values.description}}});

        //update the state of the member in the profile to match
        setMember({...member, description: values.description});

        //Set snack bar success message and open it
        dispatch(openAndSetMessage("Description Update Successful"))
    }

    return (
        <Paper
            component={Box}
            padding={2}
            elevation={2}
            sx={{bgcolor: "tertiary.main"}}
        >
            <Formik
                initialValues={{description: member?.description ?? ''}}
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
                        <EditSaveButton title="Description" bIsEditing={bIsEditing} bIsUserProfile={isUserProfile(member.username)}/>

                        <TextInput
                            name="description"
                            id="description"
                            variant="filled"
                            label="Description Text"
                            multiline
                            fullWidth
                            bIsEditing={bIsEditing}
                        />

                    </Box>
                )}
            </Formik>
        </Paper>
    )
}