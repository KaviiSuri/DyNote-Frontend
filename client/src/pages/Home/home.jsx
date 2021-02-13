import React from "react";
import { FcGoogle } from "react-icons/fc";
// import {IoChevronDownCircleSharp} from "react-icons/io5";
import "./home.css";
import { useAuth } from "../../providers/authProvider";
import { Link } from "react-router-dom";

const Home = () => {
  const { signup } = useAuth();

  return (
    <>
    <div className="home__hero">
    <div className="home__nav">
        <div className="dynote__logo"></div>
        <div className="home__login" onClick={signup}>
          <h1>LOGIN</h1>
        <FcGoogle  />
        </div>
      </div>
      <div className="main__header">
        <div className="main__heading">
          <h1>DYNOTE</h1> 
          
        </div>
        <Link to={"/workspace"} className="home__login">
          <h1>GET STARTED</h1>
        </Link>
      </div>
      <div className="home__decor">

      </div>
    </div>
     
    </>
  );
};

export default Home;
