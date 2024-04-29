import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import AppNavbar from '../Navbar/Navbar'
import { userContext } from '../../Context/TokenContext'
export default function Layout() {
  const {setUserToken}=useContext(userContext)
  useEffect(()=>{
    if (localStorage.getItem('userToken') !==null) 
    {
      setUserToken(localStorage.getItem('userToken'))
    } 
  },[])
  return (
    <div>
      <AppNavbar/>
      <div className="container">
      <Outlet/>

      </div>
    </div>
  )
}
