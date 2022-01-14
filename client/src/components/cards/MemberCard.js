import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {capFirstLetter} from '../../utils/helpers'
import {Link} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_MENTEE_TO_GROUP } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { addMenteeGroup} from '../../redux/slices/memberSlice';
import { useEffect, useState, useCallback } from 'react';
import StarIcon from '@mui/icons-material/Star';

export default function MemberCard({member}) {
  const dispatch = useDispatch();

  //store current user from global state
  const currentUser = useSelector(state => state.members.currentUser);
  const bIsUserLoggedIn = useSelector(state => state.members.loggedIn);

  //group all the add mentee button conditions together in one function
  const shouldAddButtonRender = useCallback(() => {
    //return bool value depending if the mentee is in the member group or not
    function isMenteeInGroup(){
      //if the current user has a mentor group
      if(currentUser?.mentorGroup){
        //check if the member card's member is in the mentor group of the current user
        for(var i = 0; i < currentUser.mentorGroup.mentees.length; i++){
          if(currentUser.mentorGroup.mentees[i]._id === member._id) return true
        }
      }
      return false;
    }

    //return bool value the depends on the room available in the mentor group
    function isRoomInGroupForMentee(){
      if(currentUser?.mentorGroup){
        //return true if there is at least room for 1 additional member
        return currentUser.mentorGroup.menteeCount < currentUser.mentorGroup.numMentees;
      }
      return false;
    }

    //return true if the current user matches the member in the card
    function userMatchesCard(){
      return currentUser.username === member.username;
    }

    //return true if the user is a mentor
    function isUserMentor(){
      return currentUser.username === currentUser.mentorGroup.mentor.username;
    }

    return bIsUserLoggedIn && !isMenteeInGroup() && isRoomInGroupForMentee() && !userMatchesCard() && !member.mentorGroup && isUserMentor();
  }, [bIsUserLoggedIn, currentUser, member])

  //state to determine if the add mentee button should render
  const [shouldRender, setShouldRender] = useState(() => shouldAddButtonRender());

  //define a mutation to add a mentee to a mentor group
  const [addMenteeMutation] = useMutation(ADD_MENTEE_TO_GROUP);

  //Called when add mentee button is clicked
  async function addMenteeToGroup(){
    const groupId = currentUser?.mentorGroup._id;
    const menteeId = member._id;

     //add mentee to group using the IDs previously stored
    const info = await addMenteeMutation({variables: {groupId: groupId, menteeId: menteeId}});
    const menteeData = {...info.data.addMenteeToGroup.group}

    //update the current member user global state to show the new mentees
    dispatch(addMenteeGroup(menteeData));
  }

  //whenever the current user changes, member card checks if the add mentee button should be rendered or not
  useEffect(()=>{
    setShouldRender(shouldAddButtonRender());
  }, [currentUser, shouldAddButtonRender])

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
          image={`https://i.pravatar.cc/200?u=${member.username}`}
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
          <Button variant="contained" color="secondary" component={Link} to={`/dashboard/${member?.username}`}>Profile {member.mentorGroup && <StarIcon/>}</Button>
          {shouldRender ? <Button variant="contained" color="secondary" onClick={addMenteeToGroup}>Add Mentee</Button> : null}
        </CardActions>  
      </Box>
    </Card>
  );
}