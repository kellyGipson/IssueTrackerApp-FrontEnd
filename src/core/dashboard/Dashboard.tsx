import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type propTypes = {
  userLoggedIn: boolean,
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

const Dashboard = ({userLoggedIn, setUserLoggedIn}: propTypes) => {
  const navigator = useNavigate();
  
  const handleSignOut = () => {
    setUserLoggedIn(false);
    sessionStorage.removeItem("canStayLoggedIn");
    navigator("/login");
  }
  
  return (
    <div>
      Dashboard
      <button onClick={() => handleSignOut()}>SignOut</button>
    </div>
  )
}

export default Dashboard