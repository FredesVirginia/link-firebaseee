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
  console.log("El link que llega a firebase INSERTnewLin es :" , link);
   try{
      const docRef = collection(db , "links");
      const res = await addDoc(docRef , link);
      return res;
   }catch(error){
      console.error(error);

   }
   }

   export async function getLinks(uid) {
    if (typeof uid !== 'string' && typeof uid !== 'number') {
      throw new Error('El UID debe ser una cadena o un número.');
    }
  
    // Convierte el UID a una cadena si es un número
    const uidString = typeof uid === 'number' ? uid.toString() : uid;
  
    const links = [];
  
    try {
      const collectionRef = collection(db, "links");
      const q = query(collectionRef, where('uid', '==', uidString));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(doc => {
        const linkData = doc.data();
        const link = { docId: doc.id, ...linkData };
        links.push(link);
      });
  
      return links;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  export async function updateLink (docId , link){
    try{
      //aqui como solo voy a buscar un unico documento
      //utilo la funcion doc()
      const docRef = doc(db ,"links" , docId );
      const res = await setDoc(docRef , link);
      return res;
    }catch(error){
        console.error(error);
    }
  }



  //con esta funcion decodificamos el archivo para subirlo
  //a firebase, en bytes
  export async function setUserProfile(uid , file){
    //aqui la parte de images, seria el nombre del carpeta
    //donde se va a guardar el file
      try{
        const imageRef = ref(storage , `images/${uid}`);
        const resUpload = await uploadBytes(imageRef , file);
        return resUpload;
      }catch(error){
        console.error(error);
      }
  }
//qwswqdqw

  // y con esta funcion descargamso la imagen de firebase
  // para que aparesca en nuestra intefaz

  export async function  getProfilePhotoUrl(profilePicture){
    try{
      const imageRef = ref(storage , profilePicture );
      const url = await getDownloadURL(imageRef);
      return url ; 
    }catch(error){
      console.error(error);
    }
  }


  export async function deleteLink(docId){
    try{
        const docRef = doc(db , "links" , docId);
        const res = await deleteDoc(docRef);
        return res;

    }catch(error){
      console.log(error);
    }

  }
  


