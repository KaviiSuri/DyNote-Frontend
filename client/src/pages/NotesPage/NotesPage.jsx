import React from 'react'
import ReactPlayer from 'react-player'
import {IoMdAddCircle} from "react-icons/io"
import {AiFillEye,AiFillEyeInvisible} from "react-icons/ai"
import {FaShareAlt} from "react-icons/fa"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import "./NotesPage.css"
import {MdEdit} from "react-icons/md"
import { useState } from 'react';
const NotesPage = () => {
    const  modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
      const [name,setName]=useState("NOTE")
      const [content,setContent] = useState("");
      const [save,setSave]=useState(false);
      const handleContentSubmit=()=>{
          console.log(content);
      }
      const handleChange=(e)=>{
        setSave(true);
        setContent(e);
      }
      const handleNameSubmit=()=>{
          console.log(name);
      }
      const handleName=(e)=>{
       setName(e.target.innerText);
      }
    return (  <>
    <div className="notes__container">
        <div className="notes__videoemb">
        <ReactPlayer className="notes__vid" controls={true} url='https://www.youtube.com/watch?v=4UZrsTqkcW4&t=12724s' />
        <div className="notes__scroll">
            <div className="notes__scrollhead">
                <IoMdAddCircle size="24px" color="#0DBFBE"  />
                <AiFillEye size="24px" color="#0DBFBE"  />
                <AiFillEyeInvisible size="24px" color="#0DBFBE"  />
                <FaShareAlt  size="24px" color="#0DBFBE"/>
            </div>
            <div className="notes__scrollbody">
                <div className="notes__scrollselect">
                    <div className="scroll__time">4:00</div>
                    <div className="scroll__title">EXPRESS JS</div>
                </div>
                <div className="notes__scrollselect scroll__active">
                    <div className="scroll__time">10:00</div>
                    <div className="scroll__title ">REDUX JS</div>
                </div>
            </div>

        </div>
        </div>
        <div className="notes__currentnote">
            <h1 contentEditable={true} onInput={handleName} onBlur={handleNameSubmit} style={{outlineWidth:"0px"}}  >{name}<span style={{marginLeft:"5%", cursor:"pointer"}} > <MdEdit size="24px" /></span></h1>
            <ReactQuill  modules={modules}  theme="bubble" className="notes__body" value={content} onChange={handleChange}  />
            <div className="notes__footer"> 
                <div className="notes__time">4:00</div>
                {save?<div onClick={handleContentSubmit} className="notes__save">SAVE</div>:null}
                
             </div>
        </div>
    </div>
    </>);
}
 
export default NotesPage;