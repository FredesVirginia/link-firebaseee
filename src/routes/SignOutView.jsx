import React from 'react'
import AuthProvider from '../components/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../firebase/firebase';
export default function SignOutView() {
  const navigate = useNavigate();

 async function handleUserLoggendIn(user) {
    await logOut();


  }

  function handleUserNotLoggendIn(user) {
      navigate("/login")

  }

  function handleUserNotRegistered(user) {
    navigate("/login")
  }
  return (
    <AuthProvider onUserNotLoggendIm={handleUserNotLoggendIn} onUserLoggendIn={handleUserLoggendIn} onUserNotRegistered={handleUserNotRegistered}>

    </AuthProvider>
  )
}
