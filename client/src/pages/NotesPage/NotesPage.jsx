import React from 'react'
import ReactPlayer from 'react-player'
import "./NotesPage.css"
const NotesPage = () => {
    return (  <>
    <div className="notes__container">
        <div className="notes__videoemb">
        <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
        <div className="notes__scroll"></div>
        </div>
        <div className="notes__currentnote"></div>
    </div>
    </>);
}
 
export default NotesPage;