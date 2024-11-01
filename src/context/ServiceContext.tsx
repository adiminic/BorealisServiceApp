import React, { createContext, ReactNode, useState } from 'react';

type ServiceContextType = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}
type Props = {
    children: ReactNode | ReactNode[];
}

const ServiceContext = createContext<ServiceContextType>(undefined!);
const ServiceContextProvider: React.FC<Props> = (props: Props) => {
    const [isLoading, setIsLoading] =useState<boolean>(false);
  return (
    <ServiceContext.Provider 
    value={{
        isLoading,
        setIsLoading
    }}>
        {props.children}
    </ServiceContext.Provider>
  );
};


export default ServiceContextProvider;
