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
import {Link} from 'react-router-dom';
import Auth from '../utils/AuthService';
import { useSelector, useDispatch } from 'react-redux';
import { switchPage } from '../redux/slices/pageSlice';


export default function Header() {
  //get the state of current page from Redux and define the dispatch method for state reduction
  const currentPage = useSelector(state => state.currentPage.value);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    return dispatch(switchPage(newValue));
  };

  const logout = () => {
    return Auth.logout();
  }
  
  return (
    <Box sx={{ flex: '0 1 auto', marginBottom: 3 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Box>
            <Typography variant="h4" color="inherit" sx={{textDecoration: 'none'}}>MentorLink</Typography>  
          </Box>
          

          <Box sx={{ width: '100%', display: {xs: 'none', lg: 'flex'}, justifyContent: 'center' }}>
            <Tabs
              value={currentPage}
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="app bar icons"
            >
              <Tab value="home" label="Home" component={Link} to={'/'}/>
              <Tab value="yourProfile" label="Your Profile" component={Link} to={Auth.UserLoggedIn() ? `/dashboard/${Auth.getProfile().username}` : '/login'}/>
              <Tab value="yourMentor" label="Your Mentor"/>
              <Tab value="search" label="Search"/>
              <Tab value="members" label="Members"/>
              <Tab value="discussion" label="Discussion" component={Link} to={'/conversation'}/>
              <Tab value="login" label="Login/Register" component={Link} to={'/login'}/>
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

          {!Auth.UserLoggedIn() ? (
            <>
              <Button color="inherit" component={Link} to={'/login'} onClick={() => dispatch(switchPage('login'))}>Login</Button>
              <Button color="inherit" component={Link} to={'/register'} onClick={() => dispatch(switchPage('login'))}>Register</Button>
            </>
          ) : (
            <Button color="inherit" onClick={logout}>Logout</Button>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}