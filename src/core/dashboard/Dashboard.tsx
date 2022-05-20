// --- Libraries --- \\
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiFillHome, AiFillShop } from 'react-icons/ai'
import { RiTicketFill } from 'react-icons/ri'
import { IoMdAddCircle } from 'react-icons/io'
import { BsPersonBadge } from 'react-icons/bs'

// --- Components --- \\
import MenuButton from "../shared/components/MenuButton"
import { handleActiveNav } from './functions/dashboardFunctions'

type propTypes = {
  userLoggedIn: boolean,
  setUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
}

const Dashboard = ({userLoggedIn, setUserLoggedIn}: propTypes) => {
  // --- Library Constants --- \\
  const navigator = useNavigate();
  
  // --- State Actions --- \\
  const navActions = {
    home: "home",
    issues: "issues",
    addDown: "addDown",
    addUp: "addUp",
    group: "group",
    profile: "profile",
  }
  
  // --- State --- \\
  const [currentSelectedNavItem, setCurrentSelectedNavItem] = useState(navActions.home);
  const [prevSelectedNavItem, setPrevSelectedNavItem] = useState(navActions.home);
  
  // --- Function Declarations --- \\  
  const handleSignOut = () => {
    setUserLoggedIn(false);
    sessionStorage.removeItem("canStayLoggedIn");
    navigator("/login");
  }

  // --- UseEffects --- \\
  useEffect(() => {
    handleActiveNav(prevSelectedNavItem, currentSelectedNavItem, setPrevSelectedNavItem);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedNavItem])
  
  // --- JSX --- \\
  return (
    <div id='dashboardContainer' className='h-screen bg-neutral-100'>
      <nav className='h-24 w-screen fixed flex justify-around items-center  bottom-0 bg-white text-gray-400'>
        <div id='homeContainer' className='w-10 flex flex-col justify-center items-center' onClick={() => setCurrentSelectedNavItem(navActions.home)}>
          <AiFillHome id='home' className='w-8 h-8'/>
          <MenuButton text="Home"/>
          <div id='homeSelector' className='hidden absolute -translate-y-[2.875rem] rounded w-10 h-1 bg-teal-400'></div>
        </div>
        <div id='issuesContainer' className='w-10 flex flex-col justify-center items-center' onClick={() => setCurrentSelectedNavItem(navActions.issues)}>
          <RiTicketFill id='issues' className='w-8 h-8'/>
          <MenuButton text="Issues"/>
          <div id='issuesSelector' className='hidden absolute -translate-y-[2.875rem] rounded w-10 h-1 bg-teal-400'></div>
        </div>
        <div className='w-10 flex flex-col justify-center items-center text-teal-400' onMouseDown={() => setCurrentSelectedNavItem(navActions.addDown)} onMouseUp={() => setCurrentSelectedNavItem(navActions.addUp)}>
          <IoMdAddCircle id='add' className='h-18 w-18 drop-shadow-xl transition-all'/>
          <div id='addSelector' className='hidden absolute -translate-y-[2.875rem] rounded w-10 h-1 bg-teal-400'></div>
        </div>
        <div id='groupContainer' className='w-10 flex flex-col justify-center items-center' onClick={() => setCurrentSelectedNavItem(navActions.group)}>
          <AiFillShop id='group' className='w-8 h-8'/>
          <MenuButton text="Group"/>
          <div id='groupSelector' className='hidden absolute -translate-y-[2.875rem] rounded w-10 h-1 bg-teal-400'></div>
        </div>
        <div id='profileContainer' className='w-10 flex flex-col justify-center items-center' onClick={() => setCurrentSelectedNavItem(navActions.profile)}>
          <BsPersonBadge id='profile' className='w-8 h-8'/>
          <MenuButton text="Profile"/>
          <div id='profileSelector' className='hidden absolute -translate-y-[2.875rem] rounded w-10 h-1 bg-teal-400'></div>
        </div>
      </nav>
      <main className=''>
        <button onClick={() => handleSignOut()}>SignOut</button>
      </main>
    </div>
  )
}

export default Dashboard