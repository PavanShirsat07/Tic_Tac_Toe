import React from 'react'
import reactLogo from '/vite.svg'
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from 'react-router-dom'
const NavBar = () => {
  const navigate=useNavigate();
  const play=()=>{
    navigate('/game')
  }
  const dash=()=>{
    navigate('/DashBord')
  }
  return (
   <>
    <div className='nav-container'>
          <div>
            <img src={reactLogo} alt="" height={40}/>
          </div>
          <div className='nav-button'>
           <div className='nav-btn' onClick={()=>{play()}}>Play</div>
           <div className='nav-btn' onClick={()=>{dash()}}>DashBord</div>
          </div>
    </div>
   </>
  )
}

export default NavBar
