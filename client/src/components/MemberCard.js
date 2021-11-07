import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {capFirstLetter} from '../utils/helpers'
import {Link} from 'react-router-dom';
import Auth from '../utils/AuthService';
import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_MEMBER } from '../utils/queries';
import { ADD_MENTEE_TO_GROUP } from '../utils/mutations';
import { useSelector } from 'react-redux';

export default function MemberCard({member}) {

  //store current user from global state
  const currentUser = useSelector(state => state.members.currentUser);
  const bIsUserLoggedIn = useSelector(state => state.members.loggedIn);

  //define a mutation to add a mentee to a mentor group
  const [addMenteeMutation] = useMutation(ADD_MENTEE_TO_GROUP);

  //lazy query a member and execute the callback when the member data is returned.
  //set the fetch policy to not cache so that the queried user is always fresh.
  const [queryMember] = useLazyQuery(QUERY_MEMBER, {
    onCompleted: data => addMenteeToGroup(data),
    fetchPolicy: 'network-only'
  });

  function addMenteeToGroup(data){
    //store the user's group ID as well as the mentee's ID
    const groupId = data.member?.mentorGroup?._id;
    const menteeId = member._id;

    //add mentee to group using the IDs previously stored
    addMenteeMutation({variables: {groupId: groupId, menteeId: menteeId}});
  }

  function isMenteeInGroup(){
    //if the current user has a mentor group
    if(currentUser?.mentorGroup){
      //check if the member card's member is in the mentor group of the current user
      for(var i = 0; i < currentUser.mentorGroup.mentees.length; i++){
        if(currentUser.mentorGroup.mentees[i].username === member.username){
          return true
        }
      }
    }

    return false;
  }

  //return true if the current user is a mentor, false if they aren't a member
  function isUserAMentor(){
    return currentUser?.mentorGroup?.mentor?.username === Auth.getProfile()?.username
  }

  //group all the add mentee button conditions together in one function
  function shouldAddButtonRender(){
    return !member?.mentorGroup && bIsUserLoggedIn && !isMenteeInGroup() && isUserAMentor()
  }

  function queryUser(){
    if(Auth.UserLoggedIn()) {
      //if the user is logged in, then we query them
      return queryMember({variables: {username: Auth.getProfile().username}});
    }
    else {
      //return null if the user is not logged in
      return null; 
    }
  }

  return (
    <Card sx={{ 
      m:1,
      maxWidth: 345,
      minHeight: 540,
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      backgroundColor: 'lightBlue.main',
      '&:hover': {
        boxShadow: 6
      }
    }}>
      <Box sx={{
        bgcolor: 'primary.dark', 
        width: '100%', 
        maxHeight: '35%',
        p:3, 
        borderBottomLeftRadius: '50%', 
        borderBottomRightRadius: '50%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center'
      }}>
        <CardMedia
          component="img"
          image="http://placehold.it/200"
          alt="placeholder image"
          sx={{width: 200, height: 200, borderRadius: '50%'}}
        />
      </Box>
    
      <Box sx={{width: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center', p:1}}>
        <CardContent sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
          <Typography gutterBottom variant="h4" component="div">
            {member ? member.username : "FakeUsername"}
          </Typography>
          <Box component="div" sx={{width: '50%', height: '4px', backgroundColor: 'secondary.main', mb: 2}}></Box>
          <Typography gutterBottom variant="h5" component="div">
            {member?.industry?.name ? capFirstLetter(member.industry.name) : "No Industry"}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', backgroundColor: '#FFF', padding: 1, borderRadius: 1, mt: 1, whiteSpace: "pre-line" }}>
            {member ? member.description : "FakeDescription is going to be right here."}
          </Typography>
        </CardContent>
        
        <CardActions sx={{width: "100%", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly"}}>
          <Button variant="contained" color="secondary" component={Link} to={`/dashboard/${member?.username}`}>Profile</Button>
          {shouldAddButtonRender() ? <Button variant="contained" color="secondary" onClick={queryUser}>Add Mentee</Button> : null}
        </CardActions>  
      </Box>
    </Card>
  );
}