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
        <div className="notes__currentnote">
            <h1>REACT INTRODUCTION</h1>
            <div className="notes__body">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis laudantium excepturi eius quos, itaque quas dolorem repellendus voluptatibus molestias necessitatibus quis nemo suscipit temporibus similique, officia, at eaque soluta quo.
            </div>
            <div className="notes__footer">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus assumenda aut sunt, consequatur qui facere commodi praesentium inventore earum possimus?
            </div>
        </div>
    </div>
    </>);
}
 
export default NotesPage;