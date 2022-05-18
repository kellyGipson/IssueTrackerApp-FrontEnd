import { useState, useEffect } from 'react';

import Login from './core/login/Login';

import './App.css';
import Dashboard from './core/dashboard/Dashboard';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  
  return (
    <>
      {
        (!userLoggedIn) ? 
        <Login userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/> : 
        <Dashboard userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>
      }
    </>
  );
}

export default App;
