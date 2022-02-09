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
import Auth from '../../utils/AuthService';
import { useSelector, useDispatch } from 'react-redux';
import { switchPage } from '../../redux/slices/pageSlice';
import { logoutUser, setLoggedIn } from '../../redux/slices/memberSlice';
import { useHistory } from 'react-router';

import HomeIcon from '@mui/icons-material/Home';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

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

  function disableYourMentorButton(){
    //disable your mentor button if the user isn't logged in, they are the mentor of their group, or they don't have a mentor group
    return !bIsUserLoggedIn || usersMentorUsername === currentMemberUser.username || !currentMemberUser?.mentorGroup;
  }

  function disableDiscussionButton(){
    //return true if the user isnt logged in or they don't have a mentor group
    return !bIsUserLoggedIn || !currentMemberUser?.mentorGroup;
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
              <Tab value="home" label="Home" icon={<HomeIcon/>} iconPosition='start' component={Link} to={'/'}/>
              <Tab value="search" label="Search" icon={<PersonSearchIcon/>} iconPosition='start' component={Link} to={'/search'}/>
              <Tab value="yourProfile" label="Your Profile" icon={<AccountBoxIcon/>} iconPosition='start' component={Link} disabled={!bIsUserLoggedIn} to={bIsUserLoggedIn ? `/dashboard/${Auth.getProfile().username}` : '/login'}/>
              <Tab value="yourMentor" label="Your Mentor" icon={<EmojiPeopleIcon/>} iconPosition='start' component ={Link} disabled={disableYourMentorButton()} to={currentMemberUser?.mentorGroup ? `/dashboard/${usersMentorUsername}` : '/login'}/>
              <Tab value="discussion" label="Discussion" icon={<ChatIcon/>} iconPosition='start' component={Link} to={'/conversation'} disabled={disableDiscussionButton()}/>
              <Tab value="login" label="Login/Register" icon={<LoginIcon/>} iconPosition='start' component={Link} to={'/login'} disabled={bIsUserLoggedIn}/>
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
            <IconButton color="inherit" onClick={logout}>
              <LogoutIcon fontSize="large"/>
            </IconButton>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}