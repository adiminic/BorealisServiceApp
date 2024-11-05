import React from "react";
import NavBar from "../../components/NavBar";
import successIcon from "../../assets/success-icon.svg";

const QuoteSentPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="home-container">
          <img src={successIcon} alt="success icon" />
          <h1 className="text-xl font-bold">
            Vaša prijava je uspješno poslana
          </h1>
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
