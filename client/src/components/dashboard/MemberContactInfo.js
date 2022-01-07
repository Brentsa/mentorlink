import Box from "@mui/system/Box";
import EditSaveButton from "../forms/EditSaveButton";
import { useState } from "react";
import {Formik} from 'formik';
import * as Yup from 'yup';
import { ADD_CONTACT_INFO_TO_MEMBER } from "../../utils/mutations";
import { useMutation } from '@apollo/client';
import Auth from "../../utils/AuthService";
import TextInput from "../forms/TextInput";

export default function MemberContactInfo({member, setMember, bIsUserProfile}){

    //Define a state to determine the editing status of the contact form
    const [bIsEditing, setIsEditing] = useState(false);

    //Define the mutation that will be called to add contact info to the member
    const [addContactInfo, {loading, error}] = useMutation(ADD_CONTACT_INFO_TO_MEMBER);

    //Called when the editing status of the form needs to be toggled
    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    //Submit the contact form function
    function submitContactInfo(values){
        if(bIsEditing){
            //toggle the editing status to change form to readonly
            toggleEdit();

            //call contact info mutation to save the inputted contact info
            addContactInfo({variables: {_id: Auth.getProfile()._id, contactInfo: values}})

            //change the state of the member
            return setMember({...member, contactInfo: values})
        }
        else{
            // if we are not editing then toggle the editing status to change form to edit
            toggleEdit();
        }
    }

    if(loading) return <Box>Loading....</Box>
    if(error) return <Box>Error....</Box>

    return (
        <Box sx={{m:2}}>
            <Formik
                initialValues={{
                    phoneNumber: member?.contactInfo?.phoneNumber || "",
                    email: member?.contactInfo?.email || "", 
                    streetNumber: member?.contactInfo?.streetNumber || "",
                    streetName: member?.contactInfo?.streetName || "", 
                    suiteNumber: member?.contactInfo?.suiteNumber || "", 
                    city: member?.contactInfo?.city || "",
                    province: member?.contactInfo?.province || "",
                    country: member?.contactInfo?.country || "",
                    postalCode: member?.contactInfo?.postalCode || ""
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
                onSubmit={submitContactInfo}
            >   
                {formik => (
                    <Box 
                        component="form"
                        onSubmit={(e)=>{
                            e.preventDefault()
                            formik.handleSubmit();
                        }}
                        sx={{'& .MuiTextField-root': { m: 1, width: '20ch' }}}
                    >
                        <EditSaveButton title="Contact Info" bIsEditing={bIsEditing} bIsUserProfile={bIsUserProfile}/>

                        <Box>
                            <TextInput label="Phone Number" name="phoneNumber" bIsEditing={bIsEditing}/>
                            <TextInput label="Email Address" name="email" type="email" bIsEditing={bIsEditing}/>
                            <TextInput label="Country" name="country" bIsEditing={bIsEditing}/>
                        </Box>

                        <Box>
                            <TextInput label="Street Number" name="streetNumber" bIsEditing={bIsEditing}/>
                            <TextInput label="Street Name" name="streetName" bIsEditing={bIsEditing}/>
                            <TextInput label="Suite Number" name="suiteNumber" bIsEditing={bIsEditing}/>
                        </Box>

                        <Box>
                            <TextInput label="City" name="city" bIsEditing={bIsEditing}/>
                            <TextInput label="Province" name="province" bIsEditing={bIsEditing}/>
                            <TextInput label="Postal Code" name="postalCode" bIsEditing={bIsEditing}/>
                        </Box>

                    </Box>
                )}
            </Formik>
        </Box>
    )
}