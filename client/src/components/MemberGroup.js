import Box from "@mui/system/Box";
import MiniMemberCard from "./MiniMemberCard";
import Grid from '@mui/material/Grid';


export default function MemberGroup(){
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <MiniMemberCard/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MiniMemberCard/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MiniMemberCard/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MiniMemberCard/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MiniMemberCard/>
                </Grid>
            </Grid>
        </Box>

        
    )
}