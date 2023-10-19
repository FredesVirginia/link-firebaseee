import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./dashboardWraper.module.css";


export default function DashboardWraper({children}) {
  return (

   //dwedew
    <div>
        <nav className={styles.nav} >
            <div className={styles.logo}> Logotipo</div>
            <Link className= {styles.a} to="/dashboard">DashBoard</Link>
         
            <Link className= {styles.a} to="/dashboard/profile" >Link Profile</Link>
            <Link className= {styles.a} to="/signout" >Signout</Link>
        </nav>
      <div className='main-container'>
      {children}
      </div>
    </div>
  )
}
