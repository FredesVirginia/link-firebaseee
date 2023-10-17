// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import {getAuth} from "firebase/auth";
import {getStorage , ref , uploadBytes , getDownloadURL , getBytes} from "firebase/storage";
import { getFirestore , collection , addDoc , getDoc , 
  doc , getDocs ,query , where, setDoc , deleteDoc , docId } from "firebase/firestore";



const {  REACT_API_KEY,  REACT_MESSAGIN_SENDER_ID  , REACT_AUTH_DOMAIN ,
     REACT_PROYECT_ID , REACT_STORAGE_BUCKECT, REACT_APP_ID , REACT_MEASUREMENT_ID } = process.env;

const firebaseConfig = {

  apiKey:"AIzaSyCCtAcIHu5AxYDf6SMvcY_9HDZ0LSIZVbQ",
  authDomain: "link-three-d0b1a.firebaseapp.com",
  projectId: "link-three-d0b1a",
  storageBucket: "link-three-d0b1a.appspot.com",
  messagingSenderId: "950844638939",
  appId: "1:950844638939:web:dd7ba124b1a94264002efe",
  measurementId: "G-8KXY4W5FS7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function userExists(uid){
    const docRef = doc(db , "users" , uid);
    const res = await getDoc(docRef);
    console.log(res);
    return res.exists();
}

export async function existsUsername(username){
  const users= [];
  const docsRef = collection(db , "users");
  const q = query( docsRef , where('username' , '==' , username));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) =>{
    users.push(doc.data());
  });

  return users.length > 0 ? users[0].uid : null;
}


export async function registerNewUser(user){
  try {
    const collectionRef = collection(db , "users");
    const docRef = doc(collectionRef , user.uid)
    await setDoc(docRef , user);


  }catch(error){

  }
}

export async function updaterUser(user){
    try{
        const collectionRef = collection(db , "users");
        const docRef = doc(collectionRef , user.uid);
        await setDoc(docRef , user);
    }catch(error){

    }
}

export async function getuserInfo ( uid){
  try{
    const docRef = doc(db , "users" , uid);
    const document = await getDoc(docRef);
    return document.data();
  }catch(error){}
}

export async function insertNewLink (link){
   try{
      const docRef = collection(db , "links");
      const res = await addDoc(docRef , link);
      return res;
   }catch(error){
      console.error(error);

   }
   }

   export async function getLinks(uid){
    console.log("ELL UID EN GE LINK ES " , uid)
    const links =[];

    try{
        const collectionRef = collection(db , "links"); 
        const q = query(collectionRef , where('uid ' , '==' , uid))
        console.log("LA Q ES " , q);
      const querySnapshot = await getDocs(q);
        console.log("LA Q uerySnapootES " , querySnapshot);

      querySnapshot.forEach(doc => {
        console.log("POR EL FOR EACH ");
        const link = {...doc.data()};
        link.docId = doc.id; 
        console.log("LOS  LINK EN QUERYSNAPOT SON " , link);
        links.push(link);
      })
      console.log("ELL UID EN GE LIN  LINKK" , links)
        return links;
      }catch(error){
        console.error(error);
    }
   }


