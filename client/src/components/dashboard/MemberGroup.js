import Box from "@mui/system/Box";
import MiniMemberCard from "../cards/MiniMemberCard";
import Grid from '@mui/material/Grid';


export default function MemberGroup({mentees}){
    
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 2}}>
            <Grid container spacing={2}>
                {mentees.map((mentee, i) => <Grid item xs={12} md={6} key={i}><MiniMemberCard username={mentee.username} industry={mentee.industry?.name}/></Grid> )}
            </Grid>
        </Box>
    )
}