import { Button, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function MemberIndustry({bIsUserProfile}){

    const [bIsEditing, setIsEditing] = useState(false);

    function toggleEdit(){
        return setIsEditing(!bIsEditing);
    }

    return (
        <Box sx={{m:2, display: 'flex'}}>
            <Typography variant="h4">Industry</Typography>
            {bIsUserProfile ? <Button color="secondary" size="small" sx={{mx: 2}} onClick={toggleEdit}>{!bIsEditing ? 'edit' : 'save'}</Button> : null}
        </Box>
    );
};