import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EnterMessageBox from '../components/conversation/EnterMessageBox';
import Message from '../components/conversation/Message';
import MiniMemberCard from '../components/cards/MiniMemberCard';
import { useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { QUERY_MENTOR_GROUP_CONVO } from '../utils/queries';
import { useEffect, useState } from 'react';
import AuthService from '../utils/AuthService';

export default function Conversation(){
    //find the group id from the current user's state
    const groupId = useSelector(state => state.members.currentUser.mentorGroup?._id);
    
    //define a lazy query for the mentor group, poll for changes to the conversation every 5 seconds
    const [getGroup, {data, loading}] = useLazyQuery(QUERY_MENTOR_GROUP_CONVO, {pollInterval: 5000});

    //initialize the state of the mentor group
    const [group, setGroup] = useState(null);

    useEffect(()=>{
        if(groupId){
            getGroup({variables: {id: groupId}});
        }
        if(data){
            setGroup(data.mentorGroup);
        }
    }, [groupId, data, getGroup])

    console.log(group);

    //whenever the conversation is loaded, get the conversation box
    var element = document.getElementById("conversation-screen");
    //When the conversation box is set, set the top of the scroll screen to the bottom of the messages
    if(element){ element.scrollTop = element.scrollHeight; }

    if(loading) return <Box>Loading...</Box>

    return (
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
            <Typography variant="h5">Mentor:</Typography>
            <MiniMemberCard username={group?.mentor.username}/>
            <Grid 
                id="conversation-screen"
                container  
                rowSpacing={2} 
                sx={{
                    my: 4, 
                    p: 2, 
                    minHeight: '20vh',
                    maxHeight: '60vh', 
                    bgcolor:'primary.light', 
                    borderRadius: 2, 
                    borderBottom: 2,
                    borderTop: 2,
                    borderColor: 'darkBlue.main',
                    overflowY: 'auto', 
                    '::-webkit-scrollbar': {
                        display: 'none'
                    },
                       
                }}
            >
                {group ?
                    group.conversation.map((message, id) => <Message key={id} text={message.text} bIsUserMessage={message.creator._id === AuthService.getProfile()?._id}/>)
                    :
                    <Box>Write a message below to start the conversation</Box>
                }

            </Grid>
            <EnterMessageBox setGroup={setGroup} groupId={groupId} group={group}/>
        </Box>
    )
}