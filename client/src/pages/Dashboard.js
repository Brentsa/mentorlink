import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import ProfileMember from '../components/dashboard/ProfileMember';
import ProfileMentor from '../components/dashboard/ProfileMentors';
import { useQuery } from '@apollo/client';
import { QUERY_MEMBER } from '../utils/queries';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchPage } from '../redux/slices/pageSlice';
import { isUserProfile } from '../utils/helpers';
import CircularProgress from '@mui/material/CircularProgress';

export default function Dashboard(){

    const dispatch = useDispatch();
    const user = useSelector(state => state.members.currentUser);
    
    //peel the username off of the URL using useParams and set it to userParam
    const {username: userParam} = useParams();

    //create a state for the member of the profile
    const [currentMember, setCurrentMember] = useState(null);

    //query the member given by the params, we want the query to execute on every render so change the fetch policy to network only
    const {loading} = useQuery(QUERY_MEMBER, {
        variables: {username: userParam}, 
        fetchPolicy: "network-only", 
        onCompleted: data => setCurrentMember(data.member)
    });

    //manage the state of the current page based on who's profile the user is visiting
    useEffect(()=>{
        if(currentMember && user){
            //when arriving on the page set the current page state to your profile if your account
            if(isUserProfile(currentMember?.username)) 
                dispatch(switchPage("yourProfile"));
            else if(user?.mentorGroup?.mentor?.username === currentMember.username)
                dispatch(switchPage("yourMentor"));
            else
                dispatch(switchPage('search'));
        }
    }, [dispatch, currentMember, user]);

    //return loading while the query executes
    if(loading) return <CircularProgress color="secondary" />

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                {currentMember ? <ProfileMember member={currentMember} setMember={setCurrentMember}/> : 'User not found'}
            </Grid>
            <Grid item xs={12} md={6}>
                <ProfileMentor member={currentMember} setMember={setCurrentMember}/>
            </Grid>
        </Grid>
    )
}