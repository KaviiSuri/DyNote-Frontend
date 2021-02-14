import React, { useEffect, useState } from "react";
import Note from "../../components/Note/Note";
import { useScroll } from "../../providers/scrollProvider";
import getThumnailLink from "../../utils/getThumnailLink";
import "./main.css";
const Pdf = ({ match }) => {
  const {
    currentScrollId,
    setCurrentScrollId,
    scrollData,
    setScrollData,
    notes,
    setNotes,
  } = useScroll();
  useEffect(() => {
    setCurrentScrollId(match.params.id);
  }, []);
  const thumnail = getThumnailLink(scrollData && scrollData.vid_link);
  return (
    <>
      <div className="pdf__container">
        <div
          style={{ backgroundImage: `url(${thumnail})` }}
          className="pdf__thumbnail"
        ></div>
        {notes && notes.map((nt) => <Note note={nt} editable={false} />)}
      </div>
    </>
  );
};

export default Pdf;
