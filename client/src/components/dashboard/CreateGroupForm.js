import Box from "@mui/system/Box";
import { Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_MENTOR_GROUP } from "../../utils/mutations";
import { QUERY_GROUP } from "../../utils/queries";
import { useDispatch } from "react-redux";
import { addMentorGroup } from "../../redux/slices/memberSlice";

export default function CreateGroupForm({member, setMember}){

    const dispatch = useDispatch();

    //define the create mentor group mutation
    const [createMentorGroup] = useMutation(CREATE_MENTOR_GROUP);

    //define a lazy query to query the newly created group for full population of the group
    const [queryGroup] = useLazyQuery(QUERY_GROUP, {
        //when the query is completed, update the member state with the new member group data
        onCompleted: data => updateMemberGroupState(data)
    });

    //called when the user clicks to create a mentor group
    async function createGroup(numMentees){
        //create the mentor group and store the group ID for querying
        const data = await createMentorGroup({variables: {mentorId: member._id, numMentees: numMentees, industryId: member.industry._id}});
        const groupId =(data.data.addMentorGroup.group._id);

        //lazy query the group to get the necessary data for state update
        return queryGroup({variables: {_id: groupId}});
    }

    function updateMemberGroupState(memberGroupData){
        //when called, update the current member state's mentorgroup with the queried group or null if not found
        setMember({...member, mentorGroup: memberGroupData?.mentorGroup});

        //update the current member's mentor group for conditional rendering
        dispatch(addMentorGroup(memberGroupData?.mentorGroup));
    }

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