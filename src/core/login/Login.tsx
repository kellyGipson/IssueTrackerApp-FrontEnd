// Libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import InputField from "../shared/components/InputField";
import Button from "../shared/components/Button"
import { USER } from "../../types/User"; // Defines the typing of the user's saves data

// --- State Machines --- \\

// States are: idle, loading, error, and success | SUBMIT_IDLE, SUBMIT_ERROR, SUBMIT_SUCCESS, and RESET_FORM
import { states, updateState as updateLoginState } from "../shared/StateMachine"; 
import { USE_STATE_STRING } from "../../types/UseStateTypes";

const statesTemps = {
  submit: "SUBMIT_FORM",
  error: "SUBMIT_FORM_ERROR",
  success: "SUBMIT_FORM_SUCCESS",
  reset: "RESET_FORM",
}

// --- End State Machine --- \\

type propTypes = {
  userLoggedIn: boolean,
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
}

const Login = (props: propTypes) => {
  // Library Variables
  let navigate = useNavigate();
  
  // State
  const [currentLoginState, setCurrentLoginState] = useState(states.idle);
  const [inputFieldStyle, setInputFieldStyle]:USE_STATE_STRING = useState("border-slate-300");
  
  //Function Declarations
  const inputFieldStyles = (): string => {
    //"idle""loading""error""success"
    let currentInputFieldStyle = "";
    
    switch(currentLoginState) {
      case "idle": {
        currentInputFieldStyle = "border-slate-300";
        break;
      }
      case "loading": {
        currentInputFieldStyle = "border-slate-300";
        break;
      }
      case "error": {
        currentInputFieldStyle = "border-red-400";
        break;
      }
      case "success": {
        currentInputFieldStyle = "border-green-400";
        break;
      }
    }
    
    return currentInputFieldStyle;
  }
  
  const handleLogin = () => {
    updateLoginState(setCurrentLoginState, statesTemps.submit);
    try {
      sendPseudoLoginRequest();
      updateLoginState(setCurrentLoginState, statesTemps.success);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000)
    } catch (e) {
      updateLoginState(setCurrentLoginState, statesTemps.error);
    }
  }
  
  const sendPseudoLoginRequest = () => {
    let userData = localStorage.getItem("userData") // Checking for local user data because there is no backend yet
    if(userData) {
      let userDataObject: USER = JSON.parse(userData);
      if(userDataObject.email.toLowerCase === props.email.toLowerCase && userDataObject.password === props.password) { // Check if inputted password matches what's in localStorage
        sessionStorage.setItem("canStayLoggedIn", "true");
        return;
      }
    }
    props.setPassword("");
    throw new Error("no match");
  }

  // Lifecycle Changes & State Updates
  useEffect(() => {
    setInputFieldStyle(() => inputFieldStyles());
    console.log(currentLoginState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLoginState])
  
  // JSX
  return (
    <div id="loginContainer" className="flex justify-center items-center h-full w-screen text-neutral-500 bg-slate-50">
      <div id="loginCard" className="w-96 p-8 xs:rounded-lg shadow-2xl bg-white">
        <h1 className="w-full text-lg text-left font-bold">Login</h1>
        <InputField id="loginemail" inputName="Email Address" onChangeFn={e => props.setEmail(e.currentTarget.value)} styles={inputFieldStyle} onClickFn={() => updateLoginState(setCurrentLoginState, statesTemps.reset)}/>
        <InputField id="loginpassword" inputName="Password" onChangeFn={e => props.setPassword(e.currentTarget.value)} styles={inputFieldStyle} onClickFn={() => updateLoginState(setCurrentLoginState, statesTemps.reset)}/>
        <Button buttonText="Login" onClickFn={() => handleLogin()}/>
        <div className="pt-4 text-center">
          Need an account?&nbsp;
          <button className="underline text-blue-500" onClick={() => navigate("/register")}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Login