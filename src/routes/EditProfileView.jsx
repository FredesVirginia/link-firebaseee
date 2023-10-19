import React , {useState , useRef } from 'react';
import styles from "./editProfile.module.css";
import DashboardWraper from '../components/DashboardWraper'
import AuthProvider from '../components/AuthProvider'
import { useNavigate } from 'react-router-dom';
import { getProfilePhotoUrl, setUserProfile, updaterUser } from '../firebase/firebase';

export default function EditProfileView() {

 const navigate = useNavigate();
 const [state , setState] = useState(0);
 const [currentUser , setCurrentUser] = useState({});
  //estado para el cambio de imagen 
 const [profileUrl , setProfileUrl] = useState(null);
 const fileRef = useRef(null);
  async function handleUserLoggendIn (user){
    //wedew
     setCurrentUser(user);
     const url = await getProfilePhotoUrl(user.profilePicture);
     setProfileUrl(url);
     setState(2);
     
   }

      function handleUserNotLoggendIn(user){
        navigate("/login");
        
      }

      function handleUserNotRegistered (user){
      navigate("/login");
      }

      function handleOpenFilePicker () {
        if(fileRef.current);
        fileRef.current.click();
      }

     async function handleChangeFile(e){
        const files = e.target.files;
        // FileReader es una biblioteca de JavaScript
        //que nos ayuda a transformaun archivo en bytes
        const filesReader = new FileReader();
        if(filesReader && files && files.length > 0){
          //esta funcion no ayuda a transforma el archivo en 
          // en un bloc, un archivo propio e Firebase
          // aqui le poner 0, para decir que sea el primer
          //elemento que encuentres
            filesReader.readAsArrayBuffer(files[0]);
            filesReader.onload = async function (){
              const imageData = filesReader.result;

              const res = await setUserProfile(currentUser.uid , imageData);
              console.log("resultdo" , res);

              if(res){
                const tempUser = {...currentUser};
                tempUser.profilePicture = res.metadata.fullPath;
                await updaterUser(tempUser);
                setCurrentUser({...tempUser});

                console.log("La picture en currente file es " , currentUser.profilePicture)

                const url = await getProfilePhotoUrl(currentUser.profilePicture);
                setProfileUrl(url);
              }
            }
        }
      }

      if(state !== 2 ){
        return  <AuthProvider 
          onUserLoggendIn={handleUserLoggendIn} 
          onUserNotLoggendIm={handleUserNotLoggendIn} 
          onUserNotRegistered={handleUserNotRegistered}>

        </AuthProvider>
      }
  return (
    
      <DashboardWraper>
        <h1>EditProfileView</h1>
        <div>
          <h2>Edit Profile Info</h2>
          <div className={styles.profilePictureContainer}>
            <div>
              <img src={profileUrl} alt="" width={100}/>
            </div>
            <div>
              <button
              className='btn'
               onClick={handleOpenFilePicker}
              >
                Choose new Profile Picture

              </button>
             
              <input 
              className={styles.fileInput}
              type="file" 
              ref={fileRef}
              style={{display : "none"}}
              onChange={handleChangeFile}
              />
              
            </div>
          </div>
        </div>
      </DashboardWraper>
    
  )
}
