import AddAlbumForm from "./addalbumform";
import collimg from "./photos.png";
import trash from "./trash-bin.png";
import editp from "./edit.png";
import { doc, deleteDoc} from "firebase/firestore";
import { dbs } from "./fstore";
import UpdateAlbumForm from "./updatealbum";
import { useState } from "react";
import clear from "./clear.png";
import srch from "./search.png";
export default function CollectionPage(props){
    const [updateForm, setupdateForm] = useState(false);
    const [albumEditTitle, setalbumEditTitle] = useState("");
    const [albumEditId, setalbumEditId] = useState("");
    const [enablesearch, setenablesearch] = useState(false);
    async function handlealbumdeletebtn(id){
        await deleteDoc(doc(dbs, "albumlist", id));
    }
    function handleAlbumEditBtn(id, title){
        setalbumEditId(id);
        setalbumEditTitle(title);
        setupdateForm(true);
        props.setaddalbum(false);
    }
    return(<>
    <div id="main-section-div">
        {updateForm?<UpdateAlbumForm setupdateForm={setupdateForm} albumEditId={albumEditId} albumEditTitle={albumEditTitle}/>:null}
        {props.addalbum?<AddAlbumForm handleCreateAlbum={props.handleCreateAlbum} setcollectionTitle={props.setcollectionTitle}/>:null}
    <div id="main-section-div-1">
    <h1>Your Albums</h1>
    <div id="search-album-div">
        {enablesearch?<input id="search-album-input" type="text" placeholder="Search"/>:null}
        <img id="search-album-list" src={enablesearch?clear:srch} alt={enablesearch?clear:srch} onClick={()=>setenablesearch(!enablesearch)}/>
    </div>
    <button id={props.addalbum?"cancel-album-btn" : "add-album-btn" } onClick={()=>{props.setaddalbum(!props.addalbum)
                                                                                    setupdateForm(false);
                                                                                    }}>{props.addalbum?"Cancel" : "Add Album" }</button>
    </div>
                <div id="main-section-div-2">
                            {props.collectionlist.map((collection, index)=>
                                <div className="album-list" key={index} onClick={()=>props.handelDivClick(collection.id, collection.Title)}>
                                    <button className="edit-buttons"><img src={editp} alt={editp} onClick={(e)=>{
                                                                                                            e.stopPropagation();
                                                                                                            handleAlbumEditBtn(collection.id, collection.Title);    
                                                                                                            }}/></button>
                                    <button className="delete-buttons"><img src={trash} alt={trash} onClick={(e)=>{
                                                                    e.stopPropagation();
                                                                    handlealbumdeletebtn(collection.id);
                                                                }}/></button>
                                    <img src={collimg} alt={collection.colltitle}/>
                                    <span>{collection.Title}</span>
                                </div>
                            )};    
                </div>
    </div>
    
    </>)
}