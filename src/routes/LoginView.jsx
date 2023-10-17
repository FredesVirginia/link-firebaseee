import React from 'react';
import {GoogleAuthProvider , onAuthStateChanged, signInWithPopup} from "firebase/auth";
import {auth  , userExists} from "../firebase/firebase";
import { useEffect  , useState} from 'react';
import {useNavigate} from "react-router-dom";
import AuthProvider from '../components/AuthProvider';


export default function LoginView() {
  const navigate = useNavigate();
  const [curentUser , setCurrentUser] = useState(null);
  const [state , setCurrentState] = useState(0);

  /* 
    0= inicializado 
    1: loading
    2: login completo
    3 : login pero sin registro
    4 : no hay nadie logueado
    5: username ya existe
    6: nuevo username, click para continuar
  */

  
 

  async function handleOnClickGoogle  (){
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
    async function signInWithGoogle(googleProvider){
      try{
        const res = await signInWithPopup(auth , googleProvider)
        console.log(res);
      }catch(error){
          console.log("El error fue" , error)
      }
    }
  }

    function handleUserLoggendIn (user){
        navigate("/dashboard")
    }

    function handleUserNotLoggendIn(user){
      setCurrentState(4);
    }

    function handleUserNotRegistered (){
       
          navigate("choose-username")
    }

    if(state ===1){
      return <div>Loading </div>
    }

    if(state === 2){
      return <div>ESTAS AUNTENTICADO Y LOGUEADO  </div>
    }
    if(state === 3){
      return <div> Estas auntenticado peri no registrado</div>
    }
    if(state === 4){
      return <div> <button onClick={handleOnClickGoogle}  >Login with Google</button></div>
    }

    if(state ===  5){
      return <div> <button onClick={handleOnClickGoogle}  >Estado 5</button></div>
    }



        return(
        <AuthProvider
        onUserLoggendIn={handleUserLoggendIn}
        onUserNotRegistered={handleUserNotRegistered}
        onUserNotLoggendIm={handleUserNotLoggendIn}
        >
          Loading.....
        </AuthProvider>
        )
    


  
}
