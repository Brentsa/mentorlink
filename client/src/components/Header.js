import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Header() {
  const [value, setValue] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <Box sx={{ flex: '0 1 auto', marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h4" color="inherit" component={Link} to={'/'} sx={{textDecoration: 'none'}}>MentorLink</Typography>

          <Box sx={{ width: '100%', display: {xs: 'none', lg: 'flex'}, justifyContent: 'center' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="app bar icons"
            >
              <Tab value="one" label="Your Profile"/>
              <Tab value="two" label="Your Mentor"/>
              <Tab value="three" label="Your Mentees"/>
              <Tab value="four" label="Search"/>
              <Tab value="five" label="Discussion"/>
            </Tabs>
          </Box>

          <Box sx={{ width: '100%', display: {xs: 'flex', lg: 'none'}, justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="menu"
              sx={{ mx: 1 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Button color="inherit" component={Link} to={'/login'}>Login</Button>
          <Button color="inherit" component={Link} to={'/register'}>Register</Button>

        </Toolbar>
      </AppBar>
    </Box>
  );
}