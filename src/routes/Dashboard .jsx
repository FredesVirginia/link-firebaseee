import React from 'react'
import AuthProvider from '../components/AuthProvider';
import {Link, useNavigate} from "react-router-dom";
import DashboardWraper from '../components/DashboardWraper';
import {v4 as uuidv4} from "uuid";
import {insertNewLink , getLinks, updateLink} from "../firebase/firebase";
import Links from '../components/Links';

export default function Dashboard () {
  const navigate = useNavigate();
  const [state , setState] = React.useState(0);
  const [currentUser , setCurrentUser] = React.useState({});
  const [username , setUsername] = React.useState("");
  const [title , setTitle] = React.useState("");
  const [url , setUrl] = React.useState("");
  const [links , setLinks] = React.useState([]);
      
  
   async function handleUserLoggendIn (user){
       console.log("ESTA EN EL DASHBOARD LOGUEADO" , user)
        setCurrentUser(user);
        setState(2);
        const resLinks = await getLinks(user.uid);
        console.log("LOS LINK SON en el Dashboard " , resLinks);
      setLinks(resLinks);
      }

    function handleUserNotLoggendIn(user){
      navigate("/login");
      setState(2);
    }

    function handleUserNotRegistered (user){
    navigate("/login");
    }


    if( state === 0 ){
      <div>
      <h1>Este es el dashboard</h1>
      <AuthProvider
          onUserLoggendIn={handleUserLoggendIn}
          onUserNotRegistered={handleUserNotRegistered}
          onUserNotLoggendIm={handleUserNotLoggendIn}
          >
             Loading.....
    </AuthProvider>
    </div>
    }


    async function addLink() {
      if (title !== "" && url !== "") {
        console.log("El currentUser es ", currentUser.uid);
        const newLink = {
          id: uuidv4(),
          title: title,
          url: url,
          uid: currentUser ? currentUser.uid : null
        };
    
        if (newLink.uid === null) {
          console.error("currentUser is not defined or does not have a uid property");
          return;
        }
    
        try {
           console.log("1")
          const res = await insertNewLink(newLink);
          console.log("2")
          console.log("El new Link en el Dasboard es " , newLink)
          console.log("El res en el dasboard es =" , res);
          newLink.docId = res.id;
           console.log("3")
          setTitle("");
          setUrl("");

          setLinks((prevLinks) => [...prevLinks, newLink]); // Actualizar el estado correctamente

        } catch (error) {
         console.log("4")
          console.error("Error al insertar el nuevo enlace:", error);
        }
      }
    }
    

    function handleOnSubmit (e){
        e.preventDefault();
        addLink();
    }

    function handleOnChange (e){
      const { name, value } = e.target;

    if (name === 'title') {
      setTitle(value);
    } else if (name === 'url') {
      setUrl(value);
    }
    }

    if(state === 0){
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

    async function handleDeleteLink(docId , title , url){

    }

    async function handleUpdateLink (docId , title , url) {
        const link = links.find(item => item.docId === docId)
        link.title = title ;
        link.url = url;
        await updateLink(docId , link);
    
      }
  return (
     <DashboardWraper>
      <div>
        <h1> Dashboard</h1>
        <h2> El user  es : </h2>
        <form action ="" onSubmit = {handleOnSubmit}>
          <label htmlFor="title" >Title</label>
          <input onChange={handleOnChange} type="text " name="title"/>
       
          <label htmlFor="url" >url</label>
          <input onChange={handleOnChange} type="text " name="url"/>
          <input type= "submit" value= "Crea tu nuevo Link" />
        </form>
        <div >
          {links.map((link) =>(
            <Links 
                key={link.docId}
                docId= {link.docId}
                url={link.url}
                title={link.title}
                onDelete={handleDeleteLink}
                onUpdate={handleUpdateLink}
            />
            
          ))}
        </div>

    </div>
     
     </DashboardWraper>
  )
}
