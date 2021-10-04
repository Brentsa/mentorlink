import { useState } from 'react';
import {Box, TextField, Button } from '@mui/material';

export default function EnterMessageBox(){

    const [message, setMessage] = useState('');

    const handleTextChange = (event) => {
        console.log(event.target.value);
        setMessage(event.target.value);
        return;
    }

    function sumbitMessage(event){
        event.preventDefault();
        console.log(message);
        return;
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
                    width: "80%"
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