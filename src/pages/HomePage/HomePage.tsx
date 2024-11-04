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
          //set message and cause to context
        }
        serviceCtx.setIsError(true);
        //TODO show error page
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
          //set message and cause to context
        }
        serviceCtx.setIsError(true);
        //TODO show error page
      }
    }
    navigate(StepRoute.configureService);
  };
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
          <button className="primary-button" onClick={nextAction}>
            Pokreni konfigurator
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
