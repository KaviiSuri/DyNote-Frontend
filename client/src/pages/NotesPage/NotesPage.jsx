import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { IoMdAddCircle } from "react-icons/io";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "./NotesPage.css";
import { MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import Note from "../../components/Note/Note";
import { useScroll } from "../../providers/scrollProvider";
import axios from "axios";
import { rootUrl } from "../../config";
import { useAuth } from "../../providers/authProvider";

const NotesPage = ({ match }) => {
  const {
    currentScrollId,
    setCurrentScrollId,
    scrollData,
    setScrollData,
    notes,
    setNotes,
  } = useScroll();
  const playerRef = useRef();
  const { firebaseUser } = useAuth();
  const [currentNoteId, setCurrentNoteId] = useState();

  useEffect(() => {
    setCurrentScrollId(match.params.id);
  }, []);
  useEffect(() => {
    if (notes && notes[0] && !currentNoteId) {
      //   console.log("Loading First Note");
      setCurrentNoteId(notes[0]._id);
    }
  }, [notes, scrollData]);
  const createBlankNote = async () => {
    try {
      const { data } = await axios.post(
        `${rootUrl}/note`,
        {
          name: "NOTE",
          scroll_id: currentScrollId,
          content: "",
          start_time: playerRef.current.getCurrentTime() || 0,
        },
        {
          headers: {
            firebase_token: await firebaseUser.getIdToken(),
          },
        }
      );
      console.log(data);
      if (data) {
        setNotes([...notes, data]);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  const onProgress = ({ played, playedSeconds, loaded, loadedSeconds }) => {
    let currNoteIndex = notes.findIndex((nt) => nt.start_time > playedSeconds);
    if (currNoteIndex === -1) {
      currNoteIndex = notes.length - 1;
    } else {
      currNoteIndex = Math.max(0, currNoteIndex - 1);
    }
    // console.log(notes.find((nt) => nt.start_time > playedSeconds));
    // console.log("currNoteIndex: ", currNoteIndex);
    setCurrentNoteId(notes[currNoteIndex]._id);
  };
  const patchNote = async (id, body) => {
    try {
      const { data } = await axios.patch(`${rootUrl}/note/${id}`, body, {
        headers: {
          firebase_token: await firebaseUser.getIdToken(),
        },
      });
      let newNotes = notes.map((nt) => ({ ...nt }));
      newNotes = newNotes.filter((nt) => nt._id !== data._id);
      newNotes.push(data);
      setNotes(newNotes);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };
  return (
    <>
      <div className="notes__container">
        <div className="notes__videoemb">
          <ReactPlayer
            className="notes__vid"
            controls={true}
            url={scrollData && scrollData.vid_link}
            ref={playerRef}
            onProgress={onProgress}
          />
          <div className="notes__scroll">
            <div className="notes__scrollhead">
              <IoMdAddCircle
                onClick={createBlankNote}
                size="24px"
                color="#0DBFBE"
              />
              <IoMdAddCircle />
              <IoMdAddCircle />
            </div>
            <div className="notes__scrollbody">
              {notes &&
                notes.map((nt) => {
                  return (
                    <div
                      className={
                        "notes__scrollselect" +
                        (currentNoteId === nt._id ? " scroll__active" : "")
                      }
                      onClick={() => {
                        setCurrentNoteId(nt._id);
                        playerRef.current.seekTo(nt.start_time, "seconds");
                      }}
                    >
                      <div className="scroll__time">{nt.start_time}s</div>
                      <div className="scroll__title">{nt.name}</div>
                    </div>
                  );
                })}

              {/* <div className="notes__scrollselect scroll__active">
                <div className="scroll__time">10:00</div>
                <div className="scroll__title ">REDUX JS</div>
              </div> */}
            </div>
          </div>
        </div>
        {notes && notes.find((nt) => nt._id === currentNoteId) && (
          <Note
            patchNote={patchNote}
            note={notes.find((nt) => nt._id === currentNoteId)}
          />
        )}
      </div>
    </>
  );
};

export default NotesPage;
