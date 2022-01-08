import { Redirect, Route } from "react-router-dom";
import Auth from "../../utils/AuthService";

//Route for guests only, redirect to user dashboard if logged in
export default function GuestRoute({children, ...rest}){

    return (
        <Route {...rest}>
            {Auth.UserLoggedIn() ?
                <Redirect to={`dashboard/${Auth.getProfile().username}`}/>
                :
                children
            }
        </Route>
    )
}