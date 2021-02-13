import React from 'react'
import "./main.css"
const Pdf = () => {
    const thumnail = "https://bs-uploads.toptal.io/blackfish-uploads/blog/post/seo/og_image_file/og_image/15921/secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png";
    return (  <>
    <div className="pdf__container">
        <div  style={{ backgroundImage: `url(${thumnail})` }} className="pdf__thumbnail"></div>
        <div className="pdf__note">
            <h1 className="notes__cureentheading">NOTE</h1>
            <div  className="notes__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum vero, consequuntur a, quis eum eius dolorum odio iusto qui laudantium sed possimus. Accusantium voluptatem qui, libero saepe dolorum sapiente pariatur.</div>
            <div className="notes__footer">
        <div className="notes__time">4:00</div>
      </div>
        </div>
        <div className="pdf__note">
        </div>
    </div>
    </>);
}
 
export default Pdf;