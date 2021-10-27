import Box from "@mui/system/Box";
import { TextField, Typography } from "@mui/material";
import MemberCard from "./MemberCard";
import MemberGroup from "./MemberGroup";
import Auth from "../utils/AuthService";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_MENTOR_GROUP } from "../utils/mutations";
import { Formik } from "formik";
import * as Yup from 'yup';

export default function ProfileMentor({member, setMember, bIsUserProfile}){

    //Destructure mentor group from the member profile
    const group = member?.mentorGroup;
    console.log(group);

    console.log(member?.username);
    console.log(Auth.getProfile()?.username);

    //Initialize a mutation to delete a mentor group
    const [deleteMentorGroup] = useMutation(DELETE_MENTOR_GROUP);

    //called when the user clicks the disband group button
    function disbandGroup(){
        try {
            //try deleting the group and then set the member state to no mentor group
            deleteMentorGroup({variables: {groupId: group._id}});
            setMember({...member, mentorGroup: null});
        }
        catch{
            return console.log("Group not deleted");
        }
    }

    //called when the user clicks to create a mentor group
    function createGroup(){
        return console.log("Group created!");
    }

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
            {group ? 
                <>
                    {group.mentor.username === Auth.getProfile().username ? 
                        <Button color="secondary" variant="contained" onClick={disbandGroup} sx={{my: 2}}>Disband Your Mentor Group</Button>
                        : 
                        <Box sx={{m:3, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant="h5">Your Mentor:</Typography>
                            <Box sx={{p:2}}>
                                <MemberCard member={group.mentor}/> 
                            </Box>
                        </Box>
                    }
                    <Box sx={{m:3, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                        <Typography variant="h5">Current Mentees - {group.menteeCount}/{group.numMentees} </Typography>
                        {group.menteeCount > 0 ? 
                            <MemberGroup mentees={group.mentees}/> 
                            :
                            <Box>Add mentees to your mentor group!</Box>
                        }
                    </Box> 
                </>
            : 
                <Box sx={{m:3, display:"flex", flexDirection:"column", alignItems:'center'}}>
                    <Typography variant="h5">No mentor group</Typography>
                    {member?.username === Auth.getProfile()?.username ?
                        <>
                            <Typography>Start looking for a group or start one.</Typography>
                            <Formik 
                                initialValues={{numMentees:5}} 
                                validationSchema={Yup.object({numMentees: Yup.number().max(10, "10 mentees max").min(1, "Need at lease 1 mentee")})}
                                onSubmit={(values)=>console.log(values)}
                            >
                                {formik => (
                                    <Box 
                                        component="form" 
                                        sx={{display: "flex", alignItems: "center"}}
                                        onSubmit={e => {
                                            e.preventDefault();
                                            formik.handleSubmit();
                                            createGroup();
                                        }}
                                    >
                                        <Button color="secondary" variant="contained" sx={{m: 2}} type="submit">Become Mentor</Button>
                                        <TextField
                                            sx={{width: 104}}
                                            size="small"
                                            id="numMentees"
                                            label="# of Mentees"
                                            type="number"
                                            value={formik.values.numMentees}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Box>
                                )}
                            </Formik>
                        </>
                        :
                        null
                    }
                </Box>
            }
        </Box>
    )
}