import React from 'react'
import ReactPlayer from 'react-player'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import {IoMdAddCircle} from "react-icons/io"
import "./NotesPage.css"
import {MdEdit} from "react-icons/md"
const NotesPage = () => {
    return (  <>
    <div className="notes__container">
        <div className="notes__videoemb">
        <ReactPlayer className="notes__vid" url='https://www.youtube.com/watch?v=4UZrsTqkcW4&t=12724s' />
        <div className="notes__scroll">
            <div className="notes__scrollhead">
<IoMdAddCircle size="24px" color="#0DBFBE"  />
<IoMdAddCircle/>
<IoMdAddCircle/>
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
            <h1>REACT INTRODUCTION<span style={{marginLeft:"5%", cursor:"pointer"}} > <MdEdit size="24px" /></span></h1>
            <ReactQuill theme="bubble" className="notes__body" value={" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam facilis illo perferendis molestias. Blanditiis, expedita adipisci quae temporibus laborum ipsum quaerat aut. Temporibus nesciunt quo et est facere dicta quam, necessitatibus architecto explicabo, quisquam commodi nihil eos, cupiditate dolorem quidem earum aliquam officia nam qui odit at ipsum porro doloribus."} />
            {/* <div className="notes__body">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam facilis illo perferendis molestias. Blanditiis, expedita adipisci quae temporibus laborum ipsum quaerat aut. Temporibus nesciunt quo et est facere dicta quam, necessitatibus architecto explicabo, quisquam commodi nihil eos, cupiditate dolorem quidem earum aliquam officia nam qui odit at ipsum porro doloribus.
            </div> */}
            <div className="notes__footer"> 
                <div className="notes__time">4:00</div>
                {/* <div className="notes__edit"><MdEdit size="24px" /></div> */}
             </div>
        </div>
    </div>
    </>);
}
 
export default NotesPage;