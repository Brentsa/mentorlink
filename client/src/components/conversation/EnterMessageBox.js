import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ADD_MESSAGE } from '../../utils/mutations';
import Auth from '../../utils/AuthService';
import { QUERY_MENTOR_GROUP_CONVO } from '../../utils/queries';

export default function EnterMessageBox({groupId}){

    //create a message state to hold the text of the message
    const [message, setMessage] = useState('');

    const [addMessage] = useMutation(ADD_MESSAGE);

    //Set the message, whenever there is a change in the textfield
    const handleTextChange = (event) => {
        return setMessage(event.target.value);
    }

    //Called when the message send button is clicked
    async function sumbitMessage(event){
        event.preventDefault();
        console.log(message);

        //add the submitted message to the conversation using the mutation
        addMessage({
            variables: {groupId: groupId, content:{creator: Auth.getProfile()._id, text: message}},
            refetchQueries: [QUERY_MENTOR_GROUP_CONVO, "MentorGroup"]
        });

        return setMessage('');
    }

    return (
        <Box 
            component="form"
            sx={{
                width: {xs: '90%', md: '60%'},
            }}>
            <TextField
                id="user-message-textfield"
                label="Your Message"
                color="darkBlue"
                multiline
                rows={2}
                value={message}
                onChange={handleTextChange}
                sx={{
                    width: "80%",
                }}
            />
            <Button
                variant="contained"
                color="secondary"
                onClick={sumbitMessage}
                sx={{
                    width: "20%",
                    height: "100%",
                    color: "contrastText.main",
                    fontSize: 20
                }}
            >
                Send
            </Button>
        </Box>
    )
}