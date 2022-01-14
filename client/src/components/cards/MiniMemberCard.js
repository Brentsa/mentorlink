import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { capFirstLetter } from '../../utils/helpers';
import Auth from '../../utils/AuthService';


export default function MiniMemberCard({username, industry, mentor, bIsUserProfile}) {
  const history = useHistory();

  //redirect the user to the member's profile page
  function goToMemberProfile(){
    return history.push(`/dashboard/${username}`);
  }

  function removeMentee(){
    return console.log("clicked");
  }

  return (
    <Card sx={{ 
      maxWidth: 345, 
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      bgcolor: 'lightBlue.main',
      '&:hover': {
        boxShadow: 4
      }
    }}>
      { Auth.getProfile()?.username === mentor && bIsUserProfile &&
        <Button color='secondary' variant='contained' disableElevation size='small' onClick={removeMentee}>remove</Button>
      }
      <CardActionArea sx={{padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={goToMemberProfile}>
        <Avatar alt="Profile Pic" src={`https://i.pravatar.cc/60?u=${username}`} sx={{ width: 60, height: 60 }}/>

        <CardContent sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', borderLeft: 4, borderColor: 'secondary.main', marginLeft: 2}}>
          <Typography gutterBottom variant="h6" component="div">{username ?? "username"}</Typography>
          <Typography gutterBottom variant="body" component="div">{capFirstLetter(industry)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}