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
          <img src={toolsIcon} alt="success icon" />
          <h1 className="text-xl font-bold">Ups! Imamo tehničkih poteškoća</h1>
          <p className="text-m">Možete pokušati ponovo malo kasnije.</p>
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
