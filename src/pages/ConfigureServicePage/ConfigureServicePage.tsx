import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { PromoCode } from "../../models/response/PromoCode";
import { ServiceContext } from "../../context/ServiceContext";
import NavBar from "../../components/NavBar";
import "./ConfigureServicePage.css";
import { Checkbox, Col, Input, Radio, Row, Tag } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import checkmarkIcon from "../../assets/checkmark icon.svg";
import { validatePromoCode } from "../../service/BorealisService";
import { ApiError } from "../../models/ApiError/ApiError";
import { Service } from "../../models/response/Service";
import { FullServiceData } from "../../models/FullServiceData/FullServiceData";
import { useNavigate } from "react-router-dom";
import { StepRoute } from "../../util/constants";
import ErrorPage from "../ErrorPage/ErrorPage";

export type Inputs = {
  manufacturer: string;
  services: string[];
  promoCode: string;
  name: string;
  phoneNumber: string;
  email: string;
  note: string;
};

const ConfigureServicePage: React.FC = () => {
  const serviceCtx = useContext(ServiceContext);
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [validPromoCode, setValidPromoCode] = useState<PromoCode>();
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [showCodeError, setShowCodeError] = useState<string>("");
  const [errorFadeOut, setErrorFadeOut] = useState(false);
  const defaultValues =
    serviceCtx.confFormData != undefined ? serviceCtx.confFormData : {};

  useEffect(() => {
    if (errorFadeOut) {
      const timer = setTimeout(() => {
        setShowCodeError("");
        setErrorFadeOut(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorFadeOut]);

  const idsToServices = (ids: string[]): Service[] => {
    return serviceCtx.services!.filter((s) => ids.includes(s.id));
  };

  const calculateTotalCost = (ids: string[]) => {
    const flteredServices = idsToServices(ids);
    setTotalPrice(
      flteredServices.reduce((sum, service) => {
        return sum + service.price;
      }, 0)
    );
  };

  const calculateTotalAmount = (checkedServices?: string[]): void => {
    //calculate total price of all services
    if (checkedServices == undefined || checkedServices.length == 0) {
      setTotalAmount(0);
      return;
    } else if (checkedServices) {
      calculateTotalCost(checkedServices);
    }
    // calculate discount
    let discount: number = 1;
    if (validPromoCode != undefined && validPromoCode.discountPercentage > 0) {
      discount = 1 - validPromoCode!.discountPercentage;
    }
    //combine into total amount
    setTotalAmount(totalPrice * discount);
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const fullServiceData: FullServiceData = {
      manufacturer: serviceCtx.manufacturers!.filter(
        (m) => m.id == data.manufacturer
      )[0],
      services: idsToServices(data.services),
      promoCode: validPromoCode,
      name: data.name,
      contactNumber: data.phoneNumber,
      email: data.email,
      remark: data.note,
      totalAmount: totalAmount,
    };
    serviceCtx.setServiceData(fullServiceData);
    serviceCtx.setConfFormData(data);
    navigate(StepRoute.confirmService);
  };

  async function handleCouponRedeem() {
    setShowCodeError("");
    const promoCode = watch("promoCode");

    //promoCode active but checkCode button is clicked
    if (validPromoCode != undefined) {
      setShowCodeError("Samo jedan kod može biti aktivan!");
      const timer = setTimeout(() => setErrorFadeOut(true), 3000);
      return () => clearTimeout(timer);
    }
    try {
      const res = await validatePromoCode(promoCode);
      if (res.success) {
        setValidPromoCode(res.result);
        calculateTotalAmount();
      }
    } catch (e) {
      if (e instanceof ApiError) {
        setShowCodeError(e.message);
      }
    } finally {
      setValue("promoCode", "");
    }
  }

  function removePromoCode(): void {
    setShowCodeError("");
    setValidPromoCode(undefined);
    calculateTotalAmount();
  }

  return serviceCtx.manufacturers != undefined &&
    serviceCtx.services != undefined ? (
    <>
      <NavBar />
      <div className="configure-page-container">
        <div className="form-title-section">
          <h2 className="form-title-text-bold">Konfigurator Servisa</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {serviceCtx.manufacturers != undefined && (
            <div className="form-section">
              <label className="form-section-text">
                Odaberite proizvođača vašeg vozila
              </label>
              <Controller
                name="manufacturer"
                control={control}
                defaultValue={""}
                rules={{
                  required: "Odaberite proizvođača vozila!",
                }}
                render={({ field }) => (
                  <Radio.Group {...field} className="form-section-body">
                    <Row gutter={[10, 10]}>
                      {serviceCtx.manufacturers!.map((m) => (
                        <Col span={8} key={m.id} className="radio-button">
                          <Radio
                            className="radio-button-label radio-button-default radio-button-input"
                            value={m.id}
                            id={m.id}
                          >
                            {m.name}
                          </Radio>
                        </Col>
                      ))}
                    </Row>
                  </Radio.Group>
                )}
              ></Controller>
            </div>
          )}
          {/* <div className="form-section-body">
              {serviceCtx.manufacturers?.map((option) => (
                <div className="radio-button" key={option.id}>
                  <input
                    className="radio-button-default radio-button-input"
                    type="radio"
                    value={option.id}
                    id={option.id}
                    {...register("manufacturer")}
                  />
                  <label className="radio-button-label" htmlFor={option.id}>
                    {option.name}
                  </label>
                </div>
              ))}
            </div>
          </div>*/}
          <div>
            {serviceCtx.services && (
              <div className="form-section">
                <label className="form-section-text">
                  Odaberite jednu ili više usluga koje trebate
                </label>
                <Controller
                  name="services"
                  control={control}
                  defaultValue={[]}
                  rules={{
                    required: "Odaberite barem jednu uslugu!",
                  }}
                  render={({ field }) => (
                    <Checkbox.Group className="form-section-body" {...field}>
                      <Row>
                        {serviceCtx.services!.map((service) => (
                          <Col key={service.id} className="checkbox">
                            <Checkbox
                              value={service.id}
                              className="checkbox-label custom-checkbox"
                              onChange={() => calculateTotalAmount(field.value)}
                            >
                              {service.name}
                              <span className="checkbox-label-blue">{` (${service.price}€)`}</span>
                            </Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  )}
                ></Controller>
              </div>
            )}
          </div>
          <div className="form-section">
            <div className="form-section-total-amount">
              <div>
                <span className="total-amount-label">Ukupno:</span>
                <span className="total-amount">{`${totalAmount}€`}</span>
              </div>
              <div>
                {showCodeInput ? (
                  <div>
                    <div style={{ display: "flex" }}>
                      <Controller
                        name="promoCode"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <Input
                            {...field}
                            disabled={validPromoCode != undefined}
                            onChange={() => setShowCodeError("")}
                          />
                        )}
                      />
                      <button
                        className="square-button"
                        onClick={handleCouponRedeem}
                      >
                        <img src={checkmarkIcon} alt="checkmark icon"></img>
                      </button>
                    </div>
                    {validPromoCode != undefined && (
                      <div className="promo-code-tab-error">
                        <Tag closable onClose={removePromoCode}>
                          {validPromoCode.code}
                        </Tag>
                      </div>
                    )}
                    {showCodeError != "" && (
                      <div className="promo-code-tab-error">
                        <span
                          className={
                            errorFadeOut
                              ? "fade-out code-error-label"
                              : "code-error-label"
                          }
                        >
                          {showCodeError}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <a
                      className="promo-code-anchor"
                      onClick={() => setShowCodeInput(true)}
                    >
                      Imam kod
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="form-section">
            <h4 className="form-section-text">Vaši podaci</h4>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Ime i prezime su obavezni!" }}
                  render={({ field }) => (
                    <FormItem
                      label="Ime i prezime"
                      validateStatus={errors.name ? "error" : ""}
                      help={errors.name?.message}
                    >
                      <Input {...field} placeholder="Unesite ime i prezime" />
                    </FormItem>
                  )}
                />
              </Col>
              <Col span={12}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Broj telefona je obavezan!" }}
                  render={({ field }) => (
                    <FormItem
                      label="Broj telefona"
                      validateStatus={errors.phoneNumber ? "error" : ""}
                      help={errors.phoneNumber?.message}
                    >
                      <Input {...field} placeholder="Unesite broj telefona" />
                    </FormItem>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col span={24}>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email adresa je obavezna!",
                    pattern: {
                      value: /^\S+@\S+$/,
                      message: "Email nije ispravnog oblika!",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem
                      layout="vertical"
                      label="Email adresa"
                      validateStatus={errors.email ? "error" : ""}
                      help={errors.email?.message}
                    >
                      <Input {...field} placeholder="Unesite email adresu" />
                    </FormItem>
                  )}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ width: "100%" }}>
              <Col span={24}>
                <Controller
                  name="note"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem layout="vertical" label="Napomena (opcionalno)">
                      <TextArea {...field} placeholder="Unesite napomenu" />
                    </FormItem>
                  )}
                />
              </Col>
            </Row>
            /* TODO remove this style */
            <FormItem style={{ width: "100%" }}>
              <button
                className="send-button send-text"
                onClick={handleSubmit(onSubmit)}
              >
                Dalje
              </button>
            </FormItem>
          </div>
        </form>
      </div>
    </>
  ) : (
    <ErrorPage />
  );
};

export default ConfigureServicePage;
