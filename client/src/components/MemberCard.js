import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MemberCard() {
  return (
    <Card sx={{ 
      maxWidth: 345,
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
    
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p:2}}>
        <CardContent sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center'}}>
          <Typography gutterBottom variant="h4" component="div">User123456</Typography>
          <Box component="div" sx={{width: '50%', height: '4px', backgroundColor: 'secondary.main', mb: 2}}></Box>
          <Typography gutterBottom variant="h5" component="div">Industry</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', backgroundColor: '#FFF', padding: 2, borderRadius: 1, mt: 1 }}>
            This will be the description of the member. You will be able to see things about them and learn about them. We can tell a lot about a person by their description.
          </Typography>
        </CardContent>
        
        <CardActions>
          <Button variant="contained" color="secondary">Go to profile</Button>
        </CardActions>  
      </Box>
    </Card>
  );
}