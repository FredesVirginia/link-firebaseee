import React , {useState , useEffect}from 'react'
import {useParams} from "react-router-dom";
import { existsUsername  , getUserPublicProfileInfo} from '../firebase/firebase';
export default function PublicViewProfile() {
  const params = useParams();
  const [profile , setProfile] = useState(null);

  useEffect( ()=>{
    getProfile();
     async function getProfile(){
      const username = params.username;
    try{
      const userExists = await existsUsername(username);
      if(userExists){
        const userInfo = await getUserPublicProfileInfo(userExists);
      }
    
    }catch(error){
    
    }
     }
  } , [params]);
  return (
    <div>
      <div>
        <img />
      </div>
      <h2>Username</h2>
      <h3>Display Name</h3>
      <div>Links</div>
    </div>
  )
}
