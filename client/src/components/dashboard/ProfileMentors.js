import Box from "@mui/system/Box";
import { Typography } from "@mui/material";
import MemberCard from "../cards/MemberCard";
import MemberGroup from "./MemberGroup";
import Auth from "../../utils/AuthService";
import { Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_MENTOR_GROUP, REMOVE_MENTEE_FROM_GROUP } from "../../utils/mutations";
import CreateGroupForm from "./CreateGroupForm";
import { useDispatch } from "react-redux";
import { removeMentorGroup } from "../../redux/slices/memberSlice";

export default function ProfileMentor({member, setMember, bIsUserProfile}){

    const dispatch = useDispatch();

    //Destructure mentor group from the member profile
    const group = member?.mentorGroup;

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
        }
        catch{
            return console.log("Group not deleted");
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
            dispatch(removeMentorGroup());
        }
        catch{
            return console.log("Mentee not removed from group");
        }
        return;
    }
    
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
            {group ? 
                <>
                    {group.mentor.username === Auth.getProfile()?.username && group.mentor.username === member.username ? 
                        <Button color="secondary" variant="contained" onClick={disbandGroup} sx={{my: 2}}>Disband Your Mentor Group</Button>
                        : 
                        <Box sx={{m:3, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
                            {Auth.getProfile()?.username === member.username ?
                                <Button color="secondary" variant="contained" onClick={leaveGroup} sx={{my: 2}}>Leave Mentor Group</Button>
                                :
                                null
                            }
                            {group.mentor.username !== member.username &&
                                <>
                                    <Typography variant="h5">Mentor</Typography>
                                    <Box sx={{p:2}}>
                                        <MemberCard member={group.mentor}/> 
                                    </Box>
                                </>
                            }
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
                    {bIsUserProfile ?
                        <>
                            <Typography>Start looking for a group or start one.</Typography>
                            <CreateGroupForm member={member} setMember={setMember}/>
                        </>
                        :
                        null
                    }
                </Box>
            }
        </Box>
    )
}