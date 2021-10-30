import Box from "@mui/system/Box";
import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_MENTOR_GROUP } from "../utils/mutations";
import { QUERY_GROUP } from "../utils/queries";
import { useEffect } from "react";

export default function CreateGroupForm({member, setMember}){
    
    //define the create mentor group mutation
    const [createMentorGroup] = useMutation(CREATE_MENTOR_GROUP);

    const [queryGroup, {data}] = useLazyQuery(QUERY_GROUP);

    //called when the user clicks to create a mentor group
    async function createGroup(numMentees){
        //create the mentor group and store the data for the group ID
        const data = await createMentorGroup({variables: {mentorId: member._id, numMentees: numMentees, industryId: member.industry._id}});
        const groupId =(data.data.addMentorGroup.group._id);

        //lazy query the group to get the necessary data for state update
        return queryGroup({variables: {_id: groupId}});
    }

    function updateMemberGroupState(){
        //when called, update the current member state's mentorgroup with the queried group or null if not found
        return setMember({...member, mentorGroup: data?.mentorGroup || null});
    }

    //whenever lazy query data changes we update the state of the member to rerender the page
    useEffect(updateMemberGroupState, [data]);

    return (
        <Formik 
            initialValues={{numMentees:5}} 
            validationSchema={Yup.object({numMentees: Yup.number().max(10, "10 mentees max").min(1, "Need at lease 1 mentee")})}
            onSubmit={values => createGroup(values.numMentees)}
        >
            {formik => (
                <Box 
                    component="form" 
                    sx={{display: "flex", alignItems: "center", flexWrap: "wrap"}}
                    onSubmit={e => {
                        e.preventDefault();
                        formik.handleSubmit();
                    }}
                >
                    <Button color="secondary" variant="contained" sx={{m: 2}} type="submit">Become Mentor</Button>
                    <TextField
                        sx={{width: 120}}
                        size="small"
                        id="numMentees"
                        label="# of Mentees"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...formik.getFieldProps('numMentees')}
                        error={formik.touched.numMentees && formik.errors.numMentees ? true : false}
                    />
                    <Typography color="secondary" sx={{mb: 1, width: 0, flexBasis: "100%", textAlign: 'center'}}>{formik.touched.numMentees && formik.errors.numMentees ? formik.errors.numMentees : false}</Typography>
                </Box>
            )}
        </Formik>
    )
}