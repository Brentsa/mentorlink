import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import ProfileMember from '../components/ProfileMember';
import ProfileMentor from '../components/ProfileMentors';
import { useQuery } from '@apollo/client';
import { QUERY_MEMBER } from '../utils/queries';
import { Box } from '@mui/system';

export default function Dashboard(){
    //peel the username off of the URL using useParams and set it to userParam
    const {username: userParam} = useParams();

    //query the member given by the params
    const {data, loading} = useQuery(QUERY_MEMBER, {variables: {username: userParam}});

    //assign member data if available otherwise set it to an empty object
    const member = data?.member || {};  

    if(member){ console.log(member);}
    
    //return loading while the query executes
    if(loading) return <Box>Loading...</Box>

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                <ProfileMember member={member}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <ProfileMentor/>
            </Grid>
        </Grid>
    )
}