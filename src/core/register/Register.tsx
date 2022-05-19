// Libraries
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import InputField from "../shared/components/InputField";
import Button from "../shared/components/Button"

// --- State Machines --- \\

// States are: idle, loading, error, and success | SUBMIT_IDLE, SUBMIT_ERROR, SUBMIT_SUCCESS, and RESET_FORM
import { states, updateState as updateRegisterState } from "../shared/StateMachine"; 
import { USE_STATE_STRING } from "../../types/UseStateTypes";

const statesTemps = {
  submit: "SUBMIT_FORM",
  error: "SUBMIT_FORM_ERROR",
  success: "SUBMIT_FORM_SUCCESS",
  reset: "RESET_FORM",
}

// --- End State Machine --- \\

type propTypes = {
  email: string, 
  setEmail: React.Dispatch<SetStateAction<string>>, 
  password: string, 
  setPassword: React.Dispatch<SetStateAction<string>>, 
  firstName: string,
  setFirstName: React.Dispatch<SetStateAction<string>>,
  lastName: string,
  setLastName: React.Dispatch<SetStateAction<string>>,
}

const Register = (props: propTypes) => {
  let navigate = useNavigate();

// --- State --- \\

  const [currentRegisterState, setCurrentRegisterState] = useState(states.idle);
  const [inputFieldStyle, setInputFieldStyle]:USE_STATE_STRING = useState("border-slate-300");
  
// --- Function Declarations --- \\

  const inputFieldStyles = (): string => {
    let currentInputFieldStyle = "";
    switch(currentRegisterState) {
      case "idle": { currentInputFieldStyle = "border-slate-300"; break; }
      case "loading": { currentInputFieldStyle = "border-slate-300"; break; }
      case "error": { currentInputFieldStyle = "border-red-400"; break; }
      case "success": { currentInputFieldStyle = "border-green-400"; break; }
    }
    return currentInputFieldStyle;
  }

  function hasSpecialCharacters(s: string) {
    const specialCharacters = "!@#$%^&*()_+"
    for(let i = 0; i < specialCharacters.length; i++) {
      if (s.includes(specialCharacters[i])) {
        return true;
      };
    }
    return false;
  }  
  
  const handleRegister = () => {
    updateRegisterState(setCurrentRegisterState, statesTemps.submit);
    try {
      sendPseudoRegisterRequest();
      updateRegisterState(setCurrentRegisterState, statesTemps.success);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000)
    } catch (e) {
      updateRegisterState(setCurrentRegisterState, statesTemps.error);
    }
  }
  
  const sendPseudoRegisterRequest = () => {
    if(!props.email.includes("@")) {
      throw new Error("no @");
    }
    if(!props.email.includes(".")) {
      throw new Error("no .");
    }
    if(props.firstName === "") {
      throw new Error("no firstName");
    }
    if(props.lastName === "") {
      throw new Error("no lastName");
    }
    if(props.password === "") {
      throw new Error("no pw");
    }
    if(props.password.length <= 8) {
      throw new Error("pw <= 8");
    }
    if(props.password.toLowerCase() === props.password) {
      throw new Error("no uppercase in pw");
    }
    if(!hasSpecialCharacters(props.password)) {
      throw new Error("pw has no sp");
    }
    let userData = { email: props.email, password: props.password, firstName: props.firstName, lastName: props.lastName }
    localStorage.setItem("userData", JSON.stringify(userData));
    sessionStorage.setItem("canStayLoggedIn", "true");
    props.setPassword("");
  }

  // Lifecycle Changes & State Updates
  useEffect(() => {
    setInputFieldStyle(() => inputFieldStyles());
    console.log(currentRegisterState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRegisterState])

  useEffect(() => {
    console.log(props.password);
  }, [props.password])
  
  // JSX
  
  return (
    <div id="registerCard" className="h-full w-full flex justify-center items-center text-neutral-500 bg-slate-50">
      <div className="w-96 p-8 xs:rounded-lg shadow-2xl bg-white">
        <h1 className="w-full text-lg text-left font-bold">Sign Up</h1>
        <InputField id="firstname" inputName="First Name" onChangeFn={e => props.setFirstName(e.currentTarget.value)} styles={inputFieldStyle} onClickFn={() => updateRegisterState(setCurrentRegisterState, statesTemps.reset)}/>
        <InputField id="lastname" inputName="Last Name" onChangeFn={e => props.setLastName(e.currentTarget.value)} styles={inputFieldStyle} onClickFn={() => updateRegisterState(setCurrentRegisterState, statesTemps.reset)}/>
        <InputField id="email" inputName="Email Address" onChangeFn={e => props.setEmail(e.currentTarget.value)} styles={inputFieldStyle} onClickFn={() => updateRegisterState(setCurrentRegisterState, statesTemps.reset)}/>
        <InputField id="password" inputName="Password" onChangeFn={e => props.setPassword(e.currentTarget.value)} styles={inputFieldStyle} onClickFn={() => updateRegisterState(setCurrentRegisterState, statesTemps.reset)}/>
        <Button buttonText="Sign Up" onClickFn={() => handleRegister()}/>
        <div className="pt-4 text-center">
          Already have an account?&nbsp;
          <button className="underline text-blue-500" onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Register