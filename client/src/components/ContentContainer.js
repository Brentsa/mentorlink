import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { QUERY_MEMBER } from '../utils/queries';
import { useLazyQuery } from "@apollo/client";
import { loginUser, setLoggedIn } from '../redux/slices/memberSlice';
import Auth from "../utils/AuthService";

export default function ContentContainer(props){

    const dispatch = useDispatch();

    //lazy query the current user if their login token is still valid
    const [queryCurrentUser] = useLazyQuery(QUERY_MEMBER, {
      fetchPolicy: "network-only", 
      onCompleted: data => dispatch(loginUser(data.member))
    })
  
    //after the component has rendered, set the user logged in state to true if they are logged in via Auth
    useEffect(()=>{
      //if the use is logged in, set the logged in state to true
      if(Auth.UserLoggedIn()){
        dispatch(setLoggedIn(true));
        queryCurrentUser({variables: {username: Auth.getProfile().username}});
      } 
    }, [dispatch, queryCurrentUser])

    //return a container with all of the children given to this container
    return <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh'}}>{props.children}</Box>
}