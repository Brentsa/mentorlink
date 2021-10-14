import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from "react";

export default function MemberDescription({member, setMember, bIsUserProfile}){

    const [bIsEditing, setIsEditing] = useState(false);

    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    return (
        <Box sx={{m:2}}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
                <Typography variant="h5">Description</Typography>
                {bIsUserProfile ? <Button color="secondary" size="small" sx={{mx: 2}} onClick={toggleEdit}>{!bIsEditing ? 'edit' : 'save'}</Button> : null}
            </Box>
            {bIsEditing ? (
                <TextField
                    id="description text"
                    multiline
                    fullWidth
                    defaultValue={member.description}
                />
            ) : (
                <Typography variant="body2">
                    {member.description}
                </Typography>    
            )}
        </Box>
    )
}