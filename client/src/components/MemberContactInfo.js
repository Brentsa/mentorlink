import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";

export default function MemberContactInfo({bIsUserProfile}){

    const [bIsEditing, setIsEditing] = useState(false);

    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    return (
        <Box sx={{m:2}}>
            <Box sx={{display: 'flex', alignItems: 'center', mb:1}}>
                <Typography variant="h5">Contact Info</Typography>
                {bIsUserProfile ? <Button color="secondary" size="small" sx={{mx: 2}} onClick={toggleEdit}>{!bIsEditing ? 'edit' : 'save'}</Button> : null}
            </Box>
            {bIsEditing ? (
                <TextField
                    id="contact info text"
                    multiline
                    fullWidth
                    defaultValue="This will be the description of the member. You will be able to see things about them and learn about them. We can tell a lot about a person by their description."
                />
            ) : (
                <Typography variant="body2">
                    This will be the description of the member. You will be able to see things about them and learn about them. We can tell a lot about a person by their description.
                </Typography>    
            )}
            
        </Box>
    )
}