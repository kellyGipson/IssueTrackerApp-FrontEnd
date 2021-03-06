// Libraries
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Components
import Login from './core/login/Login';
import Dashboard from './core/dashboard/Dashboard';
import Register from './core/register/Register';

// Types
import { USE_STATE_STRING } from './types/UseStateTypes';

// Styles
import './App.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [email, setEmail]: USE_STATE_STRING = useState("");
  const [password, setPassword]: USE_STATE_STRING = useState("");
  const [firstName, setFirstName]: USE_STATE_STRING = useState("");
  const [lastName, setLastName]: USE_STATE_STRING = useState("");

  let navigate = useNavigate();

  const checkUserLoggedIn = (): boolean => {
    if(sessionStorage.getItem("canStayLoggedIn")) {
      return true;
    }

    return false;
  }

  
  useEffect(() => {
    if(checkUserLoggedIn()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [userLoggedIn])
  
  return (
    <>
      <Routes>
          <Route 
            path="login" 
            element={
              <Login 
                userLoggedIn={userLoggedIn} 
                setUserLoggedIn={setUserLoggedIn} 
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword}
              />
            }
          />
          <Route 
            path="register" 
            element={
              <Register 
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword}
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
              />
            }
          />
          <Route path="dashboard" element={<Dashboard userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>}/>
      </Routes>
    </>
  );
}

export default App;
