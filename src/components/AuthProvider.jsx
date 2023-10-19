
import React , {useEffect , useState} from 'react'
import {GoogleAuthProvider , onAuthStateChanged, signInWithPopup} from "firebase/auth";
import {auth  , userExists , getuserInfo,  registerNewUser} from "../firebase/firebase";

import {useNavigate} from "react-router-dom";

export default function AuthProvider({children , onUserLoggendIn , onUserNotLoggendIm , onUserNotRegistered}) {

    const navigate = useNavigate();
    const [curentUser , setCurrentUser] = useState(null);
    const [state , setCurrentState] = useState(0);
  
    /* 
      0= inicializado 
      1: loading
      2: login completo
      3 : login pero sin registro
      4 : no hay nadie logueado
    
    */
  
    useEffect(()=>{
      
      onAuthStateChanged(auth  ,async (user)=>{
        if(user){
           
          const isRegistered = await userExists(user.uid);
          if(isRegistered){
            const userInfo = await getuserInfo(user.uid);
            if(userInfo.processCompleted){
             
              onUserLoggendIn(userInfo);
            }else {
              console.log("Usuario logueado completo");
              onUserNotRegistered(userInfo);
  
            }
          }else{
            await registerNewUser({
                uid: user.uid,
                displayName : user.displayName,
                profilePicture : "",
                username : "",
                processCompleted: false

            })
             navigate("/choose-username");
            
          }
        }else{
        onUserNotLoggendIm()
        }
      })
    } , [navigate , onUserLoggendIn , onUserNotLoggendIm , onUserNotRegistered ]);
  return (
    <div>
      {children}
    </div>
  )
}
