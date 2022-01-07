import { Route, Redirect } from "react-router";
import Auth from "../../utils/AuthService";


export default function AuthRoute({component: Component, ...rest}){
    return (
        <Route
            {...rest}
            render={props => Auth.UserLoggedIn() 
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
            }
        />
    )
}