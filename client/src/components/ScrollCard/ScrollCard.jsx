import React from "react";
import { Link } from "react-router-dom";
import getThumnailLink from "../../utils/getThumnailLink";
import "./ScrollCard.css";
const ScrollCard = ({ scroll }) => {
  const thumnail = getThumnailLink(scroll.vid_link);
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
