import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

export default function ProfileMember(){
    return (
        <Box sx={{bgcolor: 'primary.light', display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
            <Box sx={{ width: '200px', height: '200px', borderRadius: '50%', border: 1, overflow: 'hidden', m: 2}}>
                <img src="http://placehold.it/200" alt='member' width='100%' height='100%'/>  
            </Box>

            <Box sx={{m:2}}>
                <Typography variant="h5">Welcome, firstName lastName</Typography>
            </Box>

            <Box sx={{m:2}}>
                <Typography variant="body2">
                    This will be the description of the member. You will be able to see things about them and learn about them. We can tell a lot about a person by their description.
                </Typography>
            </Box>
        </Box>
    )
}