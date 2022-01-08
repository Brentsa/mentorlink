import LoginForm from "../components/login-register/LoginForm";
import LogRegSwitch from "../components/login-register/LogRegSwitch";
import { switchPage } from "../redux/slices/pageSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function Login(){
    const dispatch = useDispatch();
    
    //when the page loads, change to login tab
    useEffect(()=>{
        return dispatch(switchPage('login'));
    })

    return (
        <div>
            <LoginForm/>
            <LogRegSwitch/>    
        </div>
    )
}