import React, { useContext } from "react";
import NavBar from "../../components/NavBar";
import "./ConfirmServicePage.css";
import { ServiceContext } from "../../context/ServiceContext";
import { useNavigate } from "react-router-dom";
import { StepRoute } from "../../util/constants";
import { getQuote } from "../../service/BorealisService";
import { ServiceData } from "../../models/request/ServiceData";
import { ApiError } from "../../models/ApiError/ApiError";

const ConfirmServicePage: React.FC = () => {
  const serviceCtx = useContext(ServiceContext);
  const navigate = useNavigate();

  const nextAction = async () => {
    const body: ServiceData = {
      manufacturerId: serviceCtx.confFormData!.manufacturer,
      serviceIds: serviceCtx.confFormData!.services,
      fullName: serviceCtx.confFormData!.name,
      ...serviceCtx.confFormData!,
    };
    try {
      const res = await getQuote(body);
      if (res.success) {
        navigate(StepRoute.quoteSent);
      }
    } catch (e) {
      if (e instanceof ApiError) {
        console.log(e.message);
        navigate(StepRoute.error);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="configure-page-container">
        <div className="form-title-section">
          <h2 className="form-title-text-bold">Konfigurator Servisa</h2>
        </div>
        <div className="form-section">
          <label className="form-section-text">
            Pregled i potvrda vašeg odabira
          </label>
          <span className="top-section-text">
            Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko
            želite promijeniti neki od podatka, vratite se na prethodni korak.
            Kada ste provjerili ispravnost svojih podataka, za slanje upita na
            servis pritisnite gumb "Pošalji".
          </span>
        </div>
        <div className="form-section">
          <div className="form-section-background">
            <div className="bg-div">
              <label className="form-section-text">Model vozila</label>
              <span className="section-text">
                {serviceCtx.serviceData?.manufacturer.name}
              </span>
            </div>
            <div className="bg-div">
              <label className="form-section-text">Odabrane usluge</label>
              {serviceCtx.serviceData?.services.map((s) => (
                <div className="service-div" key={s.id}>
                  <span className="section-text">{s.name}</span>
                  <span className="section-text">{`${s.price.toFixed(
                    2
                  )} €`}</span>
                </div>
              ))}
              {serviceCtx.serviceData?.promoCode && (
                <div className="total-amount-div">
                  <span className="section-text-gray">
                    {`Popust ${
                      serviceCtx.serviceData?.promoCode.discountPercentage * 100
                    }%:`}
                  </span>
                  <span className="section-text-gray">{`${(
                    -serviceCtx.serviceData?.totalAmount *
                    serviceCtx.serviceData?.promoCode.discountPercentage
                  ).toFixed(2)} €`}</span>
                </div>
              )}
              <div className="total-amount-div">
                <span className="section-text">Ukupno:</span>
                <span className="section-text-blue">{`${serviceCtx.serviceData?.totalAmount.toFixed(
                  2
                )} €`}</span>
              </div>
              <div className="bg-div">
                <label className="form-section-text">Kontakt podaci</label>
                <div className="contact-div">
                  <span className="section-text w-[110px]">Ime i prezime:</span>
                  <span className="section-text w-[385px]">
                    {serviceCtx.serviceData?.name}
                  </span>
                </div>
                <div className="contact-div">
                  <span className="section-text w-[110px]">Email adresa:</span>
                  <span className="section-text w-[385px]">
                    {serviceCtx.serviceData?.email}
                  </span>
                </div>
                <div className="contact-div">
                  <span className="section-text w-[110px]">Broj telefona:</span>
                  <span className="section-text w-[385px]">
                    {serviceCtx.serviceData?.contactNumber}
                  </span>
                </div>
                <div className="contact-div">
                  <span className="section-text w-[110px]">Napomena:</span>
                  <span className="section-text w-[385px]">
                    {serviceCtx.serviceData?.remark}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons-div">
          <button
            className="back-button back-text"
            onClick={() => navigate(StepRoute.configureService)}
          >
            Nazad
          </button>
          <button className="send-button send-text" onClick={nextAction}>
            Pošalji
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmServicePage;
