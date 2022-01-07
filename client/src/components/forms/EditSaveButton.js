import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import Button from '@mui/material/Button';
import Auth from "../../utils/AuthService";

export default function EditSaveButton({title, bIsEditing, bIsUserProfile}){

    return(
        <Box sx={{display: 'flex', alignItems: 'center', mb: 1}}>
            <Typography variant="h5">{title}</Typography>
            {bIsUserProfile && Auth.UserLoggedIn() 
                ? 
                <Button color="secondary" size="small" sx={{mx: 2}} type="submit">
                    {!bIsEditing ? 'edit' : 'save'}
                </Button> 
                : 
                null
            }
        </Box>
    );
}