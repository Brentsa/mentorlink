import { Route, Redirect } from "react-router";
import Auth from "../../utils/AuthService";

//Auth protected route, redirect user if not logged in
export default function AuthRoute({children, ...rest}){
    
    return (
        <Route {...rest}>
            {Auth.UserLoggedIn() ? 
                children
                :
                <Redirect to='/login'/>
            }
        </Route>
    )
}