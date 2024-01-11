import { useState } from "react";
export function ImageCarousel(props){
    const [imgIndex, setimgIndex] = useState(props.phototIndex);
    function handleprevclick(){
        if(imgIndex===0){
            setimgIndex(props.photolist.length-1);
            return;
        }
        setimgIndex(imgIndex-1);
    }
    function handlenextclick(){
        if(imgIndex===(props.photolist.length-1)){
            setimgIndex(0);
            return;
        }
        setimgIndex(imgIndex+1);
    }
    console.log(props.photolist.length);
    return(<>
    <div id="image-carousel">
        <button id="image-carousel-remove" className="carousel-btn" onClick={()=>props.setcarouselpage(false)}>x</button>
        <button id="carousel-prev" className="carousel-btn" onClick={handleprevclick}>&lt;</button>
        <img src={props.photolist[imgIndex].imgAdd} alt={props.photolist[imgIndex].imgTittle}/>
        <button id="carousel-next" className="carousel-btn" onClick={handlenextclick}>&gt;</button>
    </div>
    </>)
}