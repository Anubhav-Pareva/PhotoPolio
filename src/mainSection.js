import { useEffect, useState } from "react";

import CollectionPage from "./collectionpage";
import ImagePage from "./imagepage";
import { dbs } from "./fstore";
import { addDoc, collection, query, orderBy, onSnapshot} from "firebase/firestore";

export default function Mainsection(){
    const [addalbum, setaddalbum] = useState(false);
    const [addimage, setaddimage] = useState(false);
    const [updateAlbum, setupdateAlbum] = useState(false);
    const [collectionTitle, setcollectionTitle] = useState("");
    const [imageTitle, setimageTitle] = useState("");
    const [imageUrl, setimageUrl] = useState("");
    const [photolistId, setphotolistId] = useState("");
    const [iscollectionpage, setcollectionpage] = useState(true);
    const [isimagepage, setimagepage] = useState(false);
    const [collectionlist, setcollectionlist] = useState([]);
    const [photolist, setphotolist] = useState([]);
    const [photolisttitle, setphotolisttitle] = useState("");
    useEffect(()=>{
        const q=query(collection(dbs, "albumlist"), orderBy("createon", "desc"));
        onSnapshot(q, (snapshot)=>{
            const alist=snapshot.docs.map((doc)=>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            setcollectionlist(alist);
        })
    },[]);
    function handleBackbtn(){
        setphotolist([]);
        setcollectionpage(!iscollectionpage);
        setimagepage(!isimagepage);
    }
    async function handleCreateAlbum(){
        if(collectionTitle===""){
            return;
        }
        await addDoc(collection(dbs, "albumlist"), {
            Title: collectionTitle,
            createon: new Date()
          });
        setcollectionTitle("");
        document.getElementById("album-form-input").value="";
    }
    function handelDivClick(colid, coltitle){
        const q=query(collection(collection(dbs, "albumlist"), colid, "photolist"), orderBy("createon", "desc"));
        onSnapshot(q, (snapshot)=>{
            const alist=snapshot.docs.map((doc)=>{
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            setphotolist(alist);
        })
        setphotolistId(colid);
        setphotolisttitle(coltitle);
        setcollectionpage(!iscollectionpage);
        setimagepage(!isimagepage);
    }
    async function handleCreateImage(colid){
        if(imageTitle==="" || imageUrl===""){
            return;
        }
        await addDoc(collection(collection(dbs, "albumlist"), colid, "photolist"), {
            imgTitle: imageTitle,
            imgAdd: imageUrl,
            createon: new Date()
          });
        setimageTitle("");
        setimageUrl("");
        document.getElementById("image-form-input").value="";
        document.getElementById("image-form-input-2").value="";
    }
    return(<>
    {iscollectionpage?
    <CollectionPage addalbum={addalbum} setaddalbum={setaddalbum} collectionlist={collectionlist} handleCreateAlbum={handleCreateAlbum} setcollectionTitle={setcollectionTitle} handelDivClick={handelDivClick} updateAlbum={updateAlbum} setupdateAlbum={setupdateAlbum}/>
    : null}
    {isimagepage?
    <ImagePage addimage={addimage} setaddimage={setaddimage} photolist={photolist} handleBackbtn={handleBackbtn} photolisttitle={photolisttitle} setimageTitle={setimageTitle} setimageUrl={setimageUrl} handleCreateImage={handleCreateImage} photolistId={photolistId}/>
    :null}
    </>)
}