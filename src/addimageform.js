export default function AddImageForm(props){
    return(<>
    <div id="image-form-main-div">
        <h1 id="image-form-heading">Add Image To</h1>
        <div id="image-form-div">
        <input type="text" placeholder="Image Title" id="image-form-input" onChange={(e)=>props.setimageTitle(e.target.value)}/>
        <input type="url" placeholder="Image URL" id="image-form-input-2" onChange={(e)=>props.setimageUrl(e.target.value)}/>
        <div id="image-form-btn-div">
            <button id="clear-image-form" onClick={()=>{
                    document.getElementById("image-form-input").value="";
                    document.getElementById("image-form-input-2").value="";
            }}>Clear</button>
            <button id="add-image-form" onClick={()=>props.handleCreateImage(props.photolistId)}>Add</button>
        </div>
        </div>
    </div>
    </>)
}