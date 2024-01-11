import logo from "./palogo.png";
export default function Panav(){
    return(<>
    <div id="nav-div-main">
        <div id="nav-inner-div">
            <img src={logo} id="nav-img" alt="Logo"/>&nbsp;&nbsp;&nbsp;
            <h1  id="nav-heading">PhotoFolio</h1>
        </div>
    </div>
    </>)
}