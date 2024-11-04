import React, { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Manufacturer } from "../../models/response/Manufacturer";
import { Service } from "../../models/response/Service";
import { PromoCode } from "../../models/response/PromoCode";
import { ServiceContext } from "../../context/ServiceContext";
import NavBar from "../../components/NavBar";
import "./ConfigureServicePage.css";
import { Button, Checkbox, CheckboxOptionType, Col, Radio, Row } from "antd";

type Inputs = {
  manufacturer: Manufacturer;
  services: Service[];
  promoCode: string;
  name: string;
  contactNumber: string;
  email: string;
  remark: string;
};

const ConfigureServicePage: React.FC = () => {
  const serviceCtx = useContext(ServiceContext);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [validPromoCode, setValidPromoCode] = useState<PromoCode>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const servicesField: Service[] = watch("services");

  useEffect(() => {
    console.log("rerender");
    if (
      servicesField == undefined ||
      servicesField.length == 0 ||
      validPromoCode == undefined
    ) {
      setTotalAmount(0);
    } else {
      setTotalAmount(
        servicesField.reduce((sum, service) => {
          return sum + service.price;
        }, 0) *
          (1 -
            (validPromoCode?.discountPercentage
              ? validPromoCode?.discountPercentage
              : 0))
      );
    }
  }, [servicesField, validPromoCode]);

  // async function handleCouponRedeem() {
  //   const promoCode = watch("promoCode");
  //   try {
  //     const res = await validatePromoCode(promoCode);
  //     if (res.success) {
  //       setValidPromoCode(res.result);
  //     }
  //   } catch (e) {
  //     //handle error
  //     console.log(e);
  //   }
  //   return;
  // }

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleChange = (checkedValues: string[]) => {
    setSelectedServices(checkedValues);
  };
  return (
    <>
      <NavBar />
      <div className="configure-page-container">
        <div className="form-title-section">
          <h2 className="form-title-text-bold">Konfigurator Servisa</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-section">
            <label className="form-section-text">
              Odaberite proizvođača vašeg vozila
            </label>
            <div className="form-section-body">
              <Radio.Group {...register("manufacturer")}>
                <Row gutter={[10, 10]}>
                  {serviceCtx.manufacturers!.map((m) => (
                    <Col span={8} key={m.id} className="radio-button">
                      <Radio
                        className="radio-button-label"
                        value={m.name}
                        id={m.id}
                      >
                        {m.name}
                      </Radio>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </div>
            {/* <div className="form-section-body">
              {serviceCtx.manufacturers?.map((option) => (
                <div className="radio-button">
                  <input
                    className="radio-button-default radio-button-input"
                    type="radio"
                    value={option.name}
                    id={option.id}
                    {...register("manufacturer")}
                  />
                  <label className="radio-button-label" htmlFor={option.id}>
                    {option.name}
                  </label>
                </div>
              ))}
            </div> */}
          </div>
          {/* <div className="form-section">
            <label className="form-section-text">
              Odaberite jednu ili više usluga koje trebate
            </label>
            <div className="form-section-body">
              <select {...register("services")}>
                {serviceCtx.services?.map((option) => (
                  <div className="checkbox">
                    <input
                      className="checkbox-input"
                      type="radio"
                      value={option.name}
                      id={option.id}
                      {...register("manufacturer")}
                    />
                    <label className="checkbox-label" htmlFor={option.id}>
                      {option.name}
                    </label>
                  </div>
                ))}
              </select>
            </div>
          </div> */}
          <div>
            {serviceCtx.services && (
              <div className="form-section">
                <label className="form-section-text">
                  Odaberite jednu ili više usluga koje trebate
                </label>
                <Checkbox.Group
                  onChange={handleChange}
                  className="form-section-body"
                >
                  <Row>
                    {serviceCtx.services.map((service) => (
                      <Col key={service.id} className="checkbox">
                        <Checkbox
                          value={service.id}
                          className="checkbox-label custom-checkbox"
                        >
                          {service.name}(${service.price}€)
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </div>
            )}
          </div>
          <div>
            <h4 className="form-section-text">Vaši podaci</h4>
            <div>
              <div>
                <label>Ime i prezime:</label>
                <input {...register("name", { required: true })} />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div>
                <label>Phone:</label>
                <input {...register("contactNumber")} />
                {errors.contactNumber && <p>{errors.contactNumber.message}</p>}
              </div>
            </div>
            <div>
              <label>Email:</label>
              <input {...register("email")} />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
              <label>Text:</label>
              <textarea {...register("remark")} />
              {errors.remark && <p>{errors.remark.message}</p>}
            </div>
          </div>
          <div>
            <input {...register("promoCode")} disabled />
            <button type="button"></button>
            {errors.promoCode && <p>{errors.promoCode.message}</p>}
          </div>
          <div>
            <label>Total Amount:</label>
            <input type="number" value={totalAmount} disabled />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ConfigureServicePage;
