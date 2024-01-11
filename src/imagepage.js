import backimg from "./back.png";
import AddImageForm from "./addimageform";
import trash from "./trash-bin.png";
import editp from "./edit.png";
import { ImageCarousel } from "./imagecarousel";
import { useState } from "react";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { dbs } from "./fstore";
import UpdateImageForm from "./updateimage";
import clear from "./clear.png";
import srch from "./search.png";
export default function ImagePage(props){
    const [iscarouselpage, setcarouselpage] = useState(false);
    const [phototIndex, setphotoIndex] = useState("");
    const [updateImage, setupdateImage] = useState(false);
    const [imageEditId, setimageEditId] = useState("");
    const [imageEditAddr, setimageEditAddr] = useState("");
    const [imageEditTitle, setimageEditTitle] = useState("");
    const [enableimgsearch, setenableimgsearch] = useState(false);
    function handleimageclick(index){
        setphotoIndex(index);
        setcarouselpage(true);
    }
    function handleImageEditBtn(id, addr, title){
        setimageEditId(id);
        setimageEditAddr(addr);
        setimageEditTitle(title);
        props.setaddimage(false);
        setupdateImage(true);                                                                                                             
    }
    async function handleimagedeletebtn(id){
        await deleteDoc(doc(collection(collection(dbs, "albumlist"), props.photolistId, "photolist"), id));
    }
   return(<>
    <div id="image-main-section-div">
        {updateImage?<UpdateImageForm setupdateImage={setupdateImage} imageEditId={imageEditId} imageEditAddr={imageEditAddr} imageEditTitle={imageEditTitle} photolistId={props.photolistId}/>:null}
        {props.addimage?<AddImageForm setimageTitle={props.setimageTitle} setimageUrl={props.setimageUrl} handleCreateImage={props.handleCreateImage} photolistId={props.photolistId}/>:null}
                <div id="image-main-section-div-1">
                        <button id="image-page-back-btn"><img src={backimg} alt="back button" onClick={props.handleBackbtn}/></button>
                        <h1 id="image-heading">{props.photolist.length===0? "no image is present in "+props.photolisttitle :props.photolisttitle }</h1>
                        <div id="search-album-div">
                            {enableimgsearch?<input id="search-album-input" type="text" placeholder="Search"/>:null}
                            <img id="search-album-list" src={enableimgsearch?clear:srch} alt={enableimgsearch?clear:srch} onClick={()=>setenableimgsearch(!enableimgsearch)}/>
                        </div>
                        <button id={props.addimage?"cancel-image-btn" : "add-image-btn" } onClick={()=>{
                                                                                                        setupdateImage(false);
                                                                                                        props.setaddimage(!props.addimage);
                                                                                                        }}>{props.addimage?"Cancel" : "Add Image" }</button>
                </div>
                {iscarouselpage?<div id="image-main-section-3">
                                    <ImageCarousel setcarouselpage={setcarouselpage} photolist={props.photolist} phototIndex={phototIndex} />
                                </div>
                 : null}
                
                <div id="image-main-section-div-2">
                            {props.photolist.map((photo, index)=>
                                <div className="image-list" key={index} onClick={()=>handleimageclick(index)}>
                                    <button className="edit-buttons"><img src={editp} alt={editp} onClick={(e)=>{
                                                                                                                e.stopPropagation();
                                                                                                                handleImageEditBtn(photo.id, photo.imgAdd, photo.imgTitle);   
                                                                                                                }}/></button>
                                    <button className="delete-buttons"><img src={trash} alt={trash} onClick={(e)=>{
                                        e.stopPropagation()
                                        handleimagedeletebtn(photo.id)}}/></button>                                    
                                    <img src={photo.imgAdd} alt={photo.imgTitle}/>
                                    <span>{photo.imgTitle}</span>
                                </div>
                            )} 
                </div>
    </div>
    </>)
}