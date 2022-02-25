import Box from '@mui/material/Box';
import EnterMessageBox from '../components/conversation/EnterMessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { QUERY_MENTOR_GROUP_CONVO } from '../utils/queries';
import { useEffect, useState } from 'react';
import { switchPage } from '../redux/slices/pageSlice';
import { ConversationHeader } from '../components/conversation/ConversationHeader';
import ConversationContainer from '../components/conversation/ConversationContainer';

export default function Conversation(){
    const dispatch = useDispatch();
    dispatch(switchPage('discussion'));

    //find the group id from the current user's state
    const groupId = useSelector(state => state.members.currentUser.mentorGroup._id);

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

    //return loading html if the group is still loading
    if(loading) return <Box>Loading...</Box>

    return (
        <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '100%'}}>
            <ConversationHeader group={group}/>
            <ConversationContainer group={group}/>
            <EnterMessageBox setGroup={setGroup} groupId={groupId} group={group}/>
        </Box>
    )
}