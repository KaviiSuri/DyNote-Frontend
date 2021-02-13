import React from 'react'
import { Link } from 'react-router-dom';
import "./ScrollCard.css"
const ScrollCard = () => {
    const url="https://www.freecodecamp.org/news/content/images/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
    return ( <>
    <Link to={"/workspace/scroll"} className="scroll__cardcontainer">
        <div  style={{backgroundImage:`url(${url})`}} className="scroll__thumbnail"></div>
        <h4>REACT JS</h4>
        <p>02-02-2021</p>
    </Link>
    </> );
}
 
export default ScrollCard;