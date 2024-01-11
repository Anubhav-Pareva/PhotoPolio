import { useState } from "react";
import { doc, updateDoc, collection } from "firebase/firestore";
import { dbs } from "./fstore";
export default function UpdateImageForm(props){
    const [updatedImageTitle, setupdatedImageTitle] = useState("");
    const [updatedImageAddr, setupdatedImageAddr] = useState("");
    async function handleUpdateImage(){
        if(updatedImageAddr === "" && updatedImageTitle === ""){
            alert("please fill both field");
            return;
        }
        if(updatedImageAddr === ""){
            const washingtonRef = doc(collection(collection(dbs, "albumlist"), props.photolistId, "photolist"), props.imageEditId)
            await updateDoc(washingtonRef, {
                imgTitle: updatedImageTitle,
            createon: new Date()
            });
        document.getElementById("update-image-form-input").value="";
        document.getElementById("update-image-form-input-2").value="";
        alert("album updated successfully");
        props.setupdateImage(false);
        return;
        }
        if(updatedImageTitle === ""){
            const washingtonRef = doc(collection(collection(dbs, "albumlist"), props.photolistId, "photolist"), props.imageEditId)
            await updateDoc(washingtonRef, {
            imgAdd: updatedImageAddr,
            createon: new Date()
            });
        document.getElementById("update-image-form-input").value="";
        document.getElementById("update-image-form-input-2").value="";
        alert("album updated successfully");
        props.setupdateImage(false);
        return;
        }
        const washingtonRef = doc(collection(collection(dbs, "albumlist"), props.photolistId, "photolist"), props.imageEditId)
            await updateDoc(washingtonRef, {
                imgTitle: updatedImageTitle,
            imgAdd: updatedImageAddr,
            createon: new Date()
            });
        document.getElementById("update-image-form-input").value="";
        document.getElementById("update-image-form-input-2").value="";
        alert("album updated successfully");
        props.setupdateImage(false);
        console.log(updatedImageAddr);
        console.log(updatedImageTitle);
    }
    return(<>
    <div id="image-form-main-div">
        <h1 id="image-form-heading">Update Image</h1>
        <div id="image-form-div">
        <button id="image-update-btn" className="carousel-btn" onClick={()=>props.setupdateImage(false)}>x</button>
        <input type="text" placeholder={props.imageEditTitle} id="update-image-form-input" onChange={(e)=>setupdatedImageTitle(e.target.value)}/>
        <input type="url" placeholder={props.imageEditAddr} id="update-image-form-input-2" onChange={(e)=>setupdatedImageAddr(e.target.value)}/>
        <div id="image-form-btn-div">
            <button id="clear-image-form" onClick={()=>{
                    document.getElementById("update-image-form-input").value="";
                    document.getElementById("update-image-form-input-2").value="";
            }}>Clear</button>
            <button id="add-image-form" onClick={handleUpdateImage}>Update</button>
        </div>
        </div>
    </div>
    </>)
}