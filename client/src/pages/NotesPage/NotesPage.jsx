import React from 'react'
import ReactPlayer from 'react-player'
import "./NotesPage.css"
const NotesPage = () => {
    return (  <>
    <div className="notes__container">
        <div className="notes__videoemb">
        <ReactPlayer className="notes__vid" url='https://www.youtube.com/watch?v=4UZrsTqkcW4&t=12724s' />
        <div className="notes__scroll"></div>
        </div>
        <div className="notes__currentnote"></div>
    </div>
    </>);
}
 
export default NotesPage;