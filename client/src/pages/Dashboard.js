import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import ProfileMember from '../components/dashboard/ProfileMember';
import ProfileMentor from '../components/dashboard/ProfileMentors';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_MEMBER } from '../utils/queries';
import { Box } from '@mui/system';
import Auth from '../utils/AuthService';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, setLoggedIn } from '../redux/slices/memberSlice';
import { switchPage } from '../redux/slices/pageSlice';

export default function Dashboard(){

    const dispatch = useDispatch();
    
    //peel the username off of the URL using useParams and set it to userParam
    const {username: userParam} = useParams();

    //compare the profile to the current logged in user and set the state for later use
    const [bIsUserProfile] = useState(userParam === Auth.getProfile()?.username);

    //console.log(userParam);
    //console.log(Auth.getProfile()?.username);

    //create a state for the member of the profile
    const [currentMember, setCurrentMember] = useState(null);

    //query the member given by the params, we want the query to execute on every render so change the fetch policy to network only
    const {data, loading} = useQuery(QUERY_MEMBER, {variables: {username: userParam}, fetchPolicy: "network-only"});

    const [queryCurrentUser] = useLazyQuery(QUERY_MEMBER, {
        fetchPolicy: "network-only", 
        onCompleted: data => dispatch(loginUser(data.member))
    })

    //once the data has been returned, set the current member once the component has rendered
    useEffect(()=>{
        //if there is data from the lazy query, store the user's data as the current member
        if(data) setCurrentMember(data.member);
    }, [data])

    //after the component has rendered, set the user logged in state to true if they are logged in via Auth
    useEffect(()=>{
        //once the component has rendered, if the use is logged in, set the logged in state to true
        if(Auth.UserLoggedIn()){
            dispatch(setLoggedIn(true));
            queryCurrentUser({variables: {username: Auth.getProfile().username}});
        } 

        //when arriving on the page set the current page state to your profile if your account
        if(bIsUserProfile) dispatch(switchPage("yourProfile"));
        else dispatch(switchPage('search'));
    }, [dispatch, queryCurrentUser, bIsUserProfile])

    //return loading while the query executes
    if(loading) return <Box>Loading...</Box>

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
                {currentMember ? <ProfileMember member={currentMember} setMember={setCurrentMember} bIsUserProfile={bIsUserProfile}/> : 'User not found'}
            </Grid>
            <Grid item xs={12} md={6}>
                <ProfileMentor member={currentMember} setMember={setCurrentMember} bIsUserProfile={bIsUserProfile}/>
            </Grid>
        </Grid>
    )
}