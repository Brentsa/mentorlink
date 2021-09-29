import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

export default function MiniMemberCard() {
  return (
    <Card sx={{ 
      mt: 2,
      maxWidth: 345, 
      padding: 2, 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center', 
      bgcolor: 'tertiary.main',
      '&:hover': {
        boxShadow: 6
      }
    }}>

      <Avatar alt="Profile Pic" src="http://placehold.it/200" sx={{ width: 56, height: 56 }}/>

      <CardContent sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center', borderLeft: 4, borderColor: 'secondary.main', marginLeft: 2}}>
        <Typography gutterBottom variant="h5" component="div">User123456</Typography>
        <Typography gutterBottom variant="body" component="div">Industry</Typography>
      </CardContent>
      
      <CardActions>
        <Button size="small" variant="contained" color="secondary">Go to profile</Button>
      </CardActions>

    </Card>
  );
}