import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
import { useMediaQuery } from '@mui/material';

export default function ResponsiveTabs(){

    //returns true if the size of the screen is below lg
    const isLgScreen = useMediaQuery(theme => theme.breakpoints.down("lg"));
    const isMdScreen = useMediaQuery(theme => theme.breakpoints.down("md"));

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
        <Tabs
            value={currentPage}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
        >
            <Tab 
                value="home" 
                label={!isLgScreen ? "Home" : null}
                icon={<HomeIcon/>} 
                iconPosition='start' 
                component={Link} 
                to={'/'}
                sx={isMdScreen ? {minWidth: "15vw"} : null}
            />
            <Tab 
                value="search" 
                label={!isLgScreen ? "Search" : null}
                icon={<PersonSearchIcon/>} 
                iconPosition='start' 
                component={Link} 
                to={'/search'}
                sx={isMdScreen ? {minWidth: "15vw"} : null}
            />
            <Tab 
                value="yourProfile" 
                label={!isLgScreen ? "Your Profile" : null}
                icon={<AccountBoxIcon/>} 
                iconPosition='start' 
                component={Link} 
                disabled={!bIsUserLoggedIn} 
                to={bIsUserLoggedIn ? `/dashboard/${Auth.getProfile().username}` : '/login'}
                sx={isMdScreen ? {minWidth: "15vw"} : null}
            />
            <Tab 
                value="yourMentor"
                label={!isLgScreen ? "Your Mentor" : null} 
                icon={<EmojiPeopleIcon/>} 
                iconPosition='start' 
                component ={Link} 
                disabled={disableYourMentorButton()} 
                to={currentMemberUser?.mentorGroup ? `/dashboard/${usersMentorUsername}` : '/login'}
                sx={isMdScreen ? {minWidth: "15vw"} : null}
            />
            <Tab 
                value="discussion" 
                label={!isLgScreen ? "Discussion" : null} 
                icon={<ChatIcon/>} 
                iconPosition='start' 
                component={Link} 
                to={'/conversation'} 
                disabled={disableDiscussionButton()}
                sx={isMdScreen ? {minWidth: "15vw"} : null}
            />
            <Tab 
                value="login" 
                label={!isLgScreen ? "Login/Register" : null} 
                icon={<LoginIcon/>} 
                iconPosition='start' 
                component={Link} 
                to={'/login'} 
                disabled={bIsUserLoggedIn}
                sx={isMdScreen ? {minWidth: "15vw"} : null}
            />
        </Tabs>
    );
}