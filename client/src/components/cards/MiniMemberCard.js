import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';


export default function MiniMemberCard({username}) {
  const history = useHistory();

  //redirect the user to the member's profile page
  function goToMemberProfile(){
    return history.push(`/dashboard/${username}`);
  }

  return (
    <Card sx={{ 
      maxWidth: 345, 
      bgcolor: 'lightBlue.main',
      '&:hover': {
        boxShadow: 4
      }
    }}>
      <CardActionArea sx={{padding: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={goToMemberProfile}>
        <Avatar alt="Profile Pic" src="http://placehold.it/200" sx={{ width: 60, height: 60 }}/>

        <CardContent sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', borderLeft: 4, borderColor: 'secondary.main', marginLeft: 2}}>
          <Typography gutterBottom variant="h6" component="div">{username}</Typography>
          <Typography gutterBottom variant="body" component="div">Industry</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}