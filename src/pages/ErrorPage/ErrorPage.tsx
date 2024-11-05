import React from "react";
import NavBar from "../../components/NavBar";
import toolsIcon from "../../assets/tools-icon.svg";
import { useNavigate } from "react-router-dom";
import { StepRoute } from "../../util/constants";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="home-container">
          <img className="main-image" src={toolsIcon} alt="success icon" />
          <span className="form-title-text-bold-primary">
            Ups! Imamo tehničkih poteškoća
          </span>
          <span className="body-text">
            Možete pokušati ponovo malo kasnije.
          </span>
          <button
            className="primary-button"
            onClick={() => navigate(StepRoute.home)}
          >
            Početna stranica
          </button>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
