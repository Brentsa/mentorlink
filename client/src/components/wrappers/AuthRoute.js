import { Route, Redirect } from "react-router";
import Auth from "../../utils/AuthService";


export default function AuthRoute({children, ...rest}){
    console.log(Auth.UserLoggedIn());
    
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