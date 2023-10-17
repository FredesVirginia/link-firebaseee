import React from 'react'
import { Link } from 'react-router-dom'
export default function DashboardWraper({children}) {
  return (

   
    <div>
        <nav>
            <div>Logotipo</div>
            <Link to="/dashboard">Links</Link>
            <Link to="/dashboard/profile" >Links</Link>
            <Link to="/dashboard/profile" >Links</Link>
            <Link to="/signout" >Signout</Link>
        </nav>
      {children}
    </div>
  )
}
