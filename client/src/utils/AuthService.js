import jwt_decode from "jwt-decode";

//Authorization service that handles JWT front-end functionality
class AuthService{

    //return a bool value contingent on the user's logged in status
    UserLoggedIn(){
        //get the user profile from the token
        const decodedToken = this.getProfile();

        //return true if the token is valid and not expired
        return decodedToken && !this.isTokenExpired(decodedToken);
    }

    //provide a boolean determined by the token expiry
    isTokenExpired(decodedToken){
        try{
            //compare the expiry on the token with the current date and return boolean
            decodedToken.exp < Date.now()/1000 ? true : false;
        }
        catch{
            return true;
        }
    }

    //returns the decoded profile of the user
    getProfile(){
        return jwt_decode(this.getToken());
    }

    //return the token in local storage
    getToken(){
        return localStorage.getItem('token');
    }

    //called when the user is logged in, saves the token to local storage
    login(tokenId){
        //save the token in localStorage
        localStorage.setItem('token', tokenId);

        //Redirect user to dashboard
        window.location.assign('/dashboard');
    }

    //called then the user logs out, removes the token from local storage
    logout(){
        //remove the token from localStorage
        localStorage.removeItem('token');

        //send the user back to home
        window.location.assign('/');
    }
}

export default new AuthService();