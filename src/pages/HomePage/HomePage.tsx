import React, { useContext } from "react";
import NavBar from "../../components/NavBar";
import toolsIcon from "../../assets/tools-icon.svg";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { StepRoute } from "../../util/constants";
import { ServiceContext } from "../../context/ServiceContext";
import {
  fetchManufacturers,
  fetchServices,
} from "../../service/BorealisService";
import { ApiError } from "../../models/ApiError/ApiError";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const serviceCtx = useContext(ServiceContext);

  const nextAction = async () => {
    if (
      serviceCtx.manufacturers == undefined ||
      serviceCtx.manufacturers.length == 0
    ) {
      try {
        const res = await fetchManufacturers();
        if (res.success) {
          serviceCtx.setManufacturers(res.result);
        }
      } catch (e) {
        if (e instanceof ApiError) {
          console.log(e.message);
          navigate(StepRoute.error);
        }
      }
    }
    if (serviceCtx.services == undefined || serviceCtx.services.length == 0) {
      try {
        const res = await fetchServices();
        if (res.success) {
          serviceCtx.setServices(res.result);
        }
      } catch (e) {
        if (e instanceof ApiError) {
          console.log(e.message);
          navigate(StepRoute.error);
        }
      }
    }
    navigate(StepRoute.configureService);
  };
  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="home-container">
          <img className="main-image" src={toolsIcon} alt="tools icon" />
          <span className="form-title-text-bold-primary">
            Konfigurator servisa
          </span>
          <span className="body-text">
            Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i
            naš stučan tim će vam se javiti u najkraćem mogućem roku.
          </span>
          <button className="primary-button" onClick={nextAction}>
            Pokreni konfigurator
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
