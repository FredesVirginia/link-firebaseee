import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import AuthProvider from '../components/AuthProvider';
import { existsUsername , updaterUser } from '../firebase/firebase';
import styles from "./choose.module.css";


export default function ChooseUserNameView () {
  const navigate = useNavigate();
  const [state , setState] = React.useState(0);
  const [currentUser , setCurrentUser] = React.useState({});
  const [username , setUsername] = React.useState("");

  function handleUserLoggendIn (user){
    navigate("/dashboard")
}

function handleUserNotLoggendIn(user){
    navigate("/login")
}

function handleUserNotRegistered (user){
 setCurrentUser(user);
 setState(3);
}


 function handleInputUserName (e){
    setUsername(e.target.value)
 }

  async function handleContinue () {
    if(username !== ""){
      const exists = await existsUsername(username);
      if(exists){
        setState(5);
      }
      else{
        const tmp = {...currentUser};
        tmp.username = username;
        /**Este processCompleted es para que el usuario no vuelva a parasar por esta VIsta */
        tmp.processCompleted = true;
        await updaterUser(tmp);
        setState(6);
      }
    
    }
 }

 if( state=== 3 || state === 5 ){
    return (
      <div className={styles.chooseUserContainer}>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para Terminar el proceso elige un nombre de Usuario </p>
        {state === 5 ?( <p>El nombre ya existe, elige otro </p> ) : (<p></p>)}
        <div>
          <input className='input' type="text" onChange={handleInputUserName} />
        </div>
        <div>
          <button className='btn' onClick={handleContinue}>Continuar</button>
        </div>
     
      </div>
    )
 }


    if(state === 6){
      return <div className={styles.chooseUserContainer}>
        <h1>Felcidades !1 Y puedes ir al Dashboard a Crear tus Links</h1>
        <Link  className="a" to ="/dashboard"> Continuar</Link>
  
      </div>
    }


  return (
    <AuthProvider
    onUserLoggendIn={handleUserLoggendIn}
    onUserNotRegistered={handleUserNotRegistered}
    onUserNotLoggendIm={handleUserNotLoggendIn}
    >
      Loading.....
    </AuthProvider>
  )
}

