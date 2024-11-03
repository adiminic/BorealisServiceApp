import React from "react";
import NavBar from "../../components/NavBar";
import toolsIcon from "../../assets/tools-icon.svg";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="home-container">
          <img src={toolsIcon} alt="tools icon" />
          <h1 className="text-xl font-bold">Konfigurator servisa</h1>
          <p className="text-m">
            Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i
            naš stučan tim će vam se javiti u najkraćem mogućem roku.
          </p>
          <button className="primary-button">Pokreni konfigurator</button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
