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
import { logoutUser, setLoggedIn } from '../redux/slices/memberSlice';
import { useHistory } from 'react-router';

export default function Header() {
  //get the state of current page from Redux and define the dispatch method for state reduction
  const currentPage = useSelector(state => state.currentPage.value);
  const bIsUserLoggedIn = useSelector(state => state.members.loggedIn);
  const currentMemberUser = useSelector(state => state.members.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  //capture the user's mentors username if there is a mentor
  const usersMentorUsername = currentMemberUser?.mentorGroup?.mentor?.username || null;

  //called when the tab changes
  const handleChange = (event, newValue) => {
    //calls redux state reducer switch page to change current page state
    return dispatch(switchPage(newValue));
  };

  //called when the user clicks logout
  const logout = () => {
    //set logged in state to false, remove user state, delete token, and redirect to home
    dispatch(setLoggedIn(false));
    dispatch(logoutUser());
    Auth.logout();
    history.push('/');
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
              <Tab value="search" label="Search" component={Link} to={'/search'}/>
              <Tab value="yourProfile" label="Your Profile" component={Link} disabled={!bIsUserLoggedIn} to={bIsUserLoggedIn ? `/dashboard/${Auth.getProfile().username}` : '/login'}/>
              <Tab value="yourMentor" label="Your Mentor" component ={Link} disabled={!bIsUserLoggedIn || usersMentorUsername === currentMemberUser.username} to={bIsUserLoggedIn && currentMemberUser?.mentorGroup ? `/dashboard/${usersMentorUsername}` : '/login'}/>
              <Tab value="discussion" label="Discussion" component={Link} to={'/conversation'} disabled={!bIsUserLoggedIn}/>
              <Tab value="login" label="Login/Register" component={Link} to={'/login'} disabled={bIsUserLoggedIn}/>
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

          {!bIsUserLoggedIn ? (
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