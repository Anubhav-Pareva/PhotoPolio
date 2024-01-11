export default function AddAlbumForm(props){
    return(<>
    <div id="album-form-main-div">
        <h1 id="album-form-heading">Create An Album</h1>
        <div id="album-form-div">
        <input type="text" placeholder="Album Name" id="album-form-input" onChange={(e)=>props.setcollectionTitle(e.target.value)}/>
        <div id="album-form-btn-div">
            <button id="clear-album-form" onClick={()=>{
                    document.getElementById("album-form-input").value="";
            }}>Clear</button>
            <button id="create-album-form" onClick={props.handleCreateAlbum}>Create</button>
        </div>
        </div>
    </div>
    </>)
}