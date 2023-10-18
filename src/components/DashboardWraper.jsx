import React from 'react'
import { Link } from 'react-router-dom'
export default function DashboardWraper({children}) {
  return (

   //dwedew
    <div>
        <nav>
            <div>Logotipo</div>
            <Link to="/dashboard">DashBoard</Link>
         
            <Link to="/dashboard/profile" >Link Profile</Link>
            <Link to="/signout" >Signout</Link>
        </nav>
      {children}
    </div>
  )
}
