import React from 'react'

type propTypes = {
  userLoggedIn: boolean,
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

const Login = ({userLoggedIn, setUserLoggedIn}: propTypes) => {
  return (
    <div className='login-container'>
      
      <button onClick={() => setUserLoggedIn(!userLoggedIn)}>Login</button>
    </div>
  )
}

export default Login