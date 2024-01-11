import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { dbs } from "./fstore";
export default function UpdateAlbumForm(props){
    const [updatedAlbumTitle, setupdatedAlbumTitle] = useState("");
    async function handleUpdateAlbum(){
        if(updatedAlbumTitle===""){
            alert("please fill the field");
            return;
        }
        const washingtonRef = doc(dbs, "albumlist", props.albumEditId);
            await updateDoc(washingtonRef, {
                Title:updatedAlbumTitle,
                createon:new Date()
            });
        console.log(updatedAlbumTitle);
        document.getElementById("update-album-form-input").value="";
        alert("album updated successfully");
        props.setupdateForm(false);
    }
    return(<>
    <div id="album-form-main-div">
        <h1 id="album-form-heading">Update An Album</h1>
        <div id="album-form-div">
        <button id="album-update-btn" className="carousel-btn" onClick={()=>{props.setupdateForm(false)}}>x</button>
        <input type="text" placeholder={props.albumEditTitle} id="update-album-form-input" onChange={(e)=>{setupdatedAlbumTitle(e.target.value)}}/>
        <div id="album-form-btn-div">
            <button id="clear-album-form" onClick={()=>{
                    document.getElementById("update-album-form-input").value="";
            }}>Clear</button>
            <button id="create-album-form" onClick={handleUpdateAlbum}>Update</button>
        </div>
        </div>
    </div>
    </>)
}