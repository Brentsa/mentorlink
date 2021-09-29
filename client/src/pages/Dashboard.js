import Grid from '@mui/material/Grid';
import ProfileMember from '../components/ProfileMember';
import ProfileMentor from '../components/ProfileMentors';

export default function Dashboard(){
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <ProfileMember/>
            </Grid>
            <Grid item xs={12} md={6}>
                <ProfileMentor/>
            </Grid>
        </Grid>
    )
}