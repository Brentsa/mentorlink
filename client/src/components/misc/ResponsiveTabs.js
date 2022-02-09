import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { switchPage } from '../../redux/slices/pageSlice';
import {Link} from 'react-router-dom';
import Auth from '../../utils/AuthService';

import HomeIcon from '@mui/icons-material/Home';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ChatIcon from '@mui/icons-material/Chat';
import LoginIcon from '@mui/icons-material/Login';

export default function ResponsiveTabs(){

    //get the state of current page from Redux and define the dispatch method for state reduction
    const currentPage = useSelector(state => state.currentPage.value);
    const bIsUserLoggedIn = useSelector(state => state.members.loggedIn);
    const currentMemberUser = useSelector(state => state.members.currentUser);
    const dispatch = useDispatch();

    //capture the user's mentors username if there is a mentor
    const usersMentorUsername = currentMemberUser?.mentorGroup?.mentor?.username || null;

    //called when the tab changes
    const handleChange = (event, newValue) => {
        //calls redux state reducer switch page to change current page state
        return dispatch(switchPage(newValue));
    };

    function disableYourMentorButton(){
        //disable your mentor button if the user isn't logged in, they are the mentor of their group, or they don't have a mentor group
        return !bIsUserLoggedIn || usersMentorUsername === currentMemberUser.username || !currentMemberUser?.mentorGroup;
    };
    
    function disableDiscussionButton(){
        //return true if the user isnt logged in or they don't have a mentor group
        return !bIsUserLoggedIn || !currentMemberUser?.mentorGroup;
    };

    return (
        <Box sx={{ width: '100%', display: {xs: 'none', lg: 'flex'}, justifyContent: 'center' }}>
            <Tabs
                value={currentPage}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="app bar icons"
            >
                <Tab 
                    value="home" 
                    label="Home" 
                    icon={<HomeIcon/>} 
                    iconPosition='start' 
                    component={Link} 
                    to={'/'}
                />
                <Tab 
                    value="search" 
                    label="Search" 
                    icon={<PersonSearchIcon/>} 
                    iconPosition='start' 
                    component={Link} 
                    to={'/search'}/>
                <Tab 
                    value="yourProfile" 
                    label="Your Profile" 
                    icon={<AccountBoxIcon/>} 
                    iconPosition='start' 
                    component={Link} 
                    disabled={!bIsUserLoggedIn} 
                    to={bIsUserLoggedIn ? `/dashboard/${Auth.getProfile().username}` : '/login'}/>
                <Tab 
                    value="yourMentor" 
                    label="Your Mentor" 
                    icon={<EmojiPeopleIcon/>} 
                    iconPosition='start' 
                    component ={Link} 
                    disabled={disableYourMentorButton()} 
                    to={currentMemberUser?.mentorGroup ? `/dashboard/${usersMentorUsername}` : '/login'}/>
                <Tab 
                    value="discussion" 
                    label="Discussion" 
                    icon={<ChatIcon/>} 
                    iconPosition='start' 
                    component={Link} 
                    to={'/conversation'} 
                    disabled={disableDiscussionButton()}/>
                <Tab 
                    value="login" 
                    label="Login/Register" 
                    icon={<LoginIcon/>} 
                    iconPosition='start' 
                    component={Link} 
                    to={'/login'} 
                    disabled={bIsUserLoggedIn}/>
            </Tabs>
        </Box>
    );
}