import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { IoMdAddCircle } from "react-icons/io";
import "react-quill/dist/quill.bubble.css";
import "./NotesPage.css";
import { FaShareAlt } from "react-icons/fa";
import { AiFillEye, AiFillFilePdf, AiFillEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import Note from "../../components/Note/Note";
import { useScroll } from "../../providers/scrollProvider";
import axios from "axios";
import { rootUrl } from "../../config";
import { useAuth } from "../../providers/authProvider";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const NotesPage = ({ match }) => {
  const {
    currentScrollId,
    setCurrentScrollId,
    scrollData,
    setScrollData,
    notes,
    setNotes,
  } = useScroll();
  const [currNoteData, setCurrNoteData] = useState();
  const playerRef = useRef();
  const { firebaseUser } = useAuth();
  const [currentNoteId, setCurrentNoteId] = useState();
  const toast = useToast();

  useEffect(() => {
    setCurrentScrollId(match.params.id);
  }, []);
  // useEffect(() => {
  //   if (notes && notes[0] && !currentNoteId) {
  //     //   console.log("Loading First Note");
  //     setCurrentNoteId(notes[0]._id);
  //   }
  // }, [notes, scrollData]);
  useEffect(() => {
    if (notes) setCurrNoteData(notes.find((nt) => nt._id === currentNoteId));
  }, [currentNoteId]);
  const handleVisibility = async () => {
    try {
      if (scrollData) {
        const { data } = await axios.patch(
          `${rootUrl}/scroll/${scrollData._id}`,
          {
            public: scrollData.public ? false : true,
          },
          {
            headers: {
              firebase_token: firebaseUser
                ? await firebaseUser.getIdToken()
                : "",
            },
          }
        );
        setScrollData({ ...scrollData, public: data.public });
      }
    } catch (error) {
      console.log(error);
    }
  };
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
            firebase_token: firebaseUser ? await firebaseUser.getIdToken() : "",
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
    if (notes && notes.length > 0) {
      let currNoteIndex = notes.findIndex(
        (nt) => nt.start_time > playedSeconds
      );
      if (currNoteIndex === -1) {
        currNoteIndex = notes.length - 1;
      } else {
        currNoteIndex = Math.max(0, currNoteIndex - 1);
      }

      // console.log(notes.find((nt) => nt.start_time > playedSeconds));
      // console.log("currNoteIndex: ", currNoteIndex);
      if (notes && notes[currNoteIndex])
        setCurrentNoteId(notes[currNoteIndex]._id);
      // console.log(notes.find((nt) => nt._id === currentNoteId));
    }
  };

  const patchNote = async (id, body) => {
    try {
      const { data } = await axios.patch(`${rootUrl}/note/${id}`, body, {
        headers: {
          firebase_token: firebaseUser ? await firebaseUser.getIdToken() : "",
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
  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location);
      toast({
        title: "Copied To Clipboard Successfully",
        description: "Sharing Link Copied to clipboard",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Could note copy to clipboard",
        description:
          "Could note copy to clipboard, please use the current URL instead",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
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
                style={{ cursor: "pointer" }}
              />
              {scrollData && scrollData.public ? (
                <AiFillEye
                  size="24px"
                  onClick={handleVisibility}
                  style={{ cursor: "pointer" }}
                  color="#0DBFBE"
                />
              ) : (
                <AiFillEyeInvisible
                  size="24px"
                  style={{ cursor: "pointer" }}
                  color="#0DBFBE"
                  onClick={handleVisibility}
                />
              )}

              <FaShareAlt
                size="24px"
                style={{ cursor: "pointer" }}
                color="#0DBFBE"
                onClick={handleShare}
              />
            </div>
            <div className="notes__scrollbody">
              {notes &&
                notes.map((nt) => {
                  return (
                    <div
                      style={{ cursor: "pointer" }}
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

        {currNoteData && <Note patchNote={patchNote} note={currNoteData} />}
        {scrollData && (
          <Link
            target="_blank"
            to={`/scroll/pdf/${scrollData._id}`}
            className="notes__pdfmode"
          >
            <AiFillFilePdf size="30px" />
          </Link>
        )}
      </div>
    </>
  );
};

export default NotesPage;
