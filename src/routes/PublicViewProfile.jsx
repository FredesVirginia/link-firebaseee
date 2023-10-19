import React , {useState , useEffect}from 'react'
import {useParams} from "react-router-dom";
import { existsUsername  , getProfilePhotoUrl, getUserPublicProfileInfo} from '../firebase/firebase';
import PublicLinks from '../components/PublicLinks';
import DashboardWraper from '../components/DashboardWraper';
import styles from "./profilePublic.module.css"

export default function PublicViewProfile() {
  const params = useParams();
  const [profile , setProfile] = useState("");
  const [url , setUrl] = useState("");
  //el estado 7 quiere decir que no existe
  const [state , setState] = useState(0);

  useEffect( ()=>{
    getProfile();
     async function getProfile(){
      const username = params.username;
    try{
      const userUid = await existsUsername(username);
      console.log("El username en public profile es " , userUid);
      if(userUid){
       console.log("PASO EL INFO");
        const userInfo = await getUserPublicProfileInfo(userUid);
        console.log("El user Info encontrado es " , userInfo);
          setProfile(userInfo);
         
          const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
          setUrl(url);
      }else{
        setState(7);
      }
    
    }catch(error){
    
    }
     }
  } , [params]);


  if(state === 7){
    return (
      <div><h1>Username doesn"t existe</h1></div>
    )
  }else{

    if(profile && url){
      return <div className={styles.profileContainer}>
          <div className={styles.profilePicture}>
          <img src={url} width={200} alt=""/>
          </div>
        <h2>{profile.profileInfo.username}</h2>
        <h3>{profile.profileInfo.displayName}</h3>
        <h2>Links</h2>
        <div className={styles.publicLinksContainer}>
          {profile?.linksInfo.map((link) =>(
            <PublicLinks key={link.docId} url={link.url} title={link.title} />
          ))}
        </div>
         </div>
     
    }else{
      return <h2>Cargando..</h2>
      
    }
  }

  

  
}
