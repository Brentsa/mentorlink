import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QUERY_MEMBER } from '../../utils/queries';
import { useLazyQuery } from "@apollo/client";
import { loginUser, setLoggedIn } from '../../redux/slices/memberSlice';
import Auth from "../../utils/AuthService";

export default function ContentContainer(props){

  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.members.loggedIn);

  //lazy query the current user if their login token is still valid
  const [queryCurrentUser] = useLazyQuery(QUERY_MEMBER, {
    fetchPolicy: "network-only", 
    onCompleted: data => dispatch(loginUser(data.member))
  });

  //after the component has rendered, set the user logged in state to true if they are logged in via Auth
  useEffect(()=>{
    //if the use is logged in, set the logged in state to true
    if(Auth.UserLoggedIn()){
      dispatch(setLoggedIn(true));
    } 
    
    //if the user is logged in then save the user 
    if(loggedIn){
      queryCurrentUser({variables: {username: Auth.getProfile().username}});
    } 
  }, [dispatch, queryCurrentUser, loggedIn])

  //return a container with all of the children given to this container
  return <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>{props.children}</Box>
}