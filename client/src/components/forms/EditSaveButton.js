import { IconButton, Box, Typography} from "@mui/material";
import Auth from "../../utils/AuthService";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function EditSaveButton({title, bIsEditing, bIsUserProfile}){

    return(
        <Box p={1} display="flex" alignItems="center" justifyContent="space-between" marginBottom={1} borderBottom={2} borderColor="primary.main">
            <Typography variant="h5">{title}</Typography>
            {bIsUserProfile && Auth.UserLoggedIn() 
                ? 
                <IconButton color="secondary" size="small" sx={{marginLeft: 1}} type="submit">{!bIsEditing ? <EditIcon/> : <SaveIcon/>}</IconButton> 
                : 
                null
            }
        </Box>
    );
}