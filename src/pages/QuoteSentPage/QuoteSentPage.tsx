import React from "react";
import NavBar from "../../components/NavBar";
import successIcon from "../../assets/success-icon.svg";
import "./QuoteSentPage.css";

const QuoteSentPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="quote-sent-container">
          <img className="main-image" src={successIcon} alt="success icon" />
          <span className="form-title-text-bold-primary">
            Vaša prijava je uspješno poslana
          </span>
          <span className="body-text">
            Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas
            u najkraćem mogućem roku.
          </span>
          <span className="body-text">Hvala vam!</span>
        </div>
      </div>
    </>
  );
};

export default QuoteSentPage;
