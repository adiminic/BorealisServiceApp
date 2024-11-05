import { Manufacturer } from "../response/Manufacturer";
import { PromoCode } from "../response/PromoCode";
import { Service } from "../response/Service";

export type FullServiceData = {
    manufacturer: Manufacturer;
    services: Service[];
    promoCode?: PromoCode;
    name: string;
    contactNumber: string;
    email: string;
    remark: string;
    totalAmount: number;
}