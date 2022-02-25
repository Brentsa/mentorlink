import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Message from './Message';
import Auth from '../../utils/AuthService';
import { useEffect} from 'react';

export default function ConversationContainer({group}){

    //whenever the conversation is loaded, get the conversation box
    var convoBox = document.getElementById("conversation-screen");

    //When the conversation box is set, set the top of the scroll screen to the bottom of the messages
    useEffect(() => { 
        if(convoBox) convoBox.scrollTop = convoBox.scrollHeight; 
    });

    return (
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
                '::-webkit-scrollbar': {display: 'none'}
            }}
        >
            {group?.conversation.length > 0 ?
                group.conversation.map((message, id) => <Message key={id} message={message} bIsUserMessage={message.creator._id === Auth.getProfile()?._id}/>)
                :
                <Typography variant='h5' color="lightBlue.main">Write a message below to start the conversation</Typography>
            }
        </Grid>
    );
}