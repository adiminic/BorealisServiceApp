import { Manufacturer } from "../models/response/Manufacturer";
import { PromoCode } from "../models/response/PromoCode";
import { ServiceData } from "../models/request/ServiceData";
import { Service } from "../models/response/Service";
import { ResponseWrapper } from "../models/ResponseWrapper/ResponseWrapper";
import { fetchWrapperGet, fetchWrapperPost } from "../util/fetchWrappers";

const baseUrl = 'https://fe-interview-project-backend.accounts-a35.workers.dev/api';

export async function fetchManufacturers(): Promise<ResponseWrapper<Manufacturer[]>> {
    return fetchWrapperGet(`${baseUrl}/manufacturers`);
}

export async function fetchServices(): Promise<ResponseWrapper<Service[]>> {
    return fetchWrapperGet(`${baseUrl}/services`);
}

export async function validatePromoCode(code: string): Promise<ResponseWrapper<PromoCode>> {
    return fetchWrapperPost<PromoCode>(`${baseUrl}/validate-promo-code/${code}`);
}

export async function getQuote(serviceData: ServiceData): Promise<ResponseWrapper<ServiceData>> {
    return fetchWrapperPost<ServiceData>(`${baseUrl}/contact`, serviceData);
}