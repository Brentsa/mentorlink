import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';
import Auth from '../../utils/AuthService';
import { useSelector, useDispatch } from 'react-redux';
import { switchPage } from '../../redux/slices/pageSlice';
import { logoutUser, setLoggedIn } from '../../redux/slices/memberSlice';
import { useHistory } from 'react-router';
import ResponsiveTabs from '../misc/ResponsiveTabs'
import LogoutIcon from '@mui/icons-material/Logout';


export default function Header() {
  //get the state of current page from Redux and define the dispatch method for state reduction
  const bIsUserLoggedIn = useSelector(state => state.members.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();

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
          
          <Typography variant="h4" color="inherit" sx={{textDecoration: 'none'}}>MentorLink</Typography>  

          <ResponsiveTabs/>

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