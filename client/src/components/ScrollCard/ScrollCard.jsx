import React from "react";
import { Link } from "react-router-dom";
import "./ScrollCard.css";
const ScrollCard = ({ scroll }) => {
  function getParameterByName(url, name) {
    var match = RegExp("[?&]" + name + "=([^&]*)").exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, " "));
  }
  const thumnail = `https://img.youtube.com/vi/${getParameterByName(
    scroll.vid_link,
    "v"
  )}/sddefault.jpg`;
  return (
    <>
      <Link
        to={`/workspace/scroll/${scroll._id}`}
        className="scroll__cardcontainer"
      >
        <div
          style={{ backgroundImage: `url(${thumnail})` }}
          className="scroll__thumbnail"
        ></div>
        <h4>{scroll.name}</h4>
        {/* <p>02-02-2021</p> */}
      </Link>
    </>
  );
};

export default ScrollCard;
