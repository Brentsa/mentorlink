import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { capFirstLetter } from '../../utils/helpers';
import Auth from '../../utils/AuthService';
import { useDispatch } from 'react-redux';
import { openAndSetMessage } from '../../redux/slices/snackbarSlice';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


export default function MiniMemberCard({mentorGroup, bIsUserProfile, removeMenteeMutation, setMember, member, mentor}) {
  const dispatch = useDispatch();
  const history = useHistory();

  //const {username, _id} = mentee;
  const username = member?.username;
  const _id = member?._id;
  const industry = member?.industry?.name;
  const profilePicture = member?.profilePicture
  
  //redirect the user to the member's profile page
  function goToMemberProfile(){
    return history.push(`/dashboard/${username}`);
  }

  function removeMentee(){
    //call the remove mentee mutation and remove the mentee from the group
    removeMenteeMutation({variables: {groupId: mentorGroup?._id, menteeId: _id}});

    //filter the removed mentee from the mentee list and update the state
    const newGroup = mentorGroup.mentees.filter(member => member.username !== username);
    setMember({...mentor, mentorGroup: {...mentorGroup, mentees: newGroup, menteeCount: newGroup.length}});

    //open the snack bar and set a message
    dispatch(openAndSetMessage("Mentee Removed From Group!"))
  }

  return (
    <Card sx={{ 
      m: 1,
      width: 'max-content',
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      bgcolor: 'lightBlue.main',
      '&:hover': {
        boxShadow: 4
      }
    }}>
      { Auth.getProfile()?.username === mentorGroup?.mentor?.username && bIsUserProfile &&
        <Button color='secondary' variant='contained' disableElevation size='small' onClick={removeMentee} endIcon={<RemoveCircleIcon/>}>remove</Button>
      }
      <CardActionArea sx={{padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={goToMemberProfile}>
        <Avatar alt="Profile Pic" src={profilePicture ?? `https://i.pravatar.cc/60?u=${username}`} sx={{ width: 60, height: 60 }}/>

        <CardContent sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', borderLeft: 4, borderColor: 'secondary.main', marginLeft: 2}}>
          <Typography gutterBottom variant="h6" component="div">{username ?? "username"}</Typography>
          <Typography gutterBottom variant="body" component="div">{capFirstLetter(industry)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}