import Box from "@mui/system/Box";
import { Chip, Typography } from "@mui/material";
import MemberCard from "../cards/MemberCard";
import MemberGroup from "./MemberGroup";
import Auth from "../../utils/AuthService";
import { Button } from "@mui/material";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADD_MENTEE_TO_GROUP, DELETE_MENTOR_GROUP, REMOVE_MENTEE_FROM_GROUP } from "../../utils/mutations";
import CreateGroupForm from "./CreateGroupForm";
import { useDispatch } from "react-redux";
import { addMentorGroup, removeMentorGroup } from "../../redux/slices/memberSlice";
import { isMenteeInGroup, isUserProfile } from "../../utils/helpers";
import { openAndSetMessage } from "../../redux/slices/snackbarSlice";
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupIcon from '@mui/icons-material/Group';
import { QUERY_MEMBER } from "../../utils/queries";

export default function ProfileMentor({member, setMember}){

    const dispatch = useDispatch();

    //Destructure mentor group from the member profile
    const group = member?.mentorGroup;

    //Initialize a mutation to delete a mentor group
    const [deleteMentorGroup] = useMutation(DELETE_MENTOR_GROUP);

    //Initialize a mutation to remove a mentee from a mentor group
    const [removeMenteeFromGroup] = useMutation(REMOVE_MENTEE_FROM_GROUP);

    //Initialize a mutation to add a mentee to the group
    const [addMenteeToGroup] = useMutation(ADD_MENTEE_TO_GROUP);

    //define a lazy query that querys the member again, and sets the dashboard's member state
    const [getAndSetMember] = useLazyQuery( QUERY_MEMBER, {variables: {username: member.username}, onCompleted: data => setMember(data.member)});

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

    //called if the user clicks the button to join the mentor group
    async function joinGroup(){
        //Define the group ID and the mentee to join ID
        const groupId = group._id; 
        const menteeId = Auth.getProfile()._id;   

        //Call the add mentee mutation
        const response = await addMenteeToGroup({variables: {groupId, menteeId}});

        //once the mentee has been added, query the updated member and set the state to trigger re-render
        getAndSetMember();

        dispatch(addMentorGroup({...response.data.addMenteeToGroup.mentorGroup}));
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
                        //show button to disband the mentor group if the user is the mentor of the group
                        <Button 
                            color="secondary" 
                            variant="contained" 
                            onClick={disbandGroup} 
                            sx={{my: 2}} 
                            endIcon={<DeleteIcon/>}
                        >
                            Disband Your Mentor Group
                        </Button>
                    : 
                        //options for the user if they are not the mentor of the group
                        <Box 
                            display="flex" 
                            flexWrap="wrap"
                            flexDirection="column"
                            alignItems="center"
                        >
                            {Auth.getProfile()?.username === member.username &&
                                //if this is the member's page they can leave the group
                                <Button 
                                    color="secondary" 
                                    variant="contained" 
                                    onClick={leaveGroup} 
                                    sx={{my: 2}}
                                >
                                    Leave Mentor Group
                                </Button>
                            }
                            { Auth.getProfile() && group.menteeCount < group.numMentees && !isMenteeInGroup(Auth.getProfile()?.username, group.mentees) && 
                                <Button 
                                    color="secondary" 
                                    variant="contained" 
                                    onClick={joinGroup}
                                    sx={{my: 2}}
                                >
                                    Join Mentor Group
                                </Button>
                            }
                            {group.mentor.username !== member.username &&
                                //if the mentor is not the user, show the mentor's member card
                                <Box position="relative" marginBottom={3}>
                                    <Chip 
                                        icon={<StarIcon/>} 
                                        label="Mentor" 
                                        variant="filled" 
                                        color="primary" 
                                        sx={{position: 'absolute', zIndex: 10}}
                                    />
                                    <MemberCard member={group.mentor}/> 
                                </Box>
                            }
                        </Box>
                    }
                    <Box 
                        display="flex" 
                        flexWrap="wrap"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Box 
                            borderBottom={2} 
                            borderColor="primary.main" 
                            mt={3} 
                            mb={1} 
                            pb={1} 
                            width="90%" 
                            display="flex" 
                            justifyContent="center"
                        >
                            <Chip 
                                icon={<GroupIcon/>} 
                                label={`Current Mentees - ${group.menteeCount}/${group.numMentees}`} 
                                color="primary" 
                                variant="filled"
                                sx={{p: 2}}
                            />
                        </Box>
                        {group.menteeCount > 0 ? 
                            <MemberGroup 
                                mentees={group.mentees} 
                                mentorGroup={group} 
                                bIsUserProfile={isUserProfile(member?.username)} 
                                member={member} 
                                setMember={setMember}
                            /> 
                        :
                            <Box>{isUserProfile(member?.username) ? "Add mentees to your mentor group!" : "No mentees currently in the group."}</Box>
                        }
                    </Box> 
                </>
            : 
                <Box 
                    margin={3}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
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