import React from "react";
import { Link } from "react-router-dom";
import styles from "./publicLinks.module.css"

export default function PublicLinks({url , title}){
    return (
        <a className={styles.publicLinksContainer} href={url}>
            <div>
                {title}
            </div>
             </a>
    )
}