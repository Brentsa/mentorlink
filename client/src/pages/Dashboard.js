import Grid from '@mui/material/Grid';
import Box  from "@mui/system/Box";
import ProfileMember from '../components/ProfileMember';

export default function Dashboard(){
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <ProfileMember/>
            </Grid>
            <Grid item xs={12} md={4}>
                <Box sx={{width: '100%', bgcolor: 'secondary.main'}}>
                    box
                </Box>
            </Grid>
        </Grid>
    )
}