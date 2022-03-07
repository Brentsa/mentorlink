import Box from "@mui/system/Box";
import { Chip, Typography } from "@mui/material";
import MemberCard from "../cards/MemberCard";
import MemberGroup from "./MemberGroup";
import Auth from "../../utils/AuthService";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_MENTOR_GROUP, REMOVE_MENTEE_FROM_GROUP } from "../../utils/mutations";
import CreateGroupForm from "./CreateGroupForm";
import { useDispatch } from "react-redux";
import { removeMentorGroup } from "../../redux/slices/memberSlice";
import { isUserProfile } from "../../utils/helpers";
import { openAndSetMessage } from "../../redux/slices/snackbarSlice";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ProfileMentor({member, setMember}){

    const dispatch = useDispatch();

    //Destructure mentor group from the member profile
    const group = member?.mentorGroup;

    console.log(group);

    //Initialize a mutation to delete a mentor group
    const [deleteMentorGroup] = useMutation(DELETE_MENTOR_GROUP);

    //Initialize a mutation to remove a mentee from a mentor group
    const [removeMenteeFromGroup] = useMutation(REMOVE_MENTEE_FROM_GROUP);

    //called when the user clicks the disband group button
    function disbandGroup(){
        try {
            //try deleting the group and then set the member state to no mentor group
            deleteMentorGroup({variables: {groupId: group._id}});
            setMember({...member, mentorGroup: null});

            //remove the mentor group from the current member state
            dispatch(removeMentorGroup());

            //Set snack bar success message and open it
            dispatch(openAndSetMessage("Mentor Group Deleted!"))
        }
        catch{
            //Set snack bar success message and open it
            dispatch(openAndSetMessage("Mentor Group Was Not Deleted!"))
        }
        return;
    }

    //called if the user clicks leave mentor group button
    function leaveGroup(){
        try{
            //try removing the mentee from the group in the backend and delete their group and set member state of group to null
            removeMenteeFromGroup({variables: {groupId: group._id, menteeId: member._id}});
            setMember({...member, mentorGroup: null});

            //remove the mentor group from the current member state
            return dispatch(removeMentorGroup());
        }
        catch{
            return console.log("Mentee not removed from group");
        }
    }

    return (
        <Box 
            display='flex' 
            flexDirection='column' 
            alignItems='center' 
        >
            {group ? 
                <>
                    {group.mentor.username === Auth.getProfile()?.username && group.mentor.username === member.username ? 
                        <Button color="secondary" variant="contained" onClick={disbandGroup} sx={{my: 2}} endIcon={<DeleteIcon/>}>Disband Your Mentor Group</Button>
                        : 
                        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                            {Auth.getProfile()?.username === member.username &&
                                <Button color="secondary" variant="contained" onClick={leaveGroup} sx={{my: 2}}>Leave Mentor Group</Button>
                            }
                            {group.mentor.username !== member.username &&
                                <Box position="relative" marginBottom={3}>
                                    <Chip icon={<StarIcon/>} label="Mentor" variant="filled" color="primary" sx={{position: 'absolute'}}/>
                                    <MemberCard member={group.mentor}/> 
                                </Box>
                            }
                        </Box>
                    }
                    <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                        <Box borderBottom={2} borderColor="primary.main" mt={3} mb={1} width="90%" display="flex" justifyContent="center">
                            <Typography variant="h5">Current Mentees - {group.menteeCount}/{group.numMentees} </Typography>
                        </Box>
                        {group.menteeCount > 0 ? 
                            <MemberGroup mentees={group.mentees} mentorGroup={group} bIsUserProfile={isUserProfile(member?.username)} member={member} setMember={setMember}/> :
                            <Box>Add mentees to your mentor group!</Box>
                        }
                    </Box> 
                </>
            : 
                <Box sx={{m:3, display:"flex", flexDirection:"column", alignItems:'center'}}>
                    <Typography variant="h5">No mentor group</Typography>
                    {isUserProfile(member?.username) &&
                        <>
                            <Typography>Start looking for a group or start one.</Typography>
                            <CreateGroupForm member={member} setMember={setMember}/>
                        </>
                    }
                </Box>
            }
        </Box>
    )
}