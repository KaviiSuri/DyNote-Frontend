import React from "react";
import { FcGoogle } from "react-icons/fc";
// import {IoChevronDownCircleSharp} from "react-icons/io5";
import "./home.css";
import { useAuth } from "../../providers/authProvider";

const Home = () => {
  const { signup } = useAuth();

  return (
    <>
      <div className="slide_1">
        <FcGoogle onClick={signup} />
        {/* <IoChevronDownCircleSharp/> */}
      </div>
    </>
  );
};

export default Home;
