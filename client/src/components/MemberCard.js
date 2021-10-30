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

export default function MemberCard({member}) {
  return (
    <Card sx={{ 
      m:1,
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
    
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', p:1}}>
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
        
        <CardActions>
          <Button variant="contained" color="secondary" component={Link} to={`/dashboard/${member?.username}`}>Go to profile</Button>
        </CardActions>  
      </Box>
    </Card>
  );
}