import React, { createContext, ReactNode, useState } from 'react';
import { Manufacturer } from '../models/response/Manufacturer';
import { Service } from '../models/response/Service';

type ServiceContextType = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    isError: boolean;
    setIsError: (isError: boolean) => void;
    manufacturers: Manufacturer[] | undefined;
    setManufacturers: (manufacturers: Manufacturer[]) => void;
    services: Service[] | undefined;
    setServices: (services: Service[]) => void;
}
type Props = {
    children: ReactNode | ReactNode[];
}

const ServiceContext = createContext<ServiceContextType>(undefined!);
const ServiceContextProvider: React.FC<Props> = (props: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>();
    const [services, setServices] = useState<Service[]>();
  return (
    <ServiceContext.Provider 
    value={{
        isLoading,
        setIsLoading,
        isError,
        setIsError,
        manufacturers,
        setManufacturers,
        services,
        setServices
    }}>
        {props.children}
    </ServiceContext.Provider>
  );
};


export {ServiceContext, ServiceContextProvider};
