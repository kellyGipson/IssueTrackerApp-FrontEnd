import React from 'react'

type propTypes = {
  userLoggedIn: boolean,
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

const Dashboard = ({userLoggedIn, setUserLoggedIn}: propTypes) => {
  return (
    <div>
      Dashboard
      <button onClick={() => setUserLoggedIn(false)}>SignOut</button>
    </div>
  )
}

export default Dashboard