import React from "react";
import NavBar from "../../components/NavBar";
import successIcon from "../../assets/success-icon.svg";

const QuoteSentPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="home-container">
          <img className="main-image" src={successIcon} alt="success icon" />
          <span className="text-xl font-bold">
            Vaša prijava je uspješno poslana
          </span>
          <p className="text-m">
            Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas
            u najkraćem mogućem roku.
          </p>
          <p className="text-m">Hvala vam!</p>
        </div>
      </div>
    </>
  );
};

export default QuoteSentPage;
