import React , {useState , useRef , useEffect} from "react"
import styles from "./link.module.css";
export default function Links({ docId, title, url, onDelete, onUpdate }) {
    //Estados Locales

    const [currentTitle , setCurrentTitle] = useState(title);
    const [currenteUrl , setCurrentUrl] = useState(url);
    

    //estos estados son para que cuando se este en falso o en true, 
    //se cambien totalmente la interface
    const [editTitle , setEditTitle] = useState(false);
    const [editUrl , setEditUrl] = useState(false);

    //Cuando usamos useRef, estamos creando una referencia una 
    //elemento html
    const titleRef = useRef(null);
    const urlRef = useRef(null);

    useEffect(()=>{
        //aquie estamos diciendo si existe la referencia
        if(titleRef.current){
            titleRef.current.focus();
        }
    } , [editTitle]);


    useEffect(()=>{
        //aquie estamos diciendo si existe la referencia
        if(urlRef.current){
            urlRef.current.focus();
        }
    } , [editUrl]);



    async function handleEditTitle(){
        setEditTitle(true)
    }

    async function handleEditUrl(){
        setEditUrl(true);
    }

    async function handleBlurTitle (e){
        //el evento blur es para que pasa 
        //cuando se saca el foco de un input
        setEditTitle(false);
        onUpdate(docId , currentTitle , currenteUrl)

    }

    async function handleBlurUrl (e){
        setEditUrl(false);
        onUpdate(docId , currentTitle , currenteUrl)
    }

    async function handleOnChangeTitle(e){
       setCurrentTitle(e.target.value);

    }

    async function handleOnChangeUrl(e){
        setCurrentUrl(e.target.value);
 
     }


     //edewdew
    async function handleDelete (){
        onDelete(docId)
    }
    
    return (
        <div key={docId} className={styles.link} >
            <div className={styles.linkInfo} >
            <div className={styles.linkTitle}>
               {editTitle ? (
                <> <input
                        value={currentTitle} 
                        onChange={handleOnChangeTitle}
                        ref={titleRef}
                        onBlur={handleBlurTitle}
                        onKeyDown={(event) => {

                            if (event.key === 'Enter') {
                        
                              handleBlurTitle();
                        
                            }
                        
                          }}
                        /></>
                       
                        ) : (
                <>
                 <button className={styles.btnEdit} onClick={handleEditTitle}>✏️ </button>
                {currentTitle}
                </>
               )}

            </div>
            <div  className={styles.linkUrl}>
            {editUrl ? (
                <> <input 
                        value={currentTitle}
                        onChange={handleOnChangeUrl}
                        ref={urlRef}
                        onKeyDown={(event) => {

                            if (event.key === 'Enter') {
                        
                              handleBlurUrl();
                        
                            }
                        
                          }}
                        /></>
               ) : (
                <>
                 <button  className={styles.btnEdit}  onClick={handleEditUrl}>✏️ </button>
                {currenteUrl}
                </>
               )}

            </div>
            </div>

            <div className={styles.linkActios}>
                <button className={styles.btnDelete} onClick={handleDelete}>🗑</button>
            </div>
        </div>
    );


}