import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EnterMessageBox from '../components/conversation/EnterMessageBox';
import Message from '../components/conversation/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { QUERY_MENTOR_GROUP_CONVO } from '../utils/queries';
import { useEffect, useState } from 'react';
import Auth from '../utils/AuthService';
import { switchPage } from '../redux/slices/pageSlice';
import { ConversationHeader } from '../components/conversation/ConversationHeader';

export default function Conversation(){
    const dispatch = useDispatch();
    dispatch(switchPage('discussion'));

    //find the group id from the current user's state
    const groupId = useSelector(state => state.members.currentUser.mentorGroup?._id);

    //initialize the state of the mentor group
    const [group, setGroup] = useState(null);
    
    //define a lazy query for the mentor group, poll for changes to the conversation every 5 seconds
    const [getGroup, {loading}] = useLazyQuery(QUERY_MENTOR_GROUP_CONVO, {
        pollInterval: 5000, 
        onCompleted: (data) => {
            setGroup(data.mentorGroup);
        }
    });

    //once the group id is set, find the group
    useEffect(()=>{ 
        if(groupId) getGroup({variables: {id: groupId}}); 
    }, [groupId, getGroup]);

    //whenever the conversation is loaded, get the conversation box
    var convoBox = document.getElementById("conversation-screen");

    //When the conversation box is set, set the top of the scroll screen to the bottom of the messages
    useEffect(() => { if(convoBox) convoBox.scrollTop = convoBox.scrollHeight; })

    
    if(loading) return <Box>Loading...</Box>

    return (
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
            <ConversationHeader group={group}/>
            <Grid 
                id="conversation-screen"
                container  
                rowSpacing={1} 
                width={{xs: '100%', md: '60%'}}
                sx={{
                    mt: 4, 
                    mb: 2,
                    p: 2, 
                    minHeight: '20vh',
                    maxHeight: '50vh', 
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
                {group?.conversation.length > 0 ?
                    group.conversation.map((message, id) => <Message key={id} message={message} bIsUserMessage={message.creator._id === Auth.getProfile()?._id}/>)
                    :
                    <Typography variant='h5' color="lightBlue.main">Write a message below to start the conversation</Typography>
                }
            </Grid>
            <EnterMessageBox setGroup={setGroup} groupId={groupId} group={group}/>
        </Box>
    )
}